import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

const TRACKER_KEY = 'sholatku-ramadhan-tracker-v1'

// Gamification Constants
const XP_LEVEL_BASE = 100
const XP_MULTIPLIER = 1.1
const MAX_LEVEL = 30

// Calculate total XP needed to reach max level
const getMaxTotalXP = () => {
  let total = 0
  let xpNeeded = XP_LEVEL_BASE
  for (let i = 1; i < MAX_LEVEL; i++) {
    total += xpNeeded
    xpNeeded = Math.floor(xpNeeded * XP_MULTIPLIER)
  }
  return total + xpNeeded // include XP needed for last level bar fill
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
  if (level <= 5) return { title: 'Pencari Berkah', theme: 'from-emerald-600 to-emerald-900', color: 'text-emerald-400', icon: 'eco', emoji: '🌱' }
  if (level <= 10) return { title: 'Pejuang Ibadah', theme: 'from-teal-600 to-teal-900', color: 'text-teal-400', icon: 'shield', emoji: '⚔️' }
  if (level <= 15) return { title: 'Penjaga Sholat', theme: 'from-cyan-600 to-cyan-900', color: 'text-cyan-400', icon: 'mosque', emoji: '🕌' }
  if (level <= 20) return { title: 'Ahli Ibadah', theme: 'from-blue-600 to-blue-900', color: 'text-blue-400', icon: 'auto_awesome', emoji: '💎' }
  if (level <= 25) return { title: 'Cahaya Ramadhan', theme: 'from-violet-600 to-violet-900', color: 'text-violet-400', icon: 'flare', emoji: '✨' }
  return { title: 'Pemburu Surga', theme: 'from-sky-400 to-blue-600', color: 'text-sky-200', icon: 'cloud', emoji: '🏆' }
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

export default function RamadhanTracker() {
  const { setActiveTab } = useApp()
  const [trackerData, setTrackerData] = useState({})
  const [expandedId, setExpandedId] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dailyData, setDailyData] = useState({ prayerTimes: null, hijri: null })
  const [loading, setLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Gamification State
  const [userXP, setUserXP] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showStreakCelebration, setShowStreakCelebration] = useState(false)
  const [isRamadhan, setIsRamadhan] = useState(null) // null = loading, true = Ramadhan, false = ended
  const [hijriMonthNum, setHijriMonthNum] = useState(null) // track month number for pre/post detection
  const [hijriDay, setHijriDay] = useState(null) // track day for 2-week post-Ramadhan window
  const [showEidCelebration, setShowEidCelebration] = useState(false) // Eid celebration animation

  // Helper to format date for API: DD-MM-YYYY
  const formatDateForApi = (date) => {
    const d = new Date(date)
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}-${mm}-${yyyy}`
  }

  // Check if today is still Ramadhan — dedicated check on mount
  useEffect(() => {
    const checkRamadhan = async () => {
      try {
        const todayStr = formatDateForApi(new Date())
        const res = await fetch(`https://api.aladhan.com/v1/timings/${todayStr}?latitude=-6.2088&longitude=106.8456&method=20`)
        const json = await res.json()
        if (json.code === 200 && json.data) {
          const monthNum = json.data.date.hijri.month.number
          const monthEn = json.data.date.hijri.month.en
          const isRam = Number(monthNum) === 9
          console.log('[SholatKu] Mount check — Hijri:', monthEn, '#' + monthNum, '→ isRamadhan:', isRam)
          setIsRamadhan(isRam)
          setHijriMonthNum(Number(monthNum))
          setHijriDay(Number(json.data.date.hijri.day))
        }
      } catch (e) { console.error('Ramadhan check failed:', e) }
    }
    checkRamadhan()
  }, [])

  // Fetch Data (prayer times + hijri for selected date)
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
        try {
            const dateStr = formatDateForApi(selectedDate)
            const res = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=-6.2088&longitude=106.8456&method=20`)
            const json = await res.json()
            
            if (json.code === 200 && json.data) {
                const timings = json.data.timings
                const h = json.data.date.hijri
                const monthNumber = Number(h.month.number)
                setDailyData({
                    prayerTimes: [
                        { name: 'Subuh', time: timings.Fajr.replace(/\s*\(.*\)/, '') },
                        { name: 'Dzuhur', time: timings.Dhuhr.replace(/\s*\(.*\)/, '') },
                        { name: 'Ashar', time: timings.Asr.replace(/\s*\(.*\)/, '') },
                        { name: 'Maghrib', time: timings.Maghrib.replace(/\s*\(.*\)/, '') },
                        { name: 'Isya', time: timings.Isha.replace(/\s*\(.*\)/, '') },
                    ],
                    hijri: {
                        day: h.day,
                        month: h.month.en,
                        monthNumber: monthNumber,
                        year: h.year,
                        full: `${h.day} ${h.month.en} ${h.year} H`
                    }
                })
                // ALSO check Ramadhan status from main fetch (backup for mount check)
                const todayStr = formatDateForApi(new Date())
                if (dateStr === todayStr) {
                    const isRam = monthNumber === 9
                    console.log('[SholatKu] Fetch check — Hijri:', h.month.en, '#' + monthNumber, '→ isRamadhan:', isRam)
                    setIsRamadhan(isRam)
                    setHijriMonthNum(monthNumber)
                    setHijriDay(Number(h.day))
                }
            }
        } catch (e) { console.error(e) } finally { setLoading(false) }
    }
    fetchData()
  }, [selectedDate])

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Storage Key
  const getStorageKey = (date) => {
      const offset = date.getTimezoneOffset()
      const localDate = new Date(date.getTime() - (offset*60*1000))
      return localDate.toISOString().split('T')[0]
  }
  const dateKey = getStorageKey(selectedDate)

  // Calculate streak from stored data — count consecutive days with ALL missions completed
  const calculateStreak = (data) => {
    let count = 0
    const today = new Date()
    // Start from today, go backwards
    for (let i = 0; i < 60; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(today.getDate() - i)
      const key = getStorageKey(checkDate)
      const dayData = data[key]
      if (!dayData) {
        if (i === 0) continue // today might not have started yet
        break
      }
      // Check if ALL missions are completed for this day
      const allCompleted = INITIAL_MISSIONS.every(mission => {
        const val = dayData[mission.id]
        if (mission.id === 'puasa') {
          return val && typeof val === 'object' && val.status === true
        }
        return val === true
      })
      if (allCompleted) {
        count++
      } else {
        if (i === 0) continue // today is okay to be incomplete
        break
      }
    }
    return count
  }
  
  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem(TRACKER_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      setTrackerData(parsed)
      if (parsed._gamification) {
          setUserXP(parsed._gamification.xp || 0)
          // Load saved streak (will be overridden by calculateStreak if still Ramadhan)
          setStreak(parsed._gamification.streak || 0)
      }
    }
  }, [])

  // Recalculate streak when isRamadhan status is confirmed
  useEffect(() => {
    if (isRamadhan === true) {
      // Still Ramadhan — calculate live streak from data
      const saved = localStorage.getItem(TRACKER_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setStreak(calculateStreak(parsed))
      }
    }
    // When isRamadhan === false, keep the saved streak from localStorage (already loaded above)
  }, [isRamadhan])

  // Trigger Eid celebration when entering Syawal (first 14 days, once per year)
  useEffect(() => {
    if (isRamadhan === false && hijriMonthNum === 10 && hijriDay !== null && hijriDay <= 14) {
      const hijriYear = dailyData?.hijri?.year
      const eidKey = `sholatku-eid-shown-${hijriYear || 'unknown'}`
      if (!localStorage.getItem(eidKey)) {
        localStorage.setItem(eidKey, 'true')
        setShowEidCelebration(true)
        // Auto-dismiss after 8 seconds
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
    // Block updates if Ramadhan is over
    if (!isRamadhan) return
    
    // Build new mission data
    const newMissionData = {
      ...trackerData,
      [dateKey]: {
        ...trackerData[dateKey],
        [missionId]: value
      }
    }
    
    // XP Logic
    const prevValue = trackerData[dateKey]?.[missionId]
    const isCompleting = (value === true || (typeof value === 'object' && value?.status === true))
    const wasCompleted = (prevValue === true || (typeof prevValue === 'object' && prevValue?.status === true))

    let newXP = userXP
    
    if (isCompleting && !wasCompleted) {
        const xpAmount = MISSION_XP[missionId] || MISSION_XP.default
        newXP = Math.min(newXP + xpAmount, MAX_XP) // Cap XP at max level
        setUserXP(newXP)
    } else if (!isCompleting && wasCompleted) {
        const xpAmount = MISSION_XP[missionId] || MISSION_XP.default
        newXP = Math.max(0, newXP - xpAmount)
        setUserXP(newXP)
    }

    // ALWAYS save both mission data AND gamification together
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
    
    // Update streak and check for celebration
    const oldStreak = streak
    setStreak(newStreak)
    
    // Check if streak just increased — all missions completed!
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

  // Calculate Progress
  const currentData = trackerData[dateKey] || {}
  const totalMissions = INITIAL_MISSIONS.length
  const completedCount = INITIAL_MISSIONS.reduce((acc, mission) => {
    if (mission.id === 'puasa') {
      return acc + (currentData[mission.id]?.status ? 1 : 0)
    }
    return acc + (currentData[mission.id] ? 1 : 0)
  }, 0)
  const progress = Math.round((completedCount / totalMissions) * 100)

  // Gamification Data
  const { level, currentLevelXP, nextLevelXP } = getLevelFromXP(userXP)
  const rank = getRankData(level)
  const levelProgress = Math.min(100, Math.round((currentLevelXP / nextLevelXP) * 100))

  return (
    <div className="flex flex-col gap-4 md:gap-8 animate-fade-in pb-10">

      {/* STREAK FIRE CELEBRATION OVERLAY */}
      {showStreakCelebration && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{touchAction: 'none'}}
          onClick={() => setShowStreakCelebration(false)}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70"></div>
          
          {/* Fire particles - using transform only for mobile compat */}
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
          
          {/* Center message */}
          <div className="relative z-10 text-center px-6">
            <div className="text-6xl md:text-8xl mb-3" style={{animation: 'streakBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'}}>{'\ud83d\udd25'}</div>
            <h2 className="text-2xl md:text-5xl font-black text-white mb-2" style={{animation: 'streakBounce 0.6s 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275) both'}}>STREAK!</h2>
            <p className="text-base md:text-xl font-bold text-orange-400" style={{animation: 'streakBounce 0.6s 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both'}}>{streak} Hari Berturut-turut {'\ud83d\udd25'}</p>
            <p className="text-xs md:text-sm text-white/60 mt-2" style={{animation: 'streakBounce 0.6s 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) both'}}>Semua misi hari ini selesai!</p>
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
        @keyframes curtainPattern {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
      `}</style>

      {/* EID CELEBRATION OVERLAY */}
      {showEidCelebration && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{touchAction: 'none'}}
          onClick={() => setShowEidCelebration(false)}
        >
          {/* Dark bg behind curtains */}
          <div className="absolute inset-0 bg-black/80"></div>

          {/* Left Curtain */}
          <div 
            className="absolute top-0 left-0 w-1/2 h-full z-10"
            style={{
              background: 'linear-gradient(135deg, #064e3b 0%, #065f46 30%, #047857 60%, #059669 100%)',
              animation: 'curtainLeft 1.8s 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              boxShadow: '5px 0 30px rgba(0,0,0,0.5)',
            }}
          >
            {/* Curtain fold pattern */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 32px)',
            }}></div>
            {/* Curtain drape lines */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(ellipse at 100% 0%, rgba(255,255,255,0.3) 0%, transparent 60%)',
            }}></div>
            {/* Tassel */}
            <div className="absolute right-4 top-0 w-1 h-32 bg-yellow-500/60 rounded-b-full"></div>
            <div className="absolute right-2 top-32 w-5 h-5 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/30"></div>
          </div>

          {/* Right Curtain */}
          <div 
            className="absolute top-0 right-0 w-1/2 h-full z-10"
            style={{
              background: 'linear-gradient(225deg, #064e3b 0%, #065f46 30%, #047857 60%, #059669 100%)',
              animation: 'curtainRight 1.8s 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              boxShadow: '-5px 0 30px rgba(0,0,0,0.5)',
            }}
          >
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 32px)',
            }}></div>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 60%)',
            }}></div>
            <div className="absolute left-4 top-0 w-1 h-32 bg-yellow-500/60 rounded-b-full"></div>
            <div className="absolute left-2 top-32 w-5 h-5 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/30"></div>
          </div>

          {/* Curtain rod */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-yellow-600 to-yellow-800 z-20 shadow-lg"></div>

          {/* Ketupat + star particles */}
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
          
          {/* Center message */}
          <div 
            className="relative z-30 text-center px-6 max-w-md mx-auto"
            style={{animation: 'eidFadeIn 0.8s 2.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) both'}}
          >
            {/* Crescent + Star */}
            <div className="text-6xl md:text-8xl mb-2">{"\ud83c\udf19"}</div>
            
            {/* Main greeting */}
            <h2 
              className="text-2xl md:text-4xl font-black text-transparent bg-clip-text mb-1"
              style={{
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #fde68a, #fbbf24, #fde68a, #fbbf24)',
                backgroundSize: '200% auto',
                animation: 'shimmer 3s linear infinite',
              }}
            >
              Selamat Hari Raya
            </h2>
            <h2 
              className="text-3xl md:text-5xl font-black text-transparent bg-clip-text mb-4"
              style={{
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #fde68a, #fbbf24, #fde68a, #fbbf24)',
                backgroundSize: '200% auto',
                animation: 'shimmer 3s 0.5s linear infinite',
              }}
            >
              Idul Fitri
            </h2>
            
            <p className="text-sm md:text-base text-emerald-300 mb-1">1 Syawal 1447 H</p>
            <p className="text-xs md:text-sm text-white/60 mb-6">Mohon Maaf Lahir dan Batin</p>
            
            {/* Achievement recap */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <p className="text-[10px] md:text-xs text-emerald-400 font-bold uppercase tracking-widest mb-3">Pencapaian Ramadhan</p>
              <div className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center gap-1 bg-white/10 px-3 py-2 rounded-xl">
                  <span className="material-icons text-yellow-400 text-lg">emoji_events</span>
                  <span className="text-xs font-bold text-white">Lv.{level}</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white/10 px-3 py-2 rounded-xl">
                  <span className="material-icons text-cyan-400 text-lg">bolt</span>
                  <span className="text-xs font-bold text-white">{userXP} XP</span>
                </div>
                {streak > 0 && (
                  <div className="flex flex-col items-center gap-1 bg-white/10 px-3 py-2 rounded-xl">
                    <span className="material-icons text-orange-400 text-lg">local_fire_department</span>
                    <span className="text-xs font-bold text-white">{streak}d</span>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-[10px] text-white/40 mt-4">Ketuk untuk menutup</p>
          </div>
        </div>
      )}
      
      {/* GAMIFICATION HEADER */}
      <div className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br ${rank.theme} p-4 md:p-8 shadow-xl shadow-black/20 text-white`}>
           {/* Background decorative icon */}
           <div className="absolute -right-4 -top-4 md:-right-6 md:-top-6 opacity-[0.07] pointer-events-none">
               <span className="material-icons" style={{fontSize: '120px'}}>{rank.icon}</span>
           </div>
           {/* Pattern overlay */}
           <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
           
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
                <div className="text-center md:text-left w-full md:w-auto">
                    {/* Streak Badge - always visible */}
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2 md:mb-3">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-black/20 px-2 py-0.5 md:py-1 rounded-lg">Level {level}</span>
                        <span className={`flex items-center gap-1 text-[10px] md:text-xs font-bold px-2 py-0.5 md:py-1 rounded-lg ${streak > 0 ? 'bg-orange-500/90 text-white' : 'bg-white/10 text-white/60'}`}>
                            <span className="material-icons text-[12px] md:text-[14px]">local_fire_department</span>
                            {streak > 0 ? `${streak} Streak 🔥` : '0 Streak'}
                        </span>
                    </div>
                    <h2 className="text-xl md:text-3xl font-black tracking-tight mb-0.5 text-white drop-shadow-sm">{rank.emoji} {rank.title}</h2>
                    <p className="text-xs md:text-sm opacity-80 font-medium">Terus tingkatkan ibadahmu!</p>
                </div>

                <div className="w-full md:w-1/2 max-w-sm bg-black/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/10">
                    <div className="flex justify-between text-[10px] md:text-xs font-bold mb-1.5 md:mb-2 opacity-90">
                        <span>XP SAYA</span>
                        <span>{userXP} XP Total</span>
                    </div>
                    <div className="relative h-2 md:h-3 w-full bg-black/30 rounded-full overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 h-full bg-white transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            style={{width: `${levelProgress}%`}}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-1 md:mt-2">
                        <p className="text-[9px] md:text-[10px] opacity-60">Level {level}</p>
                        <p className="text-[9px] md:text-[10px] opacity-70">{nextLevelXP - currentLevelXP} XP → Lv.{Math.min(level + 1, 30)}</p>
                    </div>
                </div>
           </div>
      </div>

      {/* Stats & Nav */}
      <div className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-surface-dark lg:col-span-2 shadow-lg shadow-black/20 border border-white/5 flex flex-col justify-center p-4 md:p-8">
           <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_GSIoGffAJfdgg8MsQGYRPU7IT-tJBfRwxvYy-PkgVwhEaGcR5u_sERl2ByfxX3UNo6miJ0Y-mjOPEzMrTiMeoXHYOvs9MJ5Wq4uPcfMjGVXLH_kKfKKda4rstBiDscYv2M96eGHQBiQBpNWuFKcunRC_2twJE35gSqkMTm4s-9Irexy12xGS6osnKh2a42JD6IPbfn3nXOVtraNuOCaPeQA2Kz3Ydr_r9GNVo3KK7poWAoXk-Lnrw-o7m1ZxwxQ2iT5xM51xqD8')"}}></div>
           <div className="relative z-10 flex flex-col h-full justify-center">
                <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4 mb-3 md:mb-6">
                    <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-primary/20 bg-primary/10 px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium text-primary backdrop-blur-md">
                        <span className="material-icons text-xs md:text-sm">calendar_today</span>
                        <span>{dailyData.hijri ? dailyData.hijri.full : 'Ramadhan 1445 H'}</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 bg-black/20 backdrop-blur-sm rounded-full p-1 border border-white/10">
                        <button onClick={() => changeDate(-1)} className="p-1 md:p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all"><span className="material-icons text-base md:text-lg">chevron_left</span></button>
                        <span className="text-white text-xs md:text-sm font-bold min-w-[80px] md:min-w-[100px] text-center">{dailyData.hijri ? `${dailyData.hijri.day} ${dailyData.hijri.month}` : '...'}</span>
                        <button onClick={() => changeDate(1)} className="p-1 md:p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all"><span className="material-icons text-base md:text-lg">chevron_right</span></button>
                    </div>
                </div>
                <p className="mb-3 md:mb-6 max-w-md text-slate-300 text-xs md:text-base leading-relaxed hidden md:block">
                    "Semoga bulan suci ini membawa kedamaian, kebahagiaan, dan pertumbuhan spiritual dalam hidupmu."
                </p>
                <div className="flex flex-wrap gap-2 md:gap-4">
                     <button onClick={() => setActiveTab('schedule')} className="flex items-center gap-1.5 md:gap-2 rounded-lg bg-primary px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                        <span className="material-icons text-base md:text-lg">schedule</span> Jadwal Sholat
                    </button>
                    <button onClick={() => setActiveTab('doa')} className="flex items-center gap-1.5 md:gap-2 rounded-lg bg-white/10 px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-bold text-white border border-white/10">
                        <span className="material-icons text-base md:text-lg">menu_book</span> Baca Al-Quran
                    </button>
                </div>
           </div>
        </div>

        <div className="flex flex-row md:flex-col items-center md:items-stretch gap-4 md:gap-0 rounded-xl md:rounded-2xl border border-white/5 bg-surface-dark p-4 md:p-6 shadow-lg shadow-black/20">
          <div className="flex flex-col items-center justify-center flex-1 md:flex-none">
            <h3 className="mb-2 md:mb-4 text-sm md:text-lg font-bold text-white">Progress</h3>
            <div className="relative h-20 w-20 md:h-40 md:w-40 mb-2 md:mb-6">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle className="stroke-slate-700" cx="50" cy="50" fill="none" r="40" strokeWidth="8"></circle>
                  <circle className="text-primary transition-all duration-1000 ease-out stroke-current" cx="50" cy="50" fill="none" r="40" strokeDasharray={2 * Math.PI * 40} strokeDashoffset={2 * Math.PI * 40 - (progress / 100) * 2 * Math.PI * 40} strokeLinecap="round" strokeWidth="8"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg md:text-3xl font-black text-white">{progress}%</span>
                  <span className="text-[9px] md:text-xs text-slate-400">Selesai</span>
                </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0 rounded-lg md:rounded-xl bg-background-dark/50 p-3 md:p-4 border border-white/5 flex-1 md:flex-none">
            <div>
              <p className="text-[10px] md:text-xs text-slate-400">Selesai</p>
              <p className="text-base md:text-xl font-bold text-white">{completedCount}<span className="text-xs md:text-sm font-normal text-slate-500">/{totalMissions}</span></p>
            </div>
            <div className="md:text-right">
              <p className="text-[10px] md:text-xs text-slate-400">Belum</p>
              <p className="text-base md:text-xl font-bold text-white">{totalMissions - completedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="relative">
        {/* Ramadhan Ended / Loading Overlay */}
        {isRamadhan !== true && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/70 backdrop-blur-sm">
            {isRamadhan === null ? (
              <div className="text-center px-6 py-8">
                <span className="material-icons text-4xl text-white/50 animate-spin">refresh</span>
                <p className="text-sm text-slate-400 mt-2">Memeriksa status Ramadhan...</p>
              </div>
            ) : hijriMonthNum === 10 && hijriDay !== null && hijriDay <= 14 ? (
              <div className="text-center px-6 py-8">
                <span className="text-5xl md:text-6xl block mb-3">🌙</span>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">Ramadhan Telah Berakhir</h3>
                <p className="text-sm text-slate-300 max-w-xs mx-auto">Misi terkunci dan XP tidak bisa bertambah. Sampai jumpa di Ramadhan berikutnya!</p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                    <span className="material-icons text-yellow-400 text-sm">emoji_events</span>
                    <span className="text-sm font-bold text-white">Level {level} • {userXP} XP</span>
                  </div>
                  {streak > 0 && (
                    <div className="inline-flex items-center gap-1 bg-orange-500/20 px-3 py-2 rounded-full border border-orange-500/20">
                      <span className="material-icons text-orange-400 text-sm">local_fire_department</span>
                      <span className="text-sm font-bold text-orange-400">{streak} Streak</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center px-6 py-8">
                <span className="text-5xl md:text-6xl block mb-3">🕌</span>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">Ramadhan Belum Dimulai</h3>
                <p className="text-sm text-slate-300 max-w-xs mx-auto">Misi akan terbuka saat Ramadhan tiba. Bersiaplah!</p>
              </div>
            )}
          </div>
        )}
        <div className={`${isRamadhan !== true ? 'opacity-30 pointer-events-none' : ''}`}>
        <div className="flex items-center justify-between mb-3 md:mb-6">
          <h3 className="text-lg md:text-2xl font-bold tracking-tight text-white">Misi Harian</h3>
        </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {INITIAL_MISSIONS.map((mission) => {
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
                    <div key={mission.id} className="group flex flex-col gap-2 md:gap-3 rounded-lg md:rounded-xl border border-white/5 bg-surface-dark p-3 md:p-5 opacity-70 cursor-not-allowed">
                        <div className="flex items-start justify-between">
                            <div className="rounded-md md:rounded-lg bg-slate-700/50 p-1.5 md:p-2 text-slate-400"><span className="material-icons text-lg md:text-2xl">{mission.icon}</span></div>
                            <span className="material-icons text-slate-600 text-xs md:text-sm">lock</span>
                        </div>
                        <div><h4 className="text-xs md:text-base font-bold text-slate-400">{mission.label}</h4><p className="text-[9px] md:text-xs text-slate-500">Terkunci {unlockTime}</p></div>
                    </div>
                )
            }

            if (isExpanded) {
                return (
                    <div key={mission.id} className="group relative col-span-2 md:col-span-2 lg:col-span-2 flex flex-col justify-between overflow-hidden rounded-lg md:rounded-xl border border-primary/40 bg-surface-dark shadow-[0_0_15px_rgba(19,236,91,0.1)] transition-all">
                        <div className="absolute right-0 top-0 p-2 md:p-4 opacity-10 pointer-events-none"><span className="material-icons text-[80px] md:text-[120px] text-primary">{mission.icon}</span></div>
                        <div className="relative z-10 flex items-start justify-between p-3 md:p-6 pb-1 md:pb-2">
                            <div className="flex items-center gap-2 md:gap-4">
                                <div className="flex h-9 w-9 md:h-12 md:w-12 items-center justify-center rounded-full bg-primary text-background-dark shadow-lg shadow-primary/20"><span className="material-icons text-lg md:text-2xl">{mission.icon}</span></div>
                                <div><h4 className="text-sm md:text-lg font-bold text-white">{mission.label}</h4><p className="text-[10px] md:text-xs text-primary">{mission.sub}</p></div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); toggleExpand(mission.id, false); }} className="rounded-full bg-primary/20 p-1 text-primary hover:bg-primary/30"><span className="material-icons text-lg md:text-2xl">expand_less</span></button>
                        </div>
                        <div className="relative z-10 flex-1 px-3 md:px-6 py-2 md:py-4">
                            <div className="inline-block mb-2 md:mb-3 bg-white/10 rounded px-1.5 md:px-2 py-0.5 text-[9px] md:text-[10px] font-bold text-yellow-400 border border-white/10">+{xpVal} XP</div>
                            <p className="text-sm md:text-lg font-medium leading-relaxed text-slate-200">{mission.question}</p>
                             {isPuasa && isFailed && (
                                <div className="mt-3 md:mt-4">
                                    <label className="block text-[10px] md:text-xs font-bold text-soft-red mb-1 uppercase tracking-wider">Alasan Batal</label>
                                    <select value={puasaData.reason || ''} onChange={(e) => setPuasaStatus(false, e.target.value)} className="w-full bg-black/30 border border-soft-red/40 text-white text-xs md:text-sm rounded-lg p-2 md:p-2.5 outline-none">
                                        <option value="" disabled>Pilih Alasan</option><option value="Sakit">Sakit</option><option value="Musafir">Musafir</option><option value="Haid">Haid</option><option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className="relative z-10 flex gap-2 md:gap-3 bg-surface-hover/50 p-3 md:p-6 backdrop-blur-sm">
                             <button onClick={(e) => { e.stopPropagation(); if(isPuasa) { if(puasaData.status === true && current) updateData('puasa', null); else setPuasaStatus(true); } else { if(current === true) updateData(mission.id, null); else updateData(mission.id, true); } }} className={`flex flex-1 items-center justify-center gap-1.5 md:gap-2 rounded-lg py-2 md:py-3 text-xs md:text-sm font-bold shadow-lg transition-all ${isDone ? 'bg-primary text-background-dark hover:bg-green-400' : 'bg-surface-hover hover:bg-slate-700 text-white border border-slate-600'}`}><span className="material-icons text-lg md:text-2xl">check_circle</span>{isPuasa ? 'Ya, Puasa' : 'Ya, Sudah'}</button>
                            <button onClick={(e) => { e.stopPropagation(); if(isPuasa) { if(puasaData.status === false && current) updateData('puasa', null); else setPuasaStatus(false); } else { if(mission.actionLink) { setActiveTab(mission.actionLink); return; } if(current === false) updateData(mission.id, null); else updateData(mission.id, false); } }} className={`flex flex-1 items-center justify-center gap-1.5 md:gap-2 rounded-lg border bg-transparent py-2 md:py-3 text-xs md:text-sm font-bold transition-colors ${isFailed ? 'border-soft-red text-soft-red bg-soft-red/10' : 'border-slate-600 text-slate-300 hover:bg-slate-800'}`}><span className="material-icons text-lg md:text-2xl">cancel</span>{isPuasa ? 'Batal / Tidak' : 'Belum'}</button>
                        </div>
                    </div>
                )
            }

            return (
                <div key={mission.id} onClick={() => toggleExpand(mission.id, locked)} className={`group flex cursor-pointer flex-col gap-2 md:gap-3 rounded-lg md:rounded-xl border p-3 md:p-5 transition-all ${isDone ? 'border-primary/50 bg-primary/5 hover:bg-primary/10' : isFailed ? 'border-soft-red/30 bg-soft-red/5' : 'border-white/5 bg-surface-dark hover:border-white/10 hover:bg-surface-hover'}`}>
                    <div className="flex items-start justify-between">
                         <div className={`rounded-md md:rounded-lg p-1.5 md:p-2 transition-colors ${isDone ? 'bg-primary/20 text-primary' : (isFailed ? 'bg-soft-red/10 text-soft-red' : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-200')}`}><span className="material-icons text-lg md:text-2xl">{mission.icon}</span></div>
                         <div className="flex items-center gap-1 md:gap-2">
                             {!isDone && !isFailed && <span className="text-[8px] md:text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-1 md:px-1.5 py-0.5 rounded border border-yellow-500/20">+{xpVal}</span>}
                             <span className={`material-icons text-lg md:text-2xl transition-transform group-hover:rotate-90 ${isDone ? 'text-primary' : (isFailed ? 'text-soft-red' : 'text-slate-600 group-hover:text-slate-400')}`}>{isDone ? 'check_circle' : (isFailed ? 'cancel' : 'chevron_right')}</span>
                         </div>
                    </div>
                    <div><h4 className={`text-xs md:text-base font-bold transition-colors ${isDone ? 'text-primary' : (isFailed ? 'text-soft-red' : 'text-slate-200 group-hover:text-white')}`}>{mission.label}</h4><p className={`text-[9px] md:text-xs ${isFailed ? 'text-soft-red/70' : 'text-slate-500'}`}>{isFailed ? (isPuasa ? 'Batal' : 'Belum') : (isDone ? 'Selesai' : mission.sub)}</p></div>
                </div>
            )
          })}
      </div>
      </div>
      </div>
    </div>
  )
}
