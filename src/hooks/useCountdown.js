import { useState, useEffect } from 'react'

export function useCountdown(prayerTimes) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [nextPrayer, setNextPrayer] = useState(null)
  const [currentPrayer, setCurrentPrayer] = useState(null)
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)

      if (!prayerTimes || prayerTimes.length === 0) return

      // Parse prayer times into Date objects for today
      const prayerDates = prayerTimes.map(p => {
        const [h, m] = p.time.split(':').map(Number)
        const d = new Date(now)
        d.setHours(h, m, 0, 0)
        return { ...p, date: d }
      })

      // Find current and next prayer
      // Prayers that count for "current" (excluding Imsak and Terbit)
      const mainPrayers = prayerDates.filter(
        p => p.name !== 'Imsak' && p.name !== 'Terbit'
      )

      let current = null
      let next = null

      for (let i = 0; i < mainPrayers.length; i++) {
        if (now >= mainPrayers[i].date) {
          current = mainPrayers[i]
          next = mainPrayers[i + 1] || null
        }
      }

      // If no prayer has passed yet today, current is last night (Isya) and next is first (Subuh)
      if (!current) {
        current = mainPrayers[mainPrayers.length - 1]
        next = mainPrayers[0]
      }

      // If all prayers passed, next is tomorrow's Subuh
      if (current && !next) {
        const tomorrowSubuh = new Date(mainPrayers[0].date)
        tomorrowSubuh.setDate(tomorrowSubuh.getDate() + 1)
        next = { ...mainPrayers[0], date: tomorrowSubuh }
      }

      setCurrentPrayer(current)
      setNextPrayer(next)

      // Calculate countdown
      if (next) {
        let diff = next.date.getTime() - now.getTime()
        if (diff < 0) diff += 24 * 60 * 60 * 1000 // wrap to tomorrow

        const hours = Math.floor(diff / (1000 * 60 * 60))
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const secs = Math.floor((diff % (1000 * 60)) / 1000)

        setCountdown(
          `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
        )
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [prayerTimes])

  const formattedTime = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const formattedTimeWithSeconds = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  return { currentTime, formattedTime, formattedTimeWithSeconds, nextPrayer, currentPrayer, countdown }
}
