import { useState, useEffect } from 'react'
import { fetchEquranSchedule } from '../data/indonesiaLocations'

export function usePrayerTimes(location) {
  const [data, setData] = useState(null)
  const [hijri, setHijri] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!location || location.lat == null || location.lng == null) return

    const fetchTimes = async () => {
      setLoading(true)
      try {
        const today = new Date()
        const dd = today.getDate()
        const mm = today.getMonth() + 1
        const yyyy = today.getFullYear()
        const dateStr = `${String(dd).padStart(2, '0')}-${String(mm).padStart(2, '0')}-${yyyy}`

        let prayerList = null
        let usedEquran = false

        // ─── PRIMARY: equran.id (Kemenag) for Indonesia ───
        if (location.provinsi && location.kabkota) {
          const jadwal = await fetchEquranSchedule(location.provinsi, location.kabkota, mm, yyyy)
          if (jadwal) {
            const todaySchedule = jadwal.find(j => j.tanggal === dd)
            if (todaySchedule) {
              prayerList = [
                { name: 'Imsak', time: todaySchedule.imsak, icon: 'dark_mode' },
                { name: 'Subuh', time: todaySchedule.subuh, icon: 'wb_twilight' },
                { name: 'Terbit', time: todaySchedule.terbit, icon: 'wb_sunny' },
                { name: 'Dzuhur', time: todaySchedule.dzuhur, icon: 'wb_sunny' },
                { name: 'Ashar', time: todaySchedule.ashar, icon: 'wb_cloudy' },
                { name: 'Maghrib', time: todaySchedule.maghrib, icon: 'nights_stay' },
                { name: 'Isya', time: todaySchedule.isya, icon: 'bedtime' },
              ]
              usedEquran = true
              console.log('[SholatKu] ✅ Prayer times from equran.id (Kemenag)')
            }
          }
        }

        // ─── FALLBACK: aladhan.com (also provides hijri) ───
        if (!prayerList) {
          const res = await fetch(
            `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${location.lat}&longitude=${location.lng}&method=20`
          )
          const json = await res.json()

          if (json.code === 200 && json.data) {
            const timings = json.data.timings
            prayerList = [
              { name: 'Imsak', time: timings.Imsak, icon: 'dark_mode' },
              { name: 'Subuh', time: timings.Fajr, icon: 'wb_twilight' },
              { name: 'Terbit', time: timings.Sunrise, icon: 'wb_sunny' },
              { name: 'Dzuhur', time: timings.Dhuhr, icon: 'wb_sunny' },
              { name: 'Ashar', time: timings.Asr, icon: 'wb_cloudy' },
              { name: 'Maghrib', time: timings.Maghrib, icon: 'nights_stay' },
              { name: 'Isya', time: timings.Isha, icon: 'bedtime' },
            ]

            // Clean time strings (remove timezone suffix like " (WIB)")
            prayerList.forEach(p => {
              p.time = p.time.replace(/\s*\(.*\)/, '')
            })

            // Get hijri from same response (no extra fetch needed)
            const h = json.data.date?.hijri
            if (h) {
              const hijriStr = `${h.day} ${h.month?.en || h.month?.ar} ${h.year} H`
              setHijri(hijriStr)
            }

            console.log('[SholatKu] ⚠️ Prayer times from aladhan.com (fallback)')
          } else {
            throw new Error('API returned error')
          }
        }

        if (prayerList) {
          setData(prayerList)

          // Cache for offline
          localStorage.setItem('sholatku-cached-prayers', JSON.stringify({
            prayerList,
            hijri: hijri || null,
            timestamp: Date.now()
          }))
        }

        // ─── Hijri date from aladhan.com (only if used equran.id for prayer times) ───
        if (usedEquran) {
          try {
            const hijriRes = await fetch(
              `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${location.lat}&longitude=${location.lng}&method=20`
            )
            const hijriJson = await hijriRes.json()
            if (hijriJson.code === 200 && hijriJson.data) {
              const h = hijriJson.data.date?.hijri
              if (h) {
                const hijriStr = `${h.day} ${h.month?.en || h.month?.ar} ${h.year} H`
                setHijri(hijriStr)
                // Update cache with hijri
                const cached = localStorage.getItem('sholatku-cached-prayers')
                if (cached) {
                  const parsed = JSON.parse(cached)
                  parsed.hijri = hijriStr
                  localStorage.setItem('sholatku-cached-prayers', JSON.stringify(parsed))
                }
              }
            }
          } catch (hijriErr) {
            console.warn('[SholatKu] Hijri date fetch failed:', hijriErr)
            const cached = localStorage.getItem('sholatku-cached-prayers')
            if (cached) {
              const parsed = JSON.parse(cached)
              if (parsed.hijri) setHijri(parsed.hijri)
            }
          }
        }
      } catch (err) {
        // Try cached data
        const cached = localStorage.getItem('sholatku-cached-prayers')
        if (cached) {
          const parsed = JSON.parse(cached)
          setData(parsed.prayerList)
          if (parsed.hijri) setHijri(parsed.hijri)
        }
        setError(err.message)
      }
      setLoading(false)
    }

    fetchTimes()
  }, [location?.lat, location?.lng, location?.provinsi, location?.kabkota])

  return { prayerTimes: data, hijri, loading, error }
}
