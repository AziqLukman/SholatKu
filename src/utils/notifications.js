// Push Server URL — pakai domain publik agar bisa diakses dari HP
const PUSH_SERVER_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3005'                      // dev lokal
  : 'https://push-sholatku.ajekkk.my.id'         // production (via Cloudflare Tunnel)

export function requestNotificationPermission() {
  if (!('Notification' in window)) return Promise.resolve('denied')
  return Notification.requestPermission()
}

export function sendNotification(title, body) {
  if (Notification.permission === 'granted') {
    console.log(`[SholatKu Notif] 🔔 Mengirim notifikasi: ${title} — ${body}`)
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(title, {
          body,
          icon: '/icon.png',
          badge: '/icon.png',
          tag: 'sholatku-' + Date.now(),
          renotify: true,
          silent: false,
          vibrate: [200, 100, 200, 100, 200],
          requireInteraction: true,
        })
      })
    } else {
      new Notification(title, {
        body,
        icon: '/icon.png',
        badge: '/icon.png',
        tag: 'prayer-time',
        renotify: true,
        silent: false,
        vibrate: [200, 100, 200, 100, 200],
      })
    }
  }
}

// ============================================
// Web Push Subscription — subscribe ke push server
// ============================================
export async function subscribeToPush(lat, lng, notificationsEnabled, imsakNotifEnabled) {
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('[SholatKu Notif] Push API not supported')
      return
    }

    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      console.log('[SholatKu Notif] Notification permission denied')
      return
    }

    // Ambil VAPID public key dari server
    const vapidRes = await fetch(`${PUSH_SERVER_URL}/vapid-public-key`)
    const { key: vapidPublicKey } = await vapidRes.json()

    const reg = await navigator.serviceWorker.ready
    const convertedKey = urlBase64ToUint8Array(vapidPublicKey)

    // Cek apakah sudah ada subscription
    let subscription = await reg.pushManager.getSubscription()

    // Cek apakah VAPID key berubah — kalau berubah, harus re-subscribe
    const savedKey = localStorage.getItem('sholatku-vapid-key')
    if (subscription && savedKey !== vapidPublicKey) {
      console.log('[SholatKu Notif] ⚠️ VAPID key berubah, re-subscribe...')
      await subscription.unsubscribe()
      subscription = null
    }

    if (!subscription) {
      subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey,
      })
      localStorage.setItem('sholatku-vapid-key', vapidPublicKey)
      console.log('[SholatKu Notif] ✅ Push subscription created (new)')
    } else {
      console.log('[SholatKu Notif] ✅ Using existing push subscription')
    }

    // Kirim subscription + lokasi ke server
    await fetch(`${PUSH_SERVER_URL}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        lat,
        lng,
        notificationsEnabled,
        imsakNotifEnabled,
      })
    })

    console.log('[SholatKu Notif] ✅ Subscription synced to push server')
    return subscription

  } catch (err) {
    console.error('[SholatKu Notif] Push subscription error:', err)
  }
}

export async function unsubscribeFromPush() {
  try {
    const reg = await navigator.serviceWorker.ready
    const subscription = await reg.pushManager.getSubscription()
    if (subscription) {
      await fetch(`${PUSH_SERVER_URL}/unsubscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint })
      })
      await subscription.unsubscribe()
      console.log('[SholatKu Notif] ✅ Unsubscribed from push')
    }
  } catch (err) {
    console.error('[SholatKu Notif] Unsubscribe error:', err)
  }
}

// ============================================
// Sync prayer times ke SW (fallback)
// ============================================
export function syncPrayerTimesToSW(prayerTimes, notificationsEnabled, imsakNotifEnabled) {
  if (!navigator.serviceWorker || !navigator.serviceWorker.controller) {
    console.log('[SholatKu Notif] SW belum ready, skip sync')
    return
  }

  navigator.serviceWorker.controller.postMessage({
    type: 'SYNC_PRAYER_TIMES',
    payload: { prayerTimes, notificationsEnabled, imsakNotifEnabled }
  })

  console.log('[SholatKu Notif] ✅ Prayer times synced to SW')
}

// ============================================
// Helpers
// ============================================
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function isTimeMatch(targetTimeStr) {
  const now = new Date()
  const [targetH, targetM] = targetTimeStr.split(':').map(Number)
  return now.getHours() === targetH && now.getMinutes() === targetM
}

function wasNotifSentToday(key) {
  const stored = localStorage.getItem(key)
  if (!stored) return false
  return new Date(stored).toDateString() === new Date().toDateString()
}

function markNotifSent(key) {
  localStorage.setItem(key, new Date().toISOString())
}

function cleanOldNotifKeys() {
  const keysToRemove = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('sholatku-notif-')) {
      const stored = localStorage.getItem(key)
      if (stored && new Date(stored).toDateString() !== new Date().toDateString()) {
        keysToRemove.push(key)
      }
    }
  }
  keysToRemove.forEach(k => localStorage.removeItem(k))
}

export function checkPrayerNotification(prayerTimes, notificationsEnabled, imsakNotifEnabled) {
  if (!prayerTimes) return
  cleanOldNotifKeys()

  const now = new Date()
  const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  console.log(`[SholatKu Notif] ⏰ Cek notifikasi @ ${currentTimeStr} | Sholat: ${notificationsEnabled ? 'ON' : 'OFF'} | Imsak: ${imsakNotifEnabled ? 'ON' : 'OFF'}`)

  if (imsakNotifEnabled) {
    const imsak = prayerTimes.find(p => p.name === 'Imsak')
    if (imsak && imsak.time) {
      const [imsakH, imsakM] = imsak.time.split(':').map(Number)
      let sahurH = imsakH - 1
      if (sahurH < 0) sahurH = 23
      const sahurTimeStr = `${String(sahurH).padStart(2, '0')}:${String(imsakM).padStart(2, '0')}`

      if (isTimeMatch(sahurTimeStr) && !wasNotifSentToday('sholatku-notif-sahur')) {
        sendNotification('🍚 AYOO SAHUUUUUURRRRRRRR!!!', `1 jam lagi Imsak (${imsak.time}). Bangun dan segera sahur! 💪`)
        markNotifSent('sholatku-notif-sahur')
      }
      if (isTimeMatch(imsak.time) && !wasNotifSentToday('sholatku-notif-Imsak')) {
        sendNotification('⏰ Waktu Imsak', `Sudah masuk waktu Imsak (${imsak.time}). Segera hentikan makan & minum!`)
        markNotifSent('sholatku-notif-Imsak')
      }
    }
  }

  if (notificationsEnabled) {
    for (const prayer of prayerTimes.filter(p => p.name !== 'Imsak' && p.name !== 'Terbit')) {
      if (isTimeMatch(prayer.time) && !wasNotifSentToday(`sholatku-notif-${prayer.name}`)) {
        sendNotification(`🕌 Waktu ${prayer.name}`, `Sudah masuk waktu ${prayer.name} (${prayer.time}). Ayo sholat!`)
        markNotifSent(`sholatku-notif-${prayer.name}`)
      }
    }
  }
}
