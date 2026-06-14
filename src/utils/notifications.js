import { isNativePlatform } from './platform'

// Push Server URL — pakai domain publik agar bisa diakses dari HP
const PUSH_SERVER_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3005'                      // dev lokal
  : 'https://push-sholatku.ajekkk.my.id'         // production (via Cloudflare Tunnel)

// Capacitor Local Notifications (lazy import untuk native)
let LocalNotifications = null
async function getLocalNotifications() {
  if (!LocalNotifications && isNativePlatform()) {
    try {
      const mod = await import('@capacitor/local-notifications')
      LocalNotifications = mod.LocalNotifications
    } catch {
      console.warn('[SholatKu] @capacitor/local-notifications not available')
    }
  }
  return LocalNotifications
}

export async function requestNotificationPermission() {
  if (isNativePlatform()) {
    const LN = await getLocalNotifications()
    if (LN) {
      try {
        const perm = await LN.checkPermissions();
        if (perm.display === 'granted') {
          return 'granted';
        }
        const result = await LN.requestPermissions();
        return result.display;
      } catch (err) {
        console.error('[SholatKu Notif] LN permission error:', err);
        return 'denied';
      }
    }
    return 'denied'
  }

  // Cek apakah web diakses di environment yang secure (HTTPS / localhost)
  if (window.isSecureContext === false) {
    throw new Error('NOT_SECURE');
  }

  if (!('Notification' in window)) {
    throw new Error('NOT_SUPPORTED');
  }

  try {
    if (Notification.permission === 'granted') {
      return 'granted';
    }
    return await new Promise((resolve) => {
      const promise = Notification.requestPermission((result) => {
        resolve(result)
      })
      if (promise && promise.then) {
        promise.then(resolve).catch(() => resolve('denied'))
      }
    })
  } catch (err) {
    console.error('Error requesting notification permission:', err)
    return 'denied'
  }
}

let nativeNotifId = 1

export async function sendNotification(title, body) {
  if (isNativePlatform()) {
    const LN = await getLocalNotifications()
    if (LN) {
      await LN.schedule({
        notifications: [{
          title,
          body,
          id: nativeNotifId++,
          schedule: { at: new Date(Date.now() + 100) },
          sound: 'default',
          smallIcon: 'ic_launcher',
        }]
      })
      console.log(`[SholatKu Notif] 🔔 Native notification: ${title}`)
    }
    return
  }

  // Web fallback
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
    // Di native app, push subscription tidak diperlukan (pakai local notifications)
    if (isNativePlatform()) return

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
  
  // [MODE TESTING] Beri jeda 61 detik agar tidak spam bertubi-tubi dalam 1 menit yang sama,
  // tapi user tetep bisa ngetest berulang kali asal mundurin jam lagi.
  const lastTime = parseInt(stored, 10)
  if (isNaN(lastTime)) return false
  return (Date.now() - lastTime) < 61000
}

function markNotifSent(key) {
  localStorage.setItem(key, Date.now().toString())
}

function markNotifSentToday(key) {
  localStorage.setItem(key, Date.now().toString())
}

function cleanOldNotifKeys() {
  const keysToRemove = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('sholatku-notif-')) {
      const stored = localStorage.getItem(key)
      const storedTime = parseInt(stored, 10)
      if (!isNaN(storedTime)) {
        if (new Date(storedTime).toDateString() !== new Date().toDateString()) {
          keysToRemove.push(key)
        }
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
        markNotifSentToday(`sholatku-notif-${prayer.name}`)
        playAdzan()
      }
    }
  }
}

let globalAdzanAudio = null

export function initAdzanAudio() {
  if (!globalAdzanAudio) {
    globalAdzanAudio = new Audio('/audio/adzan/bikin_nangis.mp3')
  }
  
  // Jika adzan sedang bunyi beneran, jangan diganggu/dipotong!
  if (!globalAdzanAudio.paused && globalAdzanAudio.currentTime > 0) {
    return;
  }
  
  // Selalu pancing ulang (load, play, pause) tiap kali tombol dipencet 
  // agar browser HP (iOS/Android) nggak "mengunci" lagi audio-nya 
  // setelah aplikasi sempet ditinggal ke background (pas ganti jam).
  globalAdzanAudio.muted = true; // Mute sementara biar gak ada suara "bocoran" di iOS
  globalAdzanAudio.load()
  const playPromise = globalAdzanAudio.play()
  if (playPromise !== undefined) {
    playPromise.then(() => {
      globalAdzanAudio.pause()
      globalAdzanAudio.currentTime = 0
      globalAdzanAudio.muted = false; // Kembalikan suara
    }).catch(e => {
      console.log('[SholatKu Notif] Pancingan audio diblokir, tapi gapapa.', e)
      globalAdzanAudio.muted = false;
    })
  }
}

let isAudioUnlocked = false;

// Fungsi ini harus dipanggil di global scope (misal App.jsx) agar sekali user interaksi (tap/click), audio ter-unlock
export function setupAudioUnlocker() {
  if (isAudioUnlocked) return;
  const unlock = () => {
    if (!isAudioUnlocked) {
      initAdzanAudio();
      isAudioUnlocked = true;
      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
      console.log('[SholatKu Notif] Audio autoplay di-unlock melalui interaksi user.');
    }
  };
  document.addEventListener('click', unlock);
  document.addEventListener('touchstart', unlock);
}

// Memutar suara adzan
export function playAdzan() {
  if (!globalAdzanAudio) {
    globalAdzanAudio = new Audio('/audio/adzan/bikin_nangis.mp3')
  }
  globalAdzanAudio.currentTime = 0
  globalAdzanAudio.muted = false
  globalAdzanAudio.play().catch(e => {
    console.error('[SholatKu Notif] Gagal memutar suara adzan (file tidak ada atau diblokir browser).', e)
  })
}

// Mematikan suara adzan
export function stopAdzan() {
  if (globalAdzanAudio) {
    globalAdzanAudio.pause()
    globalAdzanAudio.currentTime = 0
  }
}
