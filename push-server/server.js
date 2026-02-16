const express = require('express')
const cors = require('cors')
const webpush = require('web-push')
const fs = require('fs')
const path = require('path')
const https = require('https')

// ============================================
// VAPID Keys — baca dari file yang di-generate
// ============================================
const KEYS_FILE = path.join(__dirname, 'vapid-keys.json')

if (!fs.existsSync(KEYS_FILE)) {
  console.log('[Push Server] ⚠️ VAPID keys belum ada! Generating...')
  const keys = webpush.generateVAPIDKeys()
  fs.writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2))
  console.log('[Push Server] ✅ VAPID keys generated and saved to vapid-keys.json')
}

const vapidKeys = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'))
const VAPID_PUBLIC_KEY = vapidKeys.publicKey
const VAPID_PRIVATE_KEY = vapidKeys.privateKey

console.log('[Push Server] VAPID Public Key:', VAPID_PUBLIC_KEY.substring(0, 20) + '...')

webpush.setVapidDetails(
  'mailto:ajek@sholatku.app',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
)

// ============================================
// Storage — simpan subscriptions ke file JSON
// ============================================
const DATA_FILE = path.join(__dirname, 'subscriptions.json')

function loadSubscriptions() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
      // Filter out invalid subscriptions
      return data.filter(s => s && s.subscription && s.subscription.endpoint)
    }
  } catch (e) {
    console.error('[Push Server] Error loading subscriptions:', e.message)
  }
  return []
}

function saveSubscriptions(subs) {
  // Jangan simpan cache times ke file
  const clean = subs.map(s => ({
    subscription: s.subscription,
    lat: s.lat,
    lng: s.lng,
    notificationsEnabled: s.notificationsEnabled,
    imsakNotifEnabled: s.imsakNotifEnabled,
    createdAt: s.createdAt,
  }))
  fs.writeFileSync(DATA_FILE, JSON.stringify(clean, null, 2))
}

let subscriptions = loadSubscriptions()

// ============================================
// Fetch jadwal sholat dari Aladhan API
// ============================================
function fetchPrayerTimes(lat, lng) {
  return new Promise((resolve, reject) => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    const dateStr = `${dd}-${mm}-${yyyy}`

    const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=20`

    https.get(url, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          if (json.code === 200 && json.data) {
            const t = json.data.timings
            const cleanTime = (time) => time.replace(/\s*\(.*\)/, '')
            resolve({
              Imsak: cleanTime(t.Imsak),
              Subuh: cleanTime(t.Fajr),
              Terbit: cleanTime(t.Sunrise),
              Dzuhur: cleanTime(t.Dhuhr),
              Ashar: cleanTime(t.Asr),
              Maghrib: cleanTime(t.Maghrib),
              Isya: cleanTime(t.Isha),
            })
          } else {
            reject(new Error('API error: ' + JSON.stringify(json)))
          }
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', reject)
  })
}

// ============================================
// Express Server
// ============================================
const app = express()
app.use(cors())
app.use(express.json())

// Endpoint: dapatkan VAPID public key
app.get('/vapid-public-key', (req, res) => {
  res.json({ key: VAPID_PUBLIC_KEY })
})

// Endpoint: status / health check
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    subscriptions: subscriptions.length,
    vapidKey: VAPID_PUBLIC_KEY.substring(0, 20) + '...',
  })
})

// Endpoint: subscribe
app.post('/subscribe', (req, res) => {
  const { subscription, lat, lng, notificationsEnabled, imsakNotifEnabled } = req.body

  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'Invalid subscription' })
  }

  // Update atau tambah subscription
  const existingIndex = subscriptions.findIndex(s => s.subscription.endpoint === subscription.endpoint)
  const subData = {
    subscription,
    lat: lat || -6.2088,
    lng: lng || 106.8456,
    notificationsEnabled: notificationsEnabled !== false,
    imsakNotifEnabled: imsakNotifEnabled || false,
    createdAt: new Date().toISOString(),
  }

  if (existingIndex >= 0) {
    subscriptions[existingIndex] = subData
    console.log(`[Push Server] Updated subscription #${existingIndex}`)
  } else {
    subscriptions.push(subData)
    console.log(`[Push Server] New subscription added. Total: ${subscriptions.length}`)
  }

  saveSubscriptions(subscriptions)
  res.json({ success: true })
})

// Endpoint: unsubscribe
app.post('/unsubscribe', (req, res) => {
  const { endpoint } = req.body
  subscriptions = subscriptions.filter(s => s.subscription.endpoint !== endpoint)
  saveSubscriptions(subscriptions)
  console.log(`[Push Server] Unsubscribed. Total: ${subscriptions.length}`)
  res.json({ success: true })
})

