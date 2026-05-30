import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { database } from '../utils/firebase'
import { ref, get, set } from 'firebase/database'
import { fetchEquranSchedule } from '../data/indonesiaLocations'
import THREnvelope from './THREnvelope'

const TRACKER_KEY = 'sholatku-ramadhan-tracker-v1'

// Gamification Constants
const XP_LEVEL_BASE = 100
const XP_MULTIPLIER = 1.1
const MAX_LEVEL = 30

const getMaxTotalXP = () => {
  let total = 0
  let xpNeeded = XP_LEVEL_BASE
  for (let i = 1; i < MAX_LEVEL; i++) {
    total += xpNeeded
    xpNeeded = Math.floor(xpNeeded * XP_MULTIPLIER)
  }
  return total + xpNeeded
}
const MAX_XP = getMaxTotalXP()

const getLevelFromXP = (xp) => {
  let level = 1
  let nextLevelXP = XP_LEVEL_BASE
  while (xp >= nextLevelXP && level < MAX_LEVEL) {
    xp -= nextLevelXP
    nextLevelXP = Math.floor(nextLevelXP * XP_MULTIPLIER)
    level++
  }
  return { level, currentLevelXP: xp, nextLevelXP }
}

const getRankData = (level) => {
  if (level <= 5) return { title: 'Pencari Berkah', theme: 'from-emerald-400 to-emerald-600', color: 'text-emerald-50', icon: 'eco', emoji: '🌱' }
  if (level <= 10) return { title: 'Pejuang Ibadah', theme: 'from-teal-400 to-teal-600', color: 'text-teal-50', icon: 'shield', emoji: '⚔️' }
  if (level <= 15) return { title: 'Penjaga Sholat', theme: 'from-cyan-400 to-cyan-600', color: 'text-cyan-50', icon: 'mosque', emoji: '🕌' }
  if (level <= 20) return { title: 'Ahli Ibadah', theme: 'from-blue-400 to-blue-600', color: 'text-blue-50', icon: 'auto_awesome', emoji: '💎' }
  if (level <= 25) return { title: 'Cahaya Ramadhan', theme: 'from-violet-400 to-violet-600', color: 'text-violet-50', icon: 'flare', emoji: '✨' }
  return { title: 'Pemburu Surga', theme: 'from-sky-300 to-blue-500', color: 'text-sky-50', icon: 'cloud', emoji: '🏆' }
}

const MISSION_XP = {
  default: 20,
  subuh: 50, dhuhur: 50, ashar: 50, maghrib: 50, isya: 50,
  tarawih: 30, witir: 30, quran: 30, sedekah: 30,
  puasa: 100
}

const INITIAL_MISSIONS = [
  { id: 'sahur', label: 'Sahur', sub: 'Sebelum Subuh', icon: 'wb_twilight', type: 'check', question: 'Apakah sudah melaksanakan sahur sebelum melewati adzan subuh?' },
  { id: 'dzikir_pagi', label: 'Dzikir Pagi', sub: 'Pagi Hari', icon: 'spa', type: 'action', actionLabel: 'Buka Fitur Dzikir', actionLink: 'tasbih', question: 'Apakah sudah beridzikir pagi ini?' },
  { id: 'subuh', label: 'Sholat Subuh', sub: 'Subuh', icon: 'mosque', type: 'check', question: 'Apakah sudah sholat subuh hari ini?' },
  { id: 'dhuhur', label: 'Sholat Dhuhur', sub: 'Siang Hari', icon: 'sunny', type: 'check', question: 'Apakah sudah sholat dhuhur hari ini?' },
  { id: 'ashar', label: 'Sholat Ashar', sub: 'Sore Hari', icon: 'wb_sunny', type: 'check', question: 'Apakah sudah sholat ashar hari ini?' },
  { id: 'maghrib', label: 'Sholat Maghrib', sub: 'Terbenam Matahari', icon: 'nights_stay', type: 'check', question: 'Apakah sudah sholat maghrib hari ini?' },
  { id: 'puasa', label: 'Puasa Hari Ini', sub: 'Berpuasa', icon: 'no_food', type: 'special_puasa', question: 'Apakah sudah melakukan puasa penuh hari ini?' },
  { id: 'buka', label: 'Buka Puasa', sub: 'Waktu Berbuka', icon: 'restaurant', type: 'check', question: 'Apakah sudah berbuka puasa?' },
  { id: 'isya', label: 'Sholat Isya', sub: 'Malam Hari', icon: 'bedtime', type: 'check', question: 'Apakah sudah sholat isya hari ini?' },
  { id: 'tarawih', label: 'Sholat Tarawih', sub: 'Malam Ramadan', icon: 'star', type: 'check', question: 'Apakah sudah sholat terawih hari ini?' },
  { id: 'sedekah', label: 'Sedekah', sub: 'Amal Jariyah', icon: 'volunteer_activism', type: 'check', question: 'Apakah sudah sedekah hari ini?' },
  { id: 'dzikir_petang', label: 'Dzikir Petang', sub: 'Petang Hari', icon: 'psychology', type: 'action', actionLabel: 'Buka Fitur Dzikir', actionLink: 'tasbih', question: 'Apakah sudah beridzikir petang ini?' },
  { id: 'quran', label: 'Baca Al Quran', sub: 'Tilawah', icon: 'menu_book', type: 'action', actionLabel: 'Buka Al Quran', actionLink: 'doa', question: 'Apakah sudah membaca alquran hari ini?' },
]

const HAID_BLOCKED_MISSIONS = ['sahur', 'subuh', 'dhuhur', 'ashar', 'maghrib', 'isya', 'tarawih', 'witir', 'puasa', 'buka', 'quran']

