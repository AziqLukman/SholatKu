import { useState, useEffect } from 'react'

export function usePrayerTimes(lat, lng) {
  const [data, setData] = useState(null)
  const [hijri, setHijri] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (lat == null || lng == null) return

    const fetchTimes = async () => {
      setLoading(true)
      try {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const dateStr = `${dd}-${mm}-${yyyy}`

        const res = await fetch(
          `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=20`
        )
        const json = await res.json()

        if (json.code === 200 && json.data) {
          const timings = json.data.timings
          const prayerList = [
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

          setData(prayerList)

          // Hijri date
          const h = json.data.date?.hijri
          if (h) {
            setHijri(`${h.day} ${h.month?.en || h.month?.ar} ${h.year} H`)
          }

          // Cache for offline
          localStorage.setItem('sholatku-cached-prayers', JSON.stringify({ prayerList, hijri: `${h?.day} ${h?.month?.en} ${h?.year} H`, timestamp: Date.now() }))
        } else {
          throw new Error('API returned error')
        }
      } catch (err) {
        // Try cached data
        const cached = localStorage.getItem('sholatku-cached-prayers')
        if (cached) {
          const parsed = JSON.parse(cached)
          setData(parsed.prayerList)
          setHijri(parsed.hijri)
        }
        setError(err.message)
      }
      setLoading(false)
    }

    fetchTimes()
  }, [lat, lng])

  return { prayerTimes: data, hijri, loading, error }
}