// Endpoint: test push — kirim notif test ke semua subscriber
app.post('/test-push', async (req, res) => {
  console.log(`[Push Server] 🧪 Test push to ${subscriptions.length} subscriber(s)`)
  const results = []
  for (let i = 0; i < subscriptions.length; i++) {
    try {
      await sendPush(subscriptions[i].subscription, {
        title: '🧪 Test Push SholatKu',
        body: 'Push notification berhasil! Notif ini dikirim dari server.',
      })
      results.push({ sub: i, status: 'sent' })
    } catch (err) {
      results.push({ sub: i, status: 'failed', error: err.message, statusCode: err.statusCode })
    }
  }
  res.json({ results })
})

const PORT = 3005
app.listen(PORT, () => {
  console.log(`[Push Server] 🚀 Running on port ${PORT}`)
  console.log(`[Push Server] ${subscriptions.length} subscription(s) loaded`)
  startNotificationLoop()
})

// ============================================
// Notification Loop — cek setiap 30 detik
// ============================================
const sentToday = new Map()

function wasSentToday(key) {
  const dateStr = sentToday.get(key)
  return dateStr === new Date().toDateString()
}

function markSent(key) {
  sentToday.set(key, new Date().toDateString())
}

function cleanSentCache() {
  const today = new Date().toDateString()
  for (const [key, val] of sentToday.entries()) {
    if (val !== today) sentToday.delete(key)
  }
}

function isTimeMatch(targetTimeStr) {
  const now = new Date()
  const [h, m] = targetTimeStr.split(':').map(Number)
  return now.getHours() === h && now.getMinutes() === m
}

async function checkAndSendNotifications() {
  cleanSentCache()

  const now = new Date()
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')

  for (let i = 0; i < subscriptions.length; i++) {
    const sub = subscriptions[i]

    try {
      // Ambil jadwal sholat (cache per hari di memory)
      if (!sub._cachedTimes || sub._cacheDate !== now.toDateString()) {
        sub._cachedTimes = await fetchPrayerTimes(sub.lat, sub.lng)
        sub._cacheDate = now.toDateString()
        console.log(`[Push Server] Fetched prayer times for sub #${i}: ${JSON.stringify(sub._cachedTimes)}`)
      }

      const times = sub._cachedTimes

      // --- Cek Sahur (1 jam sebelum Imsak) ---
      if (sub.imsakNotifEnabled && times.Imsak) {
        const [imsakH, imsakM] = times.Imsak.split(':').map(Number)
        let sahurH = imsakH - 1
        if (sahurH < 0) sahurH = 23
        const sahurTimeStr = `${String(sahurH).padStart(2, '0')}:${String(imsakM).padStart(2, '0')}`

        if (isTimeMatch(sahurTimeStr)) {
          const key = `sahur-${i}`
          if (!wasSentToday(key)) {
            await sendPush(sub.subscription, {
              title: '🍚 AYOO SAHUUUUUURRRRRRRR!!!',
              body: `1 jam lagi Imsak (${times.Imsak}). Bangun dan segera sahur! 💪`,
            })
            markSent(key)
          }
        }

        if (isTimeMatch(times.Imsak)) {
          const key = `imsak-${i}`
          if (!wasSentToday(key)) {
            await sendPush(sub.subscription, {
              title: '⏰ Waktu Imsak',
              body: `Sudah masuk waktu Imsak (${times.Imsak}). Segera hentikan makan & minum!`,
            })
            markSent(key)
          }
        }
      }

      // --- Cek Waktu Sholat ---
      if (sub.notificationsEnabled) {
        const sholatList = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya']
        for (const name of sholatList) {
          if (times[name] && isTimeMatch(times[name])) {
            const key = `${name}-${i}`
            if (!wasSentToday(key)) {
              await sendPush(sub.subscription, {
                title: `🕌 Waktu ${name}`,
                body: `Sudah masuk waktu ${name} (${times[name]}). Ayo sholat!`,
              })
              markSent(key)
            }
          }
        }
      }

    } catch (err) {
      console.error(`[Push Server] Error for sub #${i}:`, err.message, 'statusCode:', err.statusCode)
      // Kalau subscription expired/invalid (410 Gone), hapus
      if (err.statusCode === 404 || err.statusCode === 410) {
        console.log(`[Push Server] Removing expired subscription #${i}`)
        subscriptions.splice(i, 1)
        i--
        saveSubscriptions(subscriptions)
      }
    }
  }
}

async function sendPush(subscription, payload) {
  try {
    const result = await webpush.sendNotification(subscription, JSON.stringify(payload))
    console.log(`[Push Server] 🔔 Push sent: ${payload.title} (status: ${result.statusCode})`)
    return result
  } catch (err) {
    console.error(`[Push Server] Push failed: ${err.message} | statusCode: ${err.statusCode} | endpoint: ${subscription.endpoint.substring(0, 60)}...`)
    throw err
  }
}

function startNotificationLoop() {
  console.log('[Push Server] ⏰ Notification loop started (every 30 seconds)')
  setInterval(() => {
    checkAndSendNotifications().catch(err => {
      console.error('[Push Server] Loop error:', err.message)
    })
  }, 30000)

  // Cek langsung saat start
  checkAndSendNotifications().catch(() => {})
}
