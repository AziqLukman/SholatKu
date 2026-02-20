import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

const TRACKER_KEY = 'sholatku-ramadhan-tracker-v1'

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
  
  // Date State
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dailyData, setDailyData] = useState({ prayerTimes: null, hijri: null })
  const [loading, setLoading] = useState(false)
  
  // Helper to format date for API: DD-MM-YYYY
  const formatDateForApi = (date) => {
    const d = new Date(date)
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}-${mm}-${yyyy}`
  }

  // Fetch Data when selectedDate changes
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
        try {
            const dateStr = formatDateForApi(selectedDate)
            const lat = -6.2088 // Default/Fallback (Jakarta)
            const lng = 106.8456
            // ideally get lat/lng from context if available, but for tracker nav default is okay or use context location
            
            const res = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=20`)
            const json = await res.json()
            
            if (json.code === 200 && json.data) {
                const timings = json.data.timings
                const h = json.data.date.hijri
                
                // Process timings
                const prayerList = [
                    { name: 'Subuh', time: timings.Fajr.replace(/\s*\(.*\)/, '') },
                    { name: 'Dzuhur', time: timings.Dhuhr.replace(/\s*\(.*\)/, '') },
                    { name: 'Ashar', time: timings.Asr.replace(/\s*\(.*\)/, '') },
                    { name: 'Maghrib', time: timings.Maghrib.replace(/\s*\(.*\)/, '') },
                    { name: 'Isya', time: timings.Isha.replace(/\s*\(.*\)/, '') },
                ]

                setDailyData({
                    prayerTimes: prayerList,
                    hijri: {
                        day: h.day,
                        month: h.month.en,
                        year: h.year,
                        full: `${h.day} ${h.month.en} ${h.year} H`
                    }
                })
            }
        } catch (e) {
            console.error("Failed to fetch daily data", e)
        } finally {
            setLoading(false)
        }
    }
    fetchData()
  }, [selectedDate])

  // Current Time for Locking (Real-time)
  const [currentTime, setCurrentTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Storage Key based on SELECTED DATE
  // Note: Using local date string part to avoid timezone issues when constructing keys
  const getStorageKey = (date) => {
      const offset = date.getTimezoneOffset()
      const localDate = new Date(date.getTime() - (offset*60*1000))
      return localDate.toISOString().split('T')[0]
  }
  const dateKey = getStorageKey(selectedDate)
  
  useEffect(() => {
    const saved = localStorage.getItem(TRACKER_KEY)
    if (saved) {
      setTrackerData(JSON.parse(saved))
    }
  }, [])

  const changeDate = (days) => {
      const newDate = new Date(selectedDate)
      newDate.setDate(selectedDate.getDate() + days)
      setSelectedDate(newDate)
  }

  const updateData = (missionId, value) => {
    const newData = {
      ...trackerData,
      [dateKey]: {
        ...trackerData[dateKey],
        [missionId]: value
      }
    }
    setTrackerData(newData)
    localStorage.setItem(TRACKER_KEY, JSON.stringify(newData))
  }

  const toggleMission = (id) => {
    const current = trackerData[dateKey]?.[id]
    if (typeof current === 'object' && current !== null) return
    updateData(id, !current)
  }

  const setPuasaStatus = (status, reason = null) => {
    updateData('puasa', { status, reason })
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
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (progress / 100) * circumference

  const toggleExpand = (id, isLocked) => {
    if (isLocked) return
    if (expandedId === id) setExpandedId(null)
    else setExpandedId(id)
  }

  const getMissionLockStatus = (missionId) => {
    // Locking only applies to TODAY or FUTURE
    // If selectedDate is in the past (< today start), everything should be UNLOCKED (allow filling past data)
    // If selectedDate is Future (> today), everything LOCKED? Or follows time? Assume locked.
    
    // Simple date comparison
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const selStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    
    if (selStart < todayStart) return { locked: false, time: null } // Past: Always unlocked
    if (selStart > todayStart) return { locked: true, time: 'Future' } // Future: Always locked? Or unlock at Fajr? 
    // For simplicity, let's keep FUTURE locked until that day comes.

    // If TODAY, use checking logic
    if (!dailyData.prayerTimes) return { locked: false, time: null }

    const getTime = (name) => {
        const p = dailyData.prayerTimes.find(t => t.name === name)
        return p ? p.time : null
    }

    const getPrayerDate = (timeStr) => {
        if (!timeStr) return null
        const [hours, minutes] = timeStr.split(':').map(Number)
        const date = new Date()
        date.setHours(hours, minutes, 0, 0)
        return date
    }

    let unlockTimeStr = null
    let unlockDate = null

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
        unlockDate = getPrayerDate(unlockTimeStr)
        if (currentTime < unlockDate) {
            return { locked: true, time: unlockTimeStr }
        }
    }
    return { locked: false, time: null }
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-10">
      
      {/* Hero & Stats Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Header/Hero Card */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-dark lg:col-span-2 shadow-lg shadow-black/20 border border-white/5 flex flex-col justify-center p-8">
           <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_GSIoGffAJfdgg8MsQGYRPU7IT-tJBfRwxvYy-PkgVwhEaGcR5u_sERl2ByfxX3UNo6miJ0Y-mjOPEzMrTiMeoXHYOvs9MJ5Wq4uPcfMjGVXLH_kKfKKda4rstBiDscYv2M96eGHQBiQBpNWuFKcunRC_2twJE35gSqkMTm4s-9Irexy12xGS6osnKh2a42JD6IPbfn3nXOVtraNuOCaPeQA2Kz3Ydr_r9GNVo3KK7poWAoXk-Lnrw-o7m1ZxwxQ2iT5xM51xqD8')"}}></div>
           <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent"></div>

           <div className="relative z-10 flex flex-col h-full justify-center">
                {/* Top Row: Date Badge & Navigation */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-md">
                        <span className="material-icons text-sm">calendar_today</span>
                        <span>{dailyData.hijri ? `${dailyData.hijri.day} ${dailyData.hijri.month} ${dailyData.hijri.year} H` : 'Ramadhan 1445 H'}</span>
                    </div>

                    <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-full p-1 border border-white/10">
                        <button onClick={() => changeDate(-1)} className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                            <span className="material-icons text-lg">chevron_left</span>
                        </button>
                        <span className="text-white text-sm font-bold min-w-[100px] text-center">
                            {loading ? '...' : (dailyData.hijri ? `${dailyData.hijri.day} ${dailyData.hijri.month}` : 'Loading')}
                        </span>
                        <button onClick={() => changeDate(1)} className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                            <span className="material-icons text-lg">chevron_right</span>
                        </button>
                    </div>
                </div>

                
                <p className="mb-6 max-w-md text-slate-300 text-sm md:text-base leading-relaxed">
                    “Semoga bulan suci ini membawa kedamaian, kebahagiaan, dan pertumbuhan spiritual dalam hidupmu. Terus jaga dan pantau ibadah harianmu.”
                </p>

                <div className="flex flex-wrap gap-4">
                     <button onClick={() => setActiveTab('schedule')} className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                        <span className="material-icons text-lg">schedule</span>
                        Jadwal Sholat
                    </button>
                    <button onClick={() => setActiveTab('doa')} className="flex items-center gap-2 rounded-lg bg-white/5 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10 border border-white/10">
                        <span className="material-icons text-lg">menu_book</span>
                        Baca Al-Quran
                    </button>
                </div>
           </div>
        </div>

        {/* Progress Card */}
        <div className="flex flex-col rounded-2xl border border-white/5 bg-surface-dark p-6 shadow-lg shadow-black/20">
          <h3 className="mb-4 text-lg font-bold text-white">Progress Harian</h3>
          
          <div className="relative mb-6 flex flex-1 items-center justify-center">
             <div className="relative h-40 w-40">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle className="stroke-slate-700" cx="50" cy="50" fill="none" r="40" strokeWidth="8"></circle>
                  <circle 
                    className="text-primary transition-all duration-1000 ease-out stroke-current" 
                    cx="50" cy="50" 
                    fill="none" 
                    r="40" 
                    strokeDasharray={2 * Math.PI * 40} 
                    strokeDashoffset={2 * Math.PI * 40 - (progress / 100) * 2 * Math.PI * 40} 
                    strokeLinecap="round" 
                    strokeWidth="8"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-white">{progress}%</span>
                  <span className="text-xs text-slate-400">Selesai</span>
                </div>
             </div>
          </div>

          <div className="flex justify-between rounded-xl bg-background-dark/50 p-4 border border-white/5">
            <div>
              <p className="text-xs text-slate-400">Selesai</p>
              <p className="text-xl font-bold text-white">{completedCount}<span className="text-sm font-normal text-slate-500">/{totalMissions}</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Belum</p>
              <p className="text-xl font-bold text-white">{totalMissions - completedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Missions Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold tracking-tight text-white">Misi Harian</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {INITIAL_MISSIONS.map((mission) => {
            const isPuasa = mission.id === 'puasa'
            const isDone = isPuasa
                ? currentData[mission.id]?.status 
                : !!currentData[mission.id]
            
            const puasaData = currentData['puasa'] || { status: true, reason: null }
            const isExpanded = expandedId === mission.id
            const { locked, time: unlockTime } = getMissionLockStatus(mission.id)
            
            const isFailed = !locked && (isPuasa 
                ? (!puasaData.status && currentData['puasa'])
                : (currentData[mission.id] === false))
            
            // Render specific card for LOCKED item
            if (locked) {
                return (
                    <div key={mission.id} className="group flex flex-col gap-3 rounded-xl border border-white/5 bg-surface-dark p-5 transition-all opacity-70 cursor-not-allowed">
                        <div className="flex items-start justify-between">
                            <div className="rounded-lg bg-slate-700/50 p-2 text-slate-400">
                                <span className="material-icons">{mission.icon}</span>
                            </div>
                            <span className="material-icons text-slate-600 text-sm">lock</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-400">{mission.label}</h4>
                            <p className="text-xs text-slate-500">Terkunci sampai {unlockTime}</p>
                        </div>
                    </div>
                )
            }

            // Render EXPANDED Active Card (Takes up more space if desired, but keeping simple for grid)
            // Ideally, the user's example showed "Sahur" taking 2 col spans when active.
            // Let's implement that: if isExpanded, use col-span-2 (on md+).
            
            if (isExpanded) {
                return (
                    <div key={mission.id} className="group relative col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-between overflow-hidden rounded-xl border border-primary/40 bg-surface-dark shadow-[0_0_15px_rgba(19,236,91,0.1)] transition-all">
                        <div className="absolute right-0 top-0 p-4 opacity-10 pointer-events-none">
                            <span className="material-icons text-[120px] text-primary">{mission.icon}</span>
                        </div>
                        
                        <div className="relative z-10 flex items-start justify-between p-6 pb-2">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-background-dark shadow-lg shadow-primary/20">
                                    <span className="material-icons">{mission.icon}</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">{mission.label}</h4>
                                    <p className="text-xs text-primary">{mission.sub}</p>
                                </div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); toggleExpand(mission.id, false); }} className="rounded-full bg-primary/20 p-1 text-primary hover:bg-primary/30">
                                <span className="material-icons">expand_less</span>
                            </button>
                        </div>

                        <div className="relative z-10 flex-1 px-6 py-4">
                            <p className="text-lg font-medium leading-relaxed text-slate-200">
                                {mission.question}
                            </p>
                             {/* Special Puasa Reason Input */}
                             {isPuasa && isFailed && (
                                <div className="mt-4 animate-slide-up">
                                    <label className="block text-xs font-bold text-soft-red mb-1 uppercase tracking-wider">Alasan Batal</label>
                                    <select 
                                        value={puasaData.reason || ''}
                                        onChange={(e) => setPuasaStatus(false, e.target.value)}
                                        className="w-full bg-black/30 border border-soft-red/40 text-white text-sm rounded-lg focus:ring-soft-red focus:border-soft-red p-2.5 outline-none"
                                    >
                                        <option value="" disabled>Pilih Alasan</option>
                                        <option value="Sakit">Sakit (Sick)</option>
                                        <option value="Musafir">Musafir (Travel)</option>
                                        <option value="Haid">Haid / Nifas (Menstruation)</option>
                                        <option value="Lainnya">Lainnya (Other)</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="relative z-10 flex gap-3 bg-surface-hover/50 p-6 backdrop-blur-sm">
                             <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    if (isPuasa) {
                                        if (puasaData.status === true && currentData['puasa']) updateData('puasa', null);
                                        else setPuasaStatus(true);
                                    } else {
                                        if (currentData[mission.id] === true) updateData(mission.id, null);
                                        else updateData(mission.id, true);
                                    }
                                }}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold shadow-lg transition-all
                                    ${isDone ? 'bg-primary text-background-dark shadow-primary/20 hover:bg-green-400' : 'bg-surface-hover hover:bg-slate-700 text-white border border-slate-600'}
                                `}
                            >
                                <span className="material-icons">check_circle</span>
                                {isPuasa ? 'Ya, Puasa' : 'Ya, Sudah'}
                            </button>
                            <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    if (isPuasa) {
                                        if (puasaData.status === false && currentData['puasa']) updateData('puasa', null);
                                        else setPuasaStatus(false);
                                    } else {
                                        // [NEW] If Action Link exists (e.g. Dzikir -> Tasbih), redirect instead of failing
                                        if (mission.actionLink) {
                                            setActiveTab(mission.actionLink)
                                            return
                                        }

                                        if (currentData[mission.id] === false) updateData(mission.id, null);
                                        else updateData(mission.id, false);
                                    }
                                }}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border bg-transparent py-3 text-sm font-bold transition-colors
                                     ${isFailed 
                                        ? 'border-soft-red text-soft-red bg-soft-red/10 hover:bg-soft-red/20' 
                                        : 'border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                                     }
                                `}
                            >
                                <span className="material-icons">cancel</span>
                                {isPuasa ? 'Batal / Tidak' : 'Belum'}
                            </button>
                        </div>
                    </div>
                )
            }

            // Standard Card (Not expanded, Not locked)
            return (
                <div 
                    key={mission.id} 
                    onClick={() => toggleExpand(mission.id, locked)}
                    className={`group flex cursor-pointer flex-col gap-3 rounded-xl border p-5 transition-all 
                        ${isDone 
                            ? 'border-primary/50 bg-primary/5 hover:bg-primary/10' 
                            : isFailed 
                                ? 'border-soft-red/30 bg-soft-red/5' 
                                : 'border-white/5 bg-surface-dark hover:border-white/10 hover:bg-surface-hover'
                        }
                    `}
                >
                    <div className="flex items-start justify-between">
                         <div className={`rounded-lg p-2 transition-colors
                            ${isDone ? 'bg-primary/20 text-primary' : (isFailed ? 'bg-soft-red/10 text-soft-red' : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-200')}
                         `}>
                            <span className="material-icons">{mission.icon}</span>
                         </div>
                         <span className={`material-icons transition-transform group-hover:rotate-90 
                            ${isDone ? 'text-primary' : (isFailed ? 'text-soft-red' : 'text-slate-600 group-hover:text-slate-400')}
                         `}>
                            {isDone ? 'check_circle' : (isFailed ? 'cancel' : 'chevron_right')}
                         </span>
                    </div>
                    <div>
                        <h4 className={`font-bold transition-colors ${isDone ? 'text-primary' : (isFailed ? 'text-soft-red' : 'text-slate-200 group-hover:text-white')}`}>
                            {mission.label}
                        </h4>
                        <p className={`text-xs ${isFailed ? 'text-soft-red/70' : 'text-slate-500'}`}>
                            {isFailed ? (isPuasa ? 'Status: Batal' : 'Status: Belum') : (isDone ? 'Selesai' : mission.sub)}
                        </p>
                    </div>
                </div>
            )

          })}
        </div>
      </div>
    </div>
  )
}
