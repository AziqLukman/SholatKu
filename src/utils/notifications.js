export function requestNotificationPermission() {
  if (!('Notification' in window)) return Promise.resolve('denied')
  return Notification.requestPermission()
}

export function sendNotification(title, body) {
  if (Notification.permission === 'granted') {
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

export function checkPrayerNotification(prayerTimes, notificationsEnabled, imsakNotifEnabled) {
  if (!prayerTimes) return

  const now = new Date()
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  const currentTimeStr = `${hh}:${mm}`

  // --- Cek 1 jam sebelum Imsak (peringatan sahur) ---
  if (imsakNotifEnabled) {
    const imsak = prayerTimes.find(p => p.name === 'Imsak')
    if (imsak && imsak.time) {
      const [imsakH, imsakM] = imsak.time.split(':').map(Number)
      let sahurH = imsakH - 1
      let sahurM = imsakM
      if (sahurH < 0) sahurH = 23
      const sahurTimeStr = `${String(sahurH).padStart(2, '0')}:${String(sahurM).padStart(2, '0')}`

      if (currentTimeStr === sahurTimeStr) {
        const sahurKey = `sholatku-notif-sahur-${now.toDateString()}`
        if (!sessionStorage.getItem(sahurKey)) {
          sendNotification(
            '🍚 AYOO SAHUUUUUURRRRRRRR!!!',
            `1 jam lagi Imsak (${imsak.time}). Bangun dan segera sahur! 💪`
          )
          sessionStorage.setItem(sahurKey, 'sent')
        }
      }

      // Cek waktu imsak
      if (currentTimeStr === imsak.time) {
        const imsakKey = `sholatku-notif-Imsak-${now.toDateString()}`
        if (!sessionStorage.getItem(imsakKey)) {
          sendNotification(
            '⏰ Waktu Imsak',
            `Sudah masuk waktu Imsak (${imsak.time}). Segera persiapkan sahur!`
          )
          sessionStorage.setItem(imsakKey, 'sent')
        }
      }
    }
  }

  // --- Cek waktu sholat (tanpa Imsak & Terbit) ---
  if (notificationsEnabled) {
    const activePrayer = prayerTimes.find(p =>
      p.name !== 'Imsak' && p.name !== 'Terbit' && p.time === currentTimeStr
    )

    if (activePrayer) {
      const notifKey = `sholatku-notif-${activePrayer.name}-${now.toDateString()}`
      if (!sessionStorage.getItem(notifKey)) {
        sendNotification(
          `🕌 Waktu ${activePrayer.name}`,
          `Sudah masuk waktu ${activePrayer.name} (${activePrayer.time}). Ayo sholat!`
        )
        sessionStorage.setItem(notifKey, 'sent')
      }
    }
  }
}

