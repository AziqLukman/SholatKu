// ============================================
// SholatKu — Custom Service Worker
// Handles Web Push + Background notifications
// ============================================

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

// ---- Data prayer times (dari main app via postMessage) ----
let prayerData = null
let checkTimer = null

// --- Terima data jadwal sholat dari main app ---
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SYNC_PRAYER_TIMES') {
    prayerData = event.data.payload
    console.log('[SW] Received prayer times:', prayerData)
  }
})

// --- Background check loop removed ---
// Service Workers are event-driven. setInterval is an anti-pattern here and causes 
// duplicate notifications because the foreground app also runs a check loop.

const sentNotifs = new Map()

function wasNotifSentToday(key) {
  const stored = sentNotifs.get(key)
  if (!stored) return false
  
  // BUAT TESTING: Cooldown 61 detik aja biar bisa ditest berkali-kali di jam yang sama
  const diff = Date.now() - new Date(stored).getTime()
  return diff < 61000
}

function markNotifSent(key) {
  sentNotifs.set(key, new Date().toISOString())
}

function isTimeMatch(targetTimeStr) {
  const now = new Date()
  const [targetH, targetM] = targetTimeStr.split(':').map(Number)
  return now.getHours() === targetH && now.getMinutes() === targetM
}

function checkAndNotify() {
  if (!prayerData) return
  const { prayerTimes, notificationsEnabled, imsakNotifEnabled } = prayerData
  if (!prayerTimes) return

  const now = new Date()
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  console.log(`[SW] ⏰ Background check @ ${hh}:${mm}`)

  if (imsakNotifEnabled) {
    const imsak = prayerTimes.find(p => p.name === 'Imsak')
    if (imsak && imsak.time) {
      const [imsakH, imsakM] = imsak.time.split(':').map(Number)
      let sahurH = imsakH - 1
      if (sahurH < 0) sahurH = 23
      const sahurTimeStr = `${String(sahurH).padStart(2, '0')}:${String(imsakM).padStart(2, '0')}`

      if (isTimeMatch(sahurTimeStr) && !wasNotifSentToday('sw-sahur')) {
        showNotif('🍚 AYOO SAHUUUUUURRRRRRRR!!!', `1 jam lagi Imsak (${imsak.time}). Bangun dan segera sahur! 💪`)
        markNotifSent('sw-sahur')
      }
      if (isTimeMatch(imsak.time) && !wasNotifSentToday('sw-imsak')) {
        showNotif('⏰ Waktu Imsak', `Sudah masuk waktu Imsak (${imsak.time}). Segera hentikan makan & minum!`)
        markNotifSent('sw-imsak')
      }
    }
  }

  if (notificationsEnabled) {
    for (const prayer of prayerTimes.filter(p => p.name !== 'Imsak' && p.name !== 'Terbit')) {
      if (isTimeMatch(prayer.time) && !wasNotifSentToday(`sw-${prayer.name}`)) {
        showNotif(`🕌 Waktu ${prayer.name}`, `Sudah masuk waktu ${prayer.name} (${prayer.time}). Ayo sholat!`)
        markNotifSent(`sw-${prayer.name}`)
      }
    }
  }
}

function showNotif(title, body) {
  console.log(`[SW] 🔔 Notification: ${title}`)
  self.registration.showNotification(title, {
    body,
    icon: '/icon.png',
    badge: '/icon.png',
    tag: 'sholatku-' + Date.now(),
    renotify: true,
    silent: false,
    vibrate: [200, 100, 200, 100, 200],
    requireInteraction: true,
    sound: '/audio/adzan/bikin_nangis.mp3',
  })

  // Perintahkan tab aplikasi yang terbuka untuk memutar suara adzan
  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    for (const client of clientList) {
      client.postMessage({ type: 'PLAY_ADZAN' })
    }
  })
}

// ============================================
// WEB PUSH — terima push dari server
// ============================================
self.addEventListener('push', (event) => {
  console.log('[SW] 📬 Push event received!')

  let data = { title: '🕌 SholatKu', body: 'Notifikasi baru' }
  
  if (event.data) {
    try {
      data = event.data.json()
    } catch (e) {
      data.body = event.data.text()
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon.png',
      badge: '/icon.png',
      tag: 'sholatku-push-' + Date.now(),
      renotify: true,
      silent: false,
      vibrate: [200, 100, 200, 100, 200],
      requireInteraction: true,
      data: { url: '/' },
    })
  )
})

// --- Klik notifikasi → buka app ---
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  const payload = {
    type: 'NOTIF_CLICKED',
    title: event.notification.title,
    body: event.notification.body
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage(payload)
          return client.focus()
        }
      }
      
      const url = new URL('/', self.location.origin)
      url.searchParams.set('notif_title', event.notification.title)
      url.searchParams.set('notif_body', event.notification.body)
      return clients.openWindow(url.toString())
    })
  )
})

// --- Activate: langsung take control ---
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim())
  console.log('[SW] ✅ Custom SW activated — push notifications ready')
})