export default function RamadhanTracker() {
  const { setActiveTab, haidMode, setHaidMode, location, ramadhanStartDate, darkMode } = useApp()
  const { user } = useAuth()
  const [trackerData, setTrackerData] = useState({})
  const [expandedId, setExpandedId] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dailyData, setDailyData] = useState({ prayerTimes: null, hijri: null })
  const [loading, setLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  const [userXP, setUserXP] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showStreakCelebration, setShowStreakCelebration] = useState(false)
  const [isRamadhan, setIsRamadhan] = useState(null)
  const [hijriMonthNum, setHijriMonthNum] = useState(null)
  const [hijriDay, setHijriDay] = useState(null)
  const [showEidCelebration, setShowEidCelebration] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const formatDateForApi = (date) => {
    const d = new Date(date)
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}-${mm}-${yyyy}`
  }

  useEffect(() => {
    const checkRamadhan = async () => {
      if (ramadhanStartDate) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const startDate = new Date(ramadhanStartDate)
        startDate.setHours(0, 0, 0, 0)
        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 30)

        const isRam = today >= startDate && today < endDate
        const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24))
        const ramDay = daysSinceStart + 1

        setIsRamadhan(isRam)

        if (isRam) {
          setHijriMonthNum(9)
          setHijriDay(ramDay)
        } else if (today >= endDate) {
          const daysSinceEnd = Math.floor((today - endDate) / (1000 * 60 * 60 * 24))
          setHijriMonthNum(10)
          setHijriDay(daysSinceEnd + 1)
        }
        return
      }

      try {
        const todayStr = formatDateForApi(new Date())
        const lat = location?.lat || -6.2088
        const lng = location?.lng || 106.8456
        const res = await fetch(`https://api.aladhan.com/v1/timings/${todayStr}?latitude=${lat}&longitude=${lng}&method=20`)
        const json = await res.json()
        if (json.code === 200 && json.data) {
          const monthNum = json.data.date.hijri.month.number
          const isRam = Number(monthNum) === 9
          setIsRamadhan(isRam)
          setHijriMonthNum(Number(monthNum))
          setHijriDay(Number(json.data.date.hijri.day))
        }
      } catch (e) { console.error('Ramadhan check failed:', e) }
    }
    checkRamadhan()
  }, [ramadhanStartDate])

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
        try {
            const selDate = new Date(selectedDate)
            const mm = selDate.getMonth() + 1
            const yyyy = selDate.getFullYear()
            const dd = selDate.getDate()
            let prayerTimesResult = null

            if (location?.provinsi && location?.kabkota) {
              const jadwal = await fetchEquranSchedule(location.provinsi, location.kabkota, mm, yyyy)
              if (jadwal) {
                const todaySchedule = jadwal.find(j => j.tanggal === dd)
                if (todaySchedule) {
                  prayerTimesResult = [
                    { name: 'Subuh', time: todaySchedule.subuh },
                    { name: 'Dzuhur', time: todaySchedule.dzuhur },
                    { name: 'Ashar', time: todaySchedule.ashar },
                    { name: 'Maghrib', time: todaySchedule.maghrib },
                    { name: 'Isya', time: todaySchedule.isya },
                  ]
                }
              }
            }

            if (!prayerTimesResult) {
              const dateStr = formatDateForApi(selectedDate)
              const lat = location?.lat || -6.2088
              const lng = location?.lng || 106.8456
              const res = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=20`)
              const json = await res.json()
              if (json.code === 200 && json.data) {
                const timings = json.data.timings
                prayerTimesResult = [
                  { name: 'Subuh', time: timings.Fajr.replace(/\s*\(.*\)/, '') },
                  { name: 'Dzuhur', time: timings.Dhuhr.replace(/\s*\(.*\)/, '') },
                  { name: 'Ashar', time: timings.Asr.replace(/\s*\(.*\)/, '') },
                  { name: 'Maghrib', time: timings.Maghrib.replace(/\s*\(.*\)/, '') },
                  { name: 'Isya', time: timings.Isha.replace(/\s*\(.*\)/, '') },
                ]
              }
            }

            const dateStr = formatDateForApi(selectedDate)
            const lat = location?.lat || -6.2088
            const lng = location?.lng || 106.8456

            if (ramadhanStartDate) {
                const startDate = new Date(ramadhanStartDate)
                startDate.setHours(0, 0, 0, 0)
                const selDateClean = new Date(selectedDate)
                selDateClean.setHours(0, 0, 0, 0)
                const daysSinceStart = Math.floor((selDateClean - startDate) / (1000 * 60 * 60 * 24))
                const customDay = daysSinceStart + 1

                setDailyData({
                    prayerTimes: prayerTimesResult,
                    hijri: {
                        day: String(customDay),
                        month: 'Ramadhan',
                        monthNumber: 9,
                        year: String(new Date(ramadhanStartDate).getFullYear() - 579),
                        full: `${customDay} Ramadhan ${new Date(ramadhanStartDate).getFullYear() - 579} H`
                    }
                })
            } else {
                try {
                    const hijriRes = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=20`)
                    const hijriJson = await hijriRes.json()
                    
                    if (hijriJson.code === 200 && hijriJson.data) {
                        const h = hijriJson.data.date.hijri
                        const monthNumber = Number(h.month.number)
                        setDailyData({
                            prayerTimes: prayerTimesResult,
                            hijri: {
                                day: h.day,
                                month: h.month.en,
                                monthNumber: monthNumber,
                                year: h.year,
                                full: `${h.day} ${h.month.en} ${h.year} H`
                            }
                        })
                        const todayStr = formatDateForApi(new Date())
                        if (dateStr === todayStr) {
                            const isRam = monthNumber === 9
                            setIsRamadhan(isRam)
                            setHijriMonthNum(monthNumber)
                            setHijriDay(Number(h.day))
                        }
                    } else if (prayerTimesResult) {
                        setDailyData(prev => ({ ...prev, prayerTimes: prayerTimesResult }))
                    }
                } catch (hijriErr) {
                    if (prayerTimesResult) {
                        setDailyData(prev => ({ ...prev, prayerTimes: prayerTimesResult }))
                    }
                }
            }
        } catch (e) { console.error(e) } finally { setLoading(false) }
    }
    fetchData()
  }, [selectedDate, location?.provinsi, location?.kabkota, ramadhanStartDate])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getStorageKey = (date) => {
      const offset = date.getTimezoneOffset()
      const localDate = new Date(date.getTime() - (offset*60*1000))
      return localDate.toISOString().split('T')[0]
  }
  const dateKey = getStorageKey(selectedDate)

  const calculateStreak = (data) => {
    let count = 0
    const today = new Date()
    for (let i = 0; i < 60; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(today.getDate() - i)
      const key = getStorageKey(checkDate)
      const dayData = data[key]
      if (!dayData) {
        if (i === 0) continue
        break
      }
      const dayIsHaid = dayData._haidMode === true
      const missionsToCheck = dayIsHaid
        ? INITIAL_MISSIONS.filter(m => !HAID_BLOCKED_MISSIONS.includes(m.id))
        : INITIAL_MISSIONS
      const allCompleted = missionsToCheck.every(mission => {
        const val = dayData[mission.id]
        if (mission.id === 'puasa') {
          return val && typeof val === 'object' && val.status === true
        }
        return val === true
      })
      if (allCompleted) {
        count++
      } else {
        if (i === 0) continue
        break
      }
    }
    return count
  }
  
  useEffect(() => {
    const saved = localStorage.getItem(TRACKER_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      setTrackerData(parsed)
      if (parsed._gamification) {
          setUserXP(parsed._gamification.xp || 0)
          setStreak(parsed._gamification.streak || 0)
      }
    }
    
    if (user) {
      get(ref(database, `users/${user.uid}/${TRACKER_KEY}`)).then(snap => {
        if (snap.exists()) {
          const parsed = snap.val()
          setTrackerData(parsed)
          if (parsed._gamification) {
            setUserXP(parsed._gamification.xp || 0)
            setStreak(parsed._gamification.streak || 0)
          }
        }
      }).catch(console.error)
    }
  }, [user])

  useEffect(() => {
    if (isRamadhan === true) {
      const saved = localStorage.getItem(TRACKER_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setStreak(calculateStreak(parsed))
      }
    }
  }, [isRamadhan])

  useEffect(() => {
    if (isRamadhan === false && hijriMonthNum === 10 && hijriDay !== null && hijriDay <= 14) {
      const hijriYear = dailyData?.hijri?.year
      const eidKey = `sholatku-eid-shown-${hijriYear || 'unknown'}`
      if (!localStorage.getItem(eidKey)) {
        localStorage.setItem(eidKey, 'true')
        setShowEidCelebration(true)
        const timer = setTimeout(() => setShowEidCelebration(false), 8000)
        return () => clearTimeout(timer)
      }
    }
  }, [isRamadhan, hijriMonthNum, hijriDay, dailyData])

  const changeDate = (days) => {
      const newDate = new Date(selectedDate)
      newDate.setDate(selectedDate.getDate() + days)
      setSelectedDate(newDate)
  }

  const updateData = (missionId, value) => {
    if (!isRamadhan) return
    
    const newMissionData = {
      ...trackerData,
      [dateKey]: {
        ...trackerData[dateKey],
        [missionId]: value,
        _haidMode: haidMode,
      }
    }
    
    const prevValue = trackerData[dateKey]?.[missionId]
    const isCompleting = (value === true || (typeof value === 'object' && value?.status === true))
    const wasCompleted = (prevValue === true || (typeof prevValue === 'object' && prevValue?.status === true))

    let newXP = userXP
    
    if (isCompleting && !wasCompleted) {
        const xpAmount = MISSION_XP[missionId] || MISSION_XP.default
        newXP = Math.min(newXP + xpAmount, MAX_XP)
        setUserXP(newXP)
    } else if (!isCompleting && wasCompleted) {
        const xpAmount = MISSION_XP[missionId] || MISSION_XP.default
        newXP = Math.max(0, newXP - xpAmount)
        setUserXP(newXP)
    }

    const newStreak = calculateStreak(newMissionData)
    const finalData = {
      ...newMissionData,
      _gamification: {
          xp: newXP,
          streak: newStreak,
      }
    }
    setTrackerData(finalData)
    localStorage.setItem(TRACKER_KEY, JSON.stringify(finalData))
    if (user) {
        set(ref(database, `users/${user.uid}/${TRACKER_KEY}`), finalData).catch(console.error)
    }
    
    const oldStreak = streak
    setStreak(newStreak)
    
    if (newStreak > oldStreak && isCompleting) {
      setShowStreakCelebration(true)
      setTimeout(() => setShowStreakCelebration(false), 4000)
    }
  }

  const toggleExpand = (id, isLocked) => {
    if (isLocked) return
    if (expandedId === id) setExpandedId(null)
    else setExpandedId(id)
  }

  const setPuasaStatus = (status, reason = null) => {
    updateData('puasa', { status, reason })
  }

  const getMissionLockStatus = (missionId) => {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const selStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    
    if (selStart < todayStart) return { locked: false, time: null }
    if (selStart > todayStart) return { locked: true, time: 'Future' } 

    if (!dailyData.prayerTimes) return { locked: false, time: null }

    const getTime = (name) => dailyData.prayerTimes.find(t => t.name === name)?.time
    const getPrayerDate = (timeStr) => {
        if (!timeStr) return null
        const [hours, minutes] = timeStr.split(':').map(Number)
        const date = new Date()
        date.setHours(hours, minutes, 0, 0)
        return date
    }

    let unlockTimeStr = null
    switch (missionId) {
        case 'subuh':
        case 'dzikir_pagi': unlockTimeStr = getTime('Subuh'); break
        case 'dhuhur': unlockTimeStr = getTime('Dzuhur'); break
        case 'ashar':
        case 'dzikir_petang': unlockTimeStr = getTime('Ashar'); break
        case 'maghrib':
        case 'buka':
        case 'puasa': unlockTimeStr = getTime('Maghrib'); break
        case 'isya':
        case 'tarawih': unlockTimeStr = getTime('Isya'); break
        default: return { locked: false, time: null }
    }

    if (unlockTimeStr) {
        const unlockDate = getPrayerDate(unlockTimeStr)
        if (currentTime < unlockDate) {
            return { locked: true, time: unlockTimeStr }
        }
    }
    return { locked: false, time: null }
  }

  const isToday = (() => {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const selStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    return selStart.getTime() === todayStart.getTime()
  })()
  const dayHaidActive = isToday ? haidMode : !!(trackerData[dateKey]?._haidMode)
  const activeMissions = dayHaidActive
    ? INITIAL_MISSIONS.filter(m => !HAID_BLOCKED_MISSIONS.includes(m.id))
    : INITIAL_MISSIONS

  const currentData = trackerData[dateKey] || {}
  const totalMissions = activeMissions.length
  const completedCount = activeMissions.reduce((acc, mission) => {
    if (mission.id === 'puasa') {
      return acc + (currentData[mission.id]?.status ? 1 : 0)
    }
    return acc + (currentData[mission.id] ? 1 : 0)
  }, 0)
  const progress = Math.round((completedCount / totalMissions) * 100)

  const { level, currentLevelXP, nextLevelXP } = getLevelFromXP(userXP)
  const rank = getRankData(level)
  const levelProgress = Math.min(100, Math.round((currentLevelXP / nextLevelXP) * 100))

  return (
    <div className="flex flex-col gap-4 md:gap-6 animate-fade-in pb-10">

      {/* STREAK FIRE CELEBRATION OVERLAY */}
      {showStreakCelebration && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{touchAction: 'none'}}
          onClick={() => setShowStreakCelebration(false)}
        >
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
          
          {[...Array(16)].map((_, i) => {
            const leftPos = 5 + Math.random() * 90
            const dur = 1.8 + Math.random() * 1.5
            const del = Math.random() * 1.2
            const emoji = ['\ud83d\udd25', '\ud83d\udd25', '\ud83d\udd25', '\u2b50', '\u2728', '\ud83d\udca5'][Math.floor(Math.random() * 6)]
            return (
              <span 
                key={i} 
                className="absolute text-xl md:text-3xl"
                style={{
                  left: `${leftPos}%`,
                  top: '100%',
                  animation: `fireFloat ${dur}s ${del}s ease-out forwards`,
                  willChange: 'transform, opacity',
                  zIndex: 1,
                }}
              >
                {emoji}
              </span>
            )
          })}
          
          <div className="relative z-10 text-center px-6">
            <div className="text-6xl md:text-8xl mb-3" style={{animation: 'streakBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'}}>{'\ud83d\udd25'}</div>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white mb-2" style={{animation: 'streakBounce 0.6s 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275) both'}}>STREAK!</h2>
            <p className="text-base md:text-xl font-bold text-amber-400" style={{animation: 'streakBounce 0.6s 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both'}}>{streak} Hari Berturut-turut {'\ud83d\udd25'}</p>
            <p className="text-xs md:text-sm text-white/60 mt-2 font-medium" style={{animation: 'streakBounce 0.6s 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) both'}}>Semua misi hari ini selesai!</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fireFloat {
          0% { transform: translateY(0) scale(0.3); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(-110vh) scale(1); opacity: 0; }
        }
        @keyframes streakBounce {
          0% { transform: scale(0) translateY(20px); opacity: 0; }
          70% { transform: scale(1.1) translateY(-5px); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes curtainLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes curtainRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        @keyframes ketupatFall {
          0% { transform: translateY(-20px) rotate(0deg) scale(0); opacity: 0; }
          15% { opacity: 1; transform: translateY(0) rotate(10deg) scale(1); }
          50% { transform: translateY(30vh) rotate(-15deg) scale(1); opacity: 1; }
          100% { transform: translateY(100vh) rotate(25deg) scale(0.8); opacity: 0; }
        }
        @keyframes eidFadeIn {
          0% { transform: scale(0.5) translateY(30px); opacity: 0; }
          60% { transform: scale(1.05) translateY(-5px); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* EID CELEBRATION OVERLAY */}
      {showEidCelebration && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{touchAction: 'none'}}
          onClick={() => setShowEidCelebration(false)}
        >
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>

          <div 
            className="absolute top-0 left-0 w-1/2 h-full z-10"
            style={{
              background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 30%, #14b8a6 60%, #2dd4bf 100%)',
              animation: 'curtainLeft 1.8s 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              boxShadow: '5px 0 30px rgba(0,0,0,0.3)',
            }}
          >
            <div className="absolute right-4 top-0 w-1 h-32 bg-amber-400/80 rounded-b-full"></div>
            <div className="absolute right-2 top-32 w-5 h-5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/30"></div>
          </div>

          <div 
            className="absolute top-0 right-0 w-1/2 h-full z-10"
            style={{
              background: 'linear-gradient(225deg, #0f766e 0%, #0d9488 30%, #14b8a6 60%, #2dd4bf 100%)',
              animation: 'curtainRight 1.8s 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              boxShadow: '-5px 0 30px rgba(0,0,0,0.3)',
            }}
          >
            <div className="absolute left-4 top-0 w-1 h-32 bg-amber-400/80 rounded-b-full"></div>
            <div className="absolute left-2 top-32 w-5 h-5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/30"></div>
          </div>

          {[...Array(20)].map((_, i) => {
            const leftPos = 3 + Math.random() * 94
            const dur = 3 + Math.random() * 3
            const del = 1.5 + Math.random() * 2
            const size = 0.8 + Math.random() * 0.6
            const emoji = ['⭐', '✨', '🌙', '🌟', '✨', '⭐'][Math.floor(Math.random() * 6)]
            return (
              <span 
                key={i} 
                className="absolute text-lg md:text-2xl z-20"
                style={{
                  left: `${leftPos}%`,
                  top: '-5%',
                  animation: `ketupatFall ${dur}s ${del}s ease-in forwards`,
                  willChange: 'transform, opacity',
                  transform: `scale(${size})`,
                  opacity: 0,
                }}
              >
                {emoji}
              </span>
            )
          })}
          
          <div 
            className="relative z-30 text-center px-6 max-w-md mx-auto"
            style={{animation: 'eidFadeIn 0.8s 2.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) both'}}
          >
            <div className="text-6xl md:text-8xl mb-2">{"\ud83c\udf19"}</div>
            
            <h2 
              className="font-heading text-3xl md:text-5xl font-black text-transparent bg-clip-text mb-1"
              style={{
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #fde68a, #fbbf24, #fde68a, #fbbf24)',
                backgroundSize: '200% auto',
                animation: 'shimmer 3s linear infinite',
              }}
            >
              Selamat Hari Raya
            </h2>
            <h2 
              className="font-heading text-4xl md:text-6xl font-black text-transparent bg-clip-text mb-4"
              style={{
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #fde68a, #fbbf24, #fde68a, #fbbf24)',
                backgroundSize: '200% auto',
                animation: 'shimmer 3s 0.5s linear infinite',
              }}
            >
              Idul Fitri
            </h2>
            
            <p className="text-sm md:text-base text-emerald-300 font-bold mb-1">1 Syawal {new Date().getFullYear() - 579} H</p>
            <p className="text-xs md:text-sm text-white/60 mb-6 font-medium">Mohon Maaf Lahir dan Batin</p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
              <p className="text-[10px] md:text-xs text-emerald-400 font-bold uppercase tracking-widest mb-3">Pencapaian Ramadhan</p>
              <div className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center gap-1 bg-white/10 px-4 py-3 rounded-xl border border-white/5">
                  <span className="material-icons text-amber-400 text-xl">emoji_events</span>
                  <span className="text-xs font-bold text-white">Lv.{level}</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white/10 px-4 py-3 rounded-xl border border-white/5">
                  <span className="material-icons text-cyan-400 text-xl">bolt</span>
                  <span className="text-xs font-bold text-white">{userXP} XP</span>
                </div>
                {streak > 0 && (
                  <div className="flex flex-col items-center gap-1 bg-white/10 px-4 py-3 rounded-xl border border-white/5">
                    <span className="material-icons text-orange-400 text-xl">local_fire_department</span>
                    <span className="text-xs font-bold text-white">{streak}d</span>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-[10px] text-white/40 mt-4 font-medium uppercase tracking-wider">Ketuk untuk menutup</p>
          </div>
        </div>
      )}
      
      {/* GAMIFICATION HEADER */}
      <div className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${rank.theme} p-6 shadow-xl`}>
           <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
               <span className="material-icons" style={{fontSize: '140px'}}>{rank.icon}</span>
           </div>
           
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left w-full md:w-auto">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-xl text-white backdrop-blur-sm">Level {level}</span>
                        <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-xl backdrop-blur-sm ${streak > 0 ? 'bg-amber-500 text-amber-900 shadow-sm' : 'bg-white/10 text-white/80'}`}>
                            <span className="material-icons text-[14px]">local_fire_department</span>
                            {streak > 0 ? `${streak} Streak 🔥` : '0 Streak'}
                        </span>
                        {haidMode && (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-xl bg-rose-500 text-white shadow-sm">
                                🌸 Mode Haid
                            </span>
                        )}
                    </div>
                    <h2 className="font-heading text-2xl md:text-4xl font-black tracking-tight mb-1 text-white drop-shadow-sm">{rank.emoji} {rank.title}</h2>
                    <p className="text-xs font-medium text-white/80">Terus tingkatkan ibadahmu!</p>
                </div>

                <div className="w-full md:w-1/2 max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                    <div className="flex justify-between text-[10px] font-bold mb-2 text-white">
                        <span className="uppercase tracking-wider">XP SAYA</span>
                        <span>{userXP} XP Total</span>
                    </div>
                    <div className="relative h-2 w-full bg-black/20 rounded-full overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 h-full bg-white transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                            style={{width: `${levelProgress}%`}}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-2 font-medium">
                        <p className="text-[10px] text-white/60">Level {level}</p>
                        <p className="text-[10px] text-white/70">{nextLevelXP - currentLevelXP} XP → Lv.{Math.min(level + 1, 30)}</p>
                    </div>
                </div>
           </div>
      </div>

      {/* Stats & Nav */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Calendar Box */}
        <div className={`relative overflow-hidden rounded-[2rem] lg:col-span-2 shadow-sm border p-6 flex flex-col justify-center transition-all ${
          darkMode ? 'glass-clay-dark' : 'glass-clay-light'
        }`}>
           <div className="absolute inset-0 bg-cover bg-center opacity-[0.03] dark:opacity-[0.05]" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_GSIoGffAJfdgg8MsQGYRPU7IT-tJBfRwxvYy-PkgVwhEaGcR5u_sERl2ByfxX3UNo6miJ0Y-mjOPEzMrTiMeoXHYOvs9MJ5Wq4uPcfMjGVXLH_kKfKKda4rstBiDscYv2M96eGHQBiQBpNWuFKcunRC_2twJE35gSqkMTm4s-9Irexy12xGS6osnKh2a42JD6IPbfn3nXOVtraNuOCaPeQA2Kz3Ydr_r9GNVo3KK7poWAoXk-Lnrw-o7m1ZxwxQ2iT5xM51xqD8')"}}></div>
           <div className="relative z-10 flex flex-col h-full justify-center">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                      darkMode ? 'bg-primary/20 text-primary border-primary/30' : 'bg-primary/10 text-primary-dark border-primary/20'
                    }`}>
                        <span className="material-icons text-sm">calendar_today</span>
                        <span>{dailyData.hijri ? dailyData.hijri.full : 'Ramadhan 1445 H'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-2 rounded-2xl p-1 border ${
                          darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/60 border-slate-200'
                        }`}>
                            <button onClick={() => { const hDay = Number(dailyData.hijri?.day || 1); if (hDay > 1) changeDate(-1); }} className={`p-1.5 rounded-xl transition-all ${darkMode ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'} ${Number(dailyData.hijri?.day || 1) <= 1 ? 'opacity-30 pointer-events-none' : ''}`}><span className="material-icons text-lg">chevron_left</span></button>
                            <span className={`text-sm font-bold min-w-[90px] text-center ${darkMode ? 'text-white' : 'text-slate-800'}`}>{dailyData.hijri ? `${dailyData.hijri.day} ${dailyData.hijri.month}` : '...'}</span>
                            <button onClick={() => { const hDay = Number(dailyData.hijri?.day || 30); if (hDay < 30) changeDate(1); }} className={`p-1.5 rounded-xl transition-all ${darkMode ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'} ${Number(dailyData.hijri?.day || 30) >= 30 ? 'opacity-30 pointer-events-none' : ''}`}><span className="material-icons text-lg">chevron_right</span></button>
                        </div>
                        <button onClick={() => setShowCalendar(!showCalendar)} className={`p-2.5 rounded-2xl transition-all border ${showCalendar ? 'bg-primary text-white border-primary shadow-sm' : darkMode ? 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800' : 'bg-white/60 text-slate-500 border-slate-200 hover:bg-white'}`}>
                            <span className="material-icons text-lg">calendar_month</span>
                        </button>
                    </div>
                </div>

                {/* Ramadan Calendar Grid */}
                {showCalendar && dailyData.hijri && (
                    <div className={`rounded-2xl p-4 border mb-5 animate-fade-in ${
                      darkMode ? 'bg-slate-900/50 border-slate-700/50' : 'bg-white/50 border-slate-200'
                    }`}>
                        <div className="flex items-center justify-between mb-4">
                            <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Ramadhan {dailyData.hijri.year} H</p>
                            <button onClick={() => setShowCalendar(false)} className={`transition-colors ${darkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}><span className="material-icons text-sm">close</span></button>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            {[...Array(30)].map((_, i) => {
                                const day = i + 1
                                const currentHijriDay = Number(dailyData.hijri.day)
                                const dayDiff = day - currentHijriDay
                                const dayDate = new Date(selectedDate)
                                dayDate.setDate(selectedDate.getDate() + dayDiff)
                                const dayKey = (() => {
                                    const offset = dayDate.getTimezoneOffset()
                                    return new Date(dayDate.getTime() - (offset*60*1000)).toISOString().split('T')[0]
                                })()
                                const dayData = trackerData[dayKey]
                                const isSelected = day === currentHijriDay
                                const todayHijriDay = hijriDay
                                const isToday = day === todayHijriDay
                                const isFuture = todayHijriDay ? day > todayHijriDay : false

                                const dayIsHaid = dayData?._haidMode === true
                                const missionsForDay = dayIsHaid
                                    ? INITIAL_MISSIONS.filter(m => !HAID_BLOCKED_MISSIONS.includes(m.id))
                                    : INITIAL_MISSIONS
                                const completedMissions = dayData ? missionsForDay.filter(m => {
                                    const val = dayData[m.id]
                                    return m.id === 'puasa' ? val?.status === true : val === true
                                }).length : 0
                                const totalForDay = missionsForDay.length
                                const isComplete = completedMissions > 0 && completedMissions === totalForDay
                                const hasProgress = completedMissions > 0 && !isComplete

                                return (
                                    <button
                                        key={day}
                                        onClick={() => {
                                            const newDate = new Date(selectedDate)
                                            newDate.setDate(selectedDate.getDate() + dayDiff)
                                            setSelectedDate(newDate)
                                            setShowCalendar(false)
                                        }}
                                        disabled={isFuture}
                                        className={`relative flex flex-col items-center justify-center py-2 rounded-xl text-sm font-bold transition-all
                                            ${isSelected ? 'bg-primary text-white shadow-[0_4px_15px_rgba(13,150,139,0.3)] scale-105' : ''}
                                            ${isToday && !isSelected ? (darkMode ? 'bg-primary/20 text-primary ring-1 ring-primary/50' : 'bg-primary/10 text-primary ring-1 ring-primary/30') : ''}
                                            ${!isSelected && !isToday && !isFuture ? (darkMode ? 'bg-slate-800/40 text-slate-300 hover:bg-slate-700' : 'bg-white/60 text-slate-600 hover:bg-white') : ''}
                                            ${isFuture ? (darkMode ? 'bg-white/5 text-slate-600 cursor-not-allowed' : 'bg-slate-100/50 text-slate-300 cursor-not-allowed') : ''}
                                        `}
                                    >
                                        <span>{day}</span>
                                        <div className="flex items-center gap-1 h-1.5 mt-1">
                                            {dayIsHaid && <span className="block w-1.5 h-1.5 rounded-full bg-rose-400"></span>}
                                            {isComplete && <span className="block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                                            {hasProgress && !isComplete && <span className="block w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                        <div className={`flex items-center justify-center gap-4 mt-4 text-[10px] font-bold uppercase tracking-wider flex-wrap ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Selesai</span>
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Sebagian</span>
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400"></span> Haid</span>
                            <span className="flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></span> Belum</span>
                        </div>
                    </div>
                )}
                
                <p className={`mb-5 text-xs md:text-sm font-medium leading-relaxed hidden md:block max-w-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    "Semoga bulan suci ini membawa kedamaian, kebahagiaan, dan pertumbuhan spiritual dalam hidupmu."
                </p>
                <div className="flex flex-wrap gap-3">
                     <button onClick={() => setActiveTab('schedule')} className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 ${
                        darkMode ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-primary text-white shadow-[0_4px_15px_rgba(13,150,139,0.2)]'
                     }`}>
                        <span className="material-icons text-[18px]">schedule</span> Jadwal Sholat
                    </button>
                    <button onClick={() => setActiveTab('doa')} className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all ${
                        darkMode ? 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-700' : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-white'
                    }`}>
                        <span className="material-icons text-[18px]">menu_book</span> Al-Quran
                    </button>
                </div>
           </div>
        </div>

        {/* Progress Box */}
        <div className={`flex flex-row md:flex-col items-center md:items-stretch gap-4 rounded-[2rem] border p-6 transition-all ${
            darkMode ? 'glass-clay-dark' : 'glass-clay-light'
        }`}>
          <div className="flex flex-col items-center justify-center flex-1 md:flex-none">
            <h3 className={`mb-4 text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Progress Hari Ini</h3>
            <div className="relative h-24 w-24 md:h-36 md:w-36 mb-4">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle className={darkMode ? "stroke-slate-800" : "stroke-slate-200"} cx="50" cy="50" fill="none" r="40" strokeWidth="8"></circle>
                  <circle className="text-primary transition-all duration-1000 ease-out stroke-current" cx="50" cy="50" fill="none" r="40" strokeDasharray={2 * Math.PI * 40} strokeDashoffset={2 * Math.PI * 40 - (progress / 100) * 2 * Math.PI * 40} strokeLinecap="round" strokeWidth="8"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={`text-2xl md:text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>{progress}%</span>
                  <span className={`text-[10px] font-medium uppercase mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Selesai</span>
                </div>
            </div>
          </div>
          <div className={`flex flex-col md:flex-row justify-between gap-3 rounded-2xl p-4 border ${
            darkMode ? 'bg-slate-900/30 border-white/5' : 'bg-slate-100/60 border-slate-200/60'
          } flex-1 md:flex-none`}>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Selesai</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{completedCount}<span className={`text-sm font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>/{totalMissions}</span></p>
            </div>
            <div className="md:text-right">
              <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Belum</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{totalMissions - completedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="relative">
        {/* Ramadhan Ended / Loading Overlay */}
        {isRamadhan !== true && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[2rem] bg-slate-900/40 backdrop-blur-md">
            {isRamadhan === null ? (
              <div className="text-center px-6 py-10">
                <span className="material-icons text-5xl text-primary animate-spin">refresh</span>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mt-4">Memeriksa status...</p>
              </div>
            ) : hijriMonthNum === 10 && hijriDay !== null && hijriDay <= 14 ? (
              <div className="text-center px-6 py-10 glass-clay-dark rounded-3xl p-8 border border-white/10 max-w-sm shadow-2xl">
                <span className="text-6xl block mb-4">🌙</span>
                <h3 className="text-2xl font-black text-white mb-2">Ramadhan Telah Berakhir</h3>
                <p className="text-sm font-medium text-slate-300 mb-6">Misi terkunci dan XP tidak bisa bertambah. Sampai jumpa di Ramadhan berikutnya!</p>
                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center justify-center gap-2 bg-primary/20 px-4 py-2.5 rounded-xl border border-primary/30">
                    <span className="material-icons text-primary text-sm">emoji_events</span>
                    <span className="text-sm font-bold text-primary">Level {level} • {userXP} XP</span>
                  </div>
                  {streak > 0 && (
                    <div className="inline-flex items-center justify-center gap-2 bg-amber-500/20 px-4 py-2.5 rounded-xl border border-amber-500/30">
                      <span className="material-icons text-amber-400 text-sm">local_fire_department</span>
                      <span className="text-sm font-bold text-amber-400">{streak} Streak</span>
                    </div>
                  )}
                </div>
                <div className="mt-8 relative z-50">
                  <THREnvelope />
                </div>

                <button 
                  onClick={() => setShowEidCelebration(true)}
                  className="mt-6 text-[10px] md:text-xs font-bold text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest flex items-center justify-center gap-1 mx-auto"
                >
                  <span className="material-icons text-sm">replay</span>
                  Putar Ulang Animasi Tirai
                </button>

              </div>
            ) : (
              <div className="text-center px-6 py-10 glass-clay-dark rounded-3xl p-8 border border-white/10 max-w-sm shadow-2xl">
                <span className="text-6xl block mb-4">🕌</span>
                <h3 className="text-2xl font-black text-white mb-2">Belum Ramadhan</h3>
                <p className="text-sm font-medium text-slate-300">Misi akan terbuka saat Ramadhan tiba. Bersiaplah!</p>
              </div>
            )}
          </div>
        )}
        
        <div className={`${isRamadhan !== true ? 'opacity-30 pointer-events-none' : ''}`}>
        
        {/* Haid Mode Banner */}
        {dayHaidActive && (
          <div className={`mb-6 rounded-2xl p-4 flex items-center justify-between border ${
            darkMode ? 'bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-rose-500/20' : 'bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-rose-500/20' : 'bg-rose-100'}`}>
                <span className="text-xl">🌸</span>
              </div>
              <div>
                <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Mode Haid Aktif</p>
                <p className={`text-[11px] font-medium mt-0.5 ${darkMode ? 'text-rose-400' : 'text-rose-500'}`}>Hanya menampilkan misi yang bisa dilakukan</p>
              </div>
            </div>
            <button
              onClick={() => setHaidMode(false)}
              className={`text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl transition-all ${
                darkMode ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30' : 'bg-rose-100 text-rose-600 hover:bg-rose-200'
              }`}
            >
              Matikan
            </button>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <span className="material-icons text-primary text-xl">task_alt</span>
             <h3 className={`font-heading text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>Misi Harian</h3>
          </div>
          {dayHaidActive && <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${darkMode ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-50 text-rose-500'}`}>{activeMissions.length} misi tersedia</span>}
        </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {activeMissions.map((mission) => {
            const isPuasa = mission.id === 'puasa'
            const current = currentData[mission.id]
            const isDone = isPuasa ? current?.status : !!current
            const puasaData = currentData['puasa'] || { status: true, reason: null }
            const isExpanded = expandedId === mission.id
            const { locked, time: unlockTime } = getMissionLockStatus(mission.id)
            const isFailed = !locked && (isPuasa ? (!puasaData.status && current) : (current === false))
            const xpVal = MISSION_XP[mission.id] || MISSION_XP.default

            if (locked) {
                return (
                    <div key={mission.id} className={`group flex flex-col gap-3 rounded-2xl border p-4 opacity-60 cursor-not-allowed ${
                        darkMode ? 'glass-clay-dark' : 'glass-clay-light'
                    }`}>
                        <div className="flex items-start justify-between">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
                                <span className="material-icons text-[20px]">{mission.icon}</span>
                            </div>
                            <span className={`material-icons text-[16px] ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>lock</span>
                        </div>
                        <div>
                            <h4 className={`text-sm font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{mission.label}</h4>
                            <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Terkunci {unlockTime}</p>
                        </div>
                    </div>
                )
            }

            if (isExpanded) {
                return (
                    <div key={mission.id} className={`group relative col-span-2 lg:col-span-2 flex flex-col justify-between overflow-hidden rounded-2xl border transition-all ${
                        darkMode ? 'glass-sage-dark border-primary/40 shadow-[0_0_20px_rgba(13,150,139,0.15)]' : 'glass-sage-light border-primary/30 shadow-[0_4px_20px_rgba(13,150,139,0.15)]'
                    }`}>
                        <div className={`absolute -right-4 -bottom-4 p-4 opacity-5 pointer-events-none transform rotate-12 ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>
                            <span className="material-icons text-[140px]">{mission.icon}</span>
                        </div>
                        <div className="relative z-10 flex items-start justify-between p-5 pb-2">
                            <div className="flex items-center gap-4">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-sm ${
                                    darkMode ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary-dark'
                                }`}>
                                    <span className="material-icons text-[24px]">{mission.icon}</span>
                                </div>
                                <div>
                                    <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{mission.label}</h4>
                                    <p className={`text-[11px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>{mission.sub}</p>
                                </div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); toggleExpand(mission.id, false); }} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                darkMode ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'bg-primary/10 text-primary hover:bg-primary/20'
                            }`}>
                                <span className="material-icons text-[20px]">expand_less</span>
                            </button>
                        </div>
                        <div className="relative z-10 flex-1 px-5 py-3">
                            <div className={`inline-block mb-3 rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider border ${
                                darkMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-200'
                            }`}>
                                +{xpVal} XP
                            </div>
                            <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{mission.question}</p>
                             {isPuasa && isFailed && (
                                <div className="mt-4 p-3 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5">
                                    <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Alasan Batal</label>
                                    <select value={puasaData.reason || ''} onChange={(e) => setPuasaStatus(false, e.target.value)} className={`w-full rounded-xl p-2.5 text-sm font-medium outline-none border transition-all ${
                                        darkMode ? 'bg-slate-800/80 border-red-500/30 text-white focus:border-red-400' : 'bg-white border-red-200 text-slate-800 focus:border-red-400'
                                    }`}>
                                        <option value="" disabled>Pilih Alasan</option><option value="Sakit">Sakit</option><option value="Musafir">Musafir</option><option value="Haid">Haid</option><option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className={`relative z-10 flex gap-3 p-5 border-t ${darkMode ? 'bg-slate-900/40 border-white/5' : 'bg-white/40 border-primary/10'}`}>
                             <button onClick={(e) => { e.stopPropagation(); if(isPuasa) { if(puasaData.status === true && current) updateData('puasa', null); else setPuasaStatus(true); } else { if(current === true) updateData(mission.id, null); else updateData(mission.id, true); } }} className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all border ${
                                isDone 
                                    ? darkMode ? 'bg-primary/20 text-primary border-primary/30' : 'bg-primary/10 text-primary border-primary/20 shadow-sm'
                                    : darkMode ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-sm'
                             }`}>
                                 <span className="material-icons text-[18px]">check_circle</span>
                                 {isPuasa ? 'Ya, Puasa' : 'Ya, Sudah'}
                             </button>
                            <button onClick={(e) => { e.stopPropagation(); if(isPuasa) { if(puasaData.status === false && current) updateData('puasa', null); else setPuasaStatus(false); } else { if(mission.actionLink) { setActiveTab(mission.actionLink); return; } if(current === false) updateData(mission.id, null); else updateData(mission.id, false); } }} className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all border ${
                                isFailed 
                                    ? darkMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-50 text-red-600 border-red-200 shadow-sm'
                                    : darkMode ? 'bg-transparent text-slate-400 border-slate-700 hover:bg-slate-800' : 'bg-transparent text-slate-500 border-slate-200 hover:bg-slate-50'
                            }`}>
                                <span className="material-icons text-[18px]">cancel</span>
                                {isPuasa ? 'Batal / Tidak' : 'Belum'}
                            </button>
                        </div>
                    </div>
                )
            }

            return (
                <div key={mission.id} onClick={() => toggleExpand(mission.id, locked)} className={`group flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition-all bento-card-hover ${
                    isDone 
                        ? darkMode ? 'border-primary/40 bg-primary/10' : 'border-primary/30 bg-primary/5' 
                        : isFailed 
                            ? darkMode ? 'border-red-500/30 bg-red-500/10' : 'border-red-200 bg-red-50' 
                            : darkMode ? 'glass-clay-dark hover:ring-1 hover:ring-primary/30' : 'glass-clay-light hover:bg-white'
                }`}>
                    <div className="flex items-start justify-between">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                             isDone 
                                ? darkMode ? 'bg-primary/20 text-primary' : 'bg-primary/20 text-primary' 
                                : isFailed 
                                    ? darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-200 text-red-600' 
                                    : darkMode ? 'bg-slate-800 text-slate-400 group-hover:text-primary' : 'bg-primary/5 text-slate-500 group-hover:text-primary'
                         }`}>
                             <span className="material-icons text-[20px]">{mission.icon}</span>
                         </div>
                         <div className="flex items-center gap-1.5">
                             {!isDone && !isFailed && <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                                 darkMode ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-amber-600 bg-amber-50 border-amber-200'
                             }`}>+{xpVal}</span>}
                             <span className={`material-icons text-[20px] transition-transform group-hover:rotate-90 ${
                                 isDone 
                                    ? 'text-primary' 
                                    : isFailed 
                                        ? 'text-red-500' 
                                        : darkMode ? 'text-slate-600 group-hover:text-slate-400' : 'text-slate-300 group-hover:text-slate-500'
                             }`}>
                                 {isDone ? 'check_circle' : (isFailed ? 'cancel' : 'chevron_right')}
                             </span>
                         </div>
                    </div>
                    <div>
                        <h4 className={`text-sm font-bold transition-colors ${
                            isDone 
                                ? darkMode ? 'text-white' : 'text-slate-800' 
                                : isFailed 
                                    ? darkMode ? 'text-red-400' : 'text-red-600' 
                                    : darkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-primary-dark'
                        }`}>
                            {mission.label}
                        </h4>
                        <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
                            isFailed 
                                ? darkMode ? 'text-red-500/70' : 'text-red-400' 
                                : darkMode ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                            {isFailed ? (isPuasa ? 'Batal' : 'Belum') : (isDone ? 'Selesai' : mission.sub)}
                        </p>
                    </div>
                </div>
            )
          })}
      </div>
      </div>
      </div>
    </div>
  )
}
