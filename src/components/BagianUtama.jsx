import React, { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import { useCountdown } from '../hooks/useCountdown'
import { resolveIndonesiaLocation } from '../data/indonesiaLocations'

const POPULAR_CITIES = [
  { city: 'Jakarta', lat: -6.2088, lng: 106.8456, provinsi: 'DKI Jakarta', kabkota: 'Kota Jakarta' },
  { city: 'Bandung', lat: -6.9175, lng: 107.6191, provinsi: 'Jawa Barat', kabkota: 'Kota Bandung' },
  { city: 'Surabaya', lat: -7.2575, lng: 112.7521, provinsi: 'Jawa Timur', kabkota: 'Kota Surabaya' },
  { city: 'Yogyakarta', lat: -7.7956, lng: 110.3695, provinsi: 'D.I. Yogyakarta', kabkota: 'Kota Yogyakarta' },
  { city: 'Medan', lat: 3.5952, lng: 98.6722, provinsi: 'Sumatera Utara', kabkota: 'Kota Medan' },
  { city: 'Makassar', lat: -5.1477, lng: 119.4327, provinsi: 'Sulawesi Selatan', kabkota: 'Kota Makassar' },
  { city: 'Semarang', lat: -6.9667, lng: 110.4167, provinsi: 'Jawa Tengah', kabkota: 'Kota Semarang' },
  { city: 'Palembang', lat: -2.9909, lng: 104.7566, provinsi: 'Sumatera Selatan', kabkota: 'Kota Palembang' },
  { city: 'Denpasar', lat: -8.6705, lng: 115.2126, provinsi: 'Bali', kabkota: 'Kota Denpasar' },
  { city: 'Malang', lat: -7.9839, lng: 112.6214, provinsi: 'Jawa Timur', kabkota: 'Kota Malang' },
  { city: 'Bekasi', lat: -6.2383, lng: 106.9756, provinsi: 'Jawa Barat', kabkota: 'Kota Bekasi' },
  { city: 'Tangerang', lat: -6.1783, lng: 106.6319, provinsi: 'Banten', kabkota: 'Kota Tangerang' },
  { city: 'Bogor', lat: -6.5971, lng: 106.7986, provinsi: 'Jawa Barat', kabkota: 'Kota Bogor' },
  { city: 'Batam', lat: 1.1301, lng: 104.0520, provinsi: 'Kepulauan Riau', kabkota: 'Kota Batam' },
]

export default function BagianUtama() {
  const { 
    prayerTimes, hijriDate, location, setLocation, 
    darkMode, setActiveTab, 
    notificationsEnabled, setNotificationsEnabled,
    setAiOpen 
  } = useApp()

  // Hitung target offset zona waktu secara cerdas & global (WIB=7, WITA=8, WIT=9, Malaysia/Singapura=8, dll)
  const targetOffset = useMemo(() => {
    if (!location || typeof location.lng === 'undefined') return 7
    const lng = parseFloat(location.lng)
    const name = (location.city || location.provinsi || '').toLowerCase()

    // Koreksi politis khusus negara tetangga Asia Tenggara (Malaysia/Singapura memakai UTC+8 meskipun secara bujur geografis di zona UTC+7)
    if (name.includes('malaysia') || name.includes('singapore') || name.includes('selangor') || name.includes('kuala lumpur')) {
      return 8
    }

    // Koreksi administratif khusus wilayah Indonesia
    if (name.includes('papua') || name.includes('maluku')) return 9
    if (name.includes('sulawesi') || name.includes('bali') || name.includes('tenggara') || name.includes('nusa') || name.includes('gorontalo') || name.includes('makassar') || name.includes('denpasar')) return 8
    
    // Fallback berdasarkan batas bujur geografis administratif Indonesia
    if (lng >= 124.5 && lng <= 142.5) return 9
    if (lng >= 114.0 && lng < 124.5) return 8
    if (lng >= 95.0 && lng < 114.0) return 7

    // Untuk lokasi global di seluruh belahan bumi lainnya, gunakan kalkulasi geografis universal yang sangat akurat
    return Math.round(lng / 15)
  }, [location])

  // Panggil useCountdown dengan menyertakan targetOffset agar countdown & sholat aktif bersinkronisasi secara dinamis
  const { currentPrayer, nextPrayer, countdown, currentTime, formattedTime } = useCountdown(prayerTimes, targetOffset)

  // Hitung label zona waktu dinamis secara cerdas
  const tzLabel = useMemo(() => {
    if (!location) return 'WIB'
    const name = (location.city || location.provinsi || '').toLowerCase()
    const lng = parseFloat(location.lng)
    const isId = name.includes('indonesia') || (!name.includes('malaysia') && !name.includes('singapor') && !name.includes('australi') && lng >= 95 && lng <= 142)
    if (isId) {
      if (targetOffset === 7) return 'WIB'
      if (targetOffset === 8) return 'WITA'
      if (targetOffset === 9) return 'WIT'
    }
    return `GMT${targetOffset >= 0 ? '+' + targetOffset : targetOffset}`
  }, [location, targetOffset])

  // Calculate hands rotation degrees using timezone-adjusted currentTime from hook
  const hourDeg = currentTime ? ((currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5) : 0
  const minDeg = currentTime ? (currentTime.getMinutes() * 6) : 0
  const secDeg = currentTime ? (currentTime.getSeconds() * 6) : 0

  const [showLocModal, setShowLocModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setSearching(true)
    
    // Local fallback database filter
    const localMatches = POPULAR_CITIES.filter(c => 
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.provinsi.toLowerCase().includes(searchQuery.toLowerCase())
    )

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=5&accept-language=id&addressdetails=1`
      )
      const data = await res.json()
      
      if (!Array.isArray(data) || data.length === 0) {
        setSearchResults(localMatches)
        setSearching(false)
        return
      }

      const results = []
      for (const r of data) {
        const loc = {
          lat: parseFloat(r.lat),
          lng: parseFloat(r.lon),
          city: r.display_name.split(',').slice(0, 3).join(',').trim(),
          provinsi: null,
          kabkota: null,
        }
        if (r.address) {
          const idLoc = await resolveIndonesiaLocation(r.address)
          if (idLoc) {
            loc.provinsi = idLoc.provinsi
            loc.kabkota = idLoc.kabkota
          } else {
            // Jika di luar wilayah Indonesia, gunakan negara atau negara bagian dari address Nominatim
            loc.provinsi = r.address.country || r.address.state || 'Luar Negeri'
            loc.kabkota = r.address.state || r.address.city || null
          }
        }
        results.push(loc)
      }
      setSearchResults(results.length > 0 ? results : localMatches)
    } catch {
      setSearchResults(localMatches)
    }
    setSearching(false)
  }

  const selectLocation = (loc) => {
    setLocation(loc)
    setShowLocModal(false)
    setSearchQuery('')
    setSearchResults([])
  }

  // Calculate countdown percentage for circular gauge
  const countdownPercent = useMemo(() => {
    if (!nextPrayer || !currentPrayer || !prayerTimes) return 1

    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    const [ch, cm] = (currentPrayer.time || '00:00').split(':').map(Number)
    const currentPrayerMin = ch * 60 + cm

    const [nh, nm] = (nextPrayer.time || '00:00').split(':').map(Number)
    let nextPrayerMin = nh * 60 + nm

    if (nextPrayerMin <= currentPrayerMin) nextPrayerMin += 24 * 60

    const totalSpan = nextPrayerMin - currentPrayerMin
    let elapsed = currentMinutes - currentPrayerMin
    if (elapsed < 0) elapsed += 24 * 60

    const remaining = totalSpan > 0 ? Math.max(0, Math.min(1, (totalSpan - elapsed) / totalSpan)) : 1
    return remaining
  }, [nextPrayer, currentPrayer, prayerTimes])

  const todayDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  // Horizontal Timeline logic
  const mainPrayerNames = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya']
  const timelinePrayers = prayerTimes?.filter(p => mainPrayerNames.includes(p.name)) || []

  function isTimePast(timeStr) {
    const now = new Date()
    const [h, m] = timeStr.split(':').map(Number)
    const prayerDate = new Date()
    prayerDate.setHours(h, m, 0, 0)
    return now > prayerDate
  }

  // Bento Grid features
  const features = [
    { id: 'ai', label: 'Tanya AI', icon: 'smart_toy', color: 'bg-purple-500/20 text-purple-600 dark:text-purple-300 border-purple-500/30', action: () => setAiOpen('full') },
    { id: 'tasbih', label: 'Tasbih', icon: 'ads_click', color: 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/30', action: () => setActiveTab('tasbih') },
    { id: 'doa', label: 'Doa', icon: 'volunteer_activism', color: 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/30', action: () => setActiveTab('doa') },
    { id: 'masjid', label: 'Masjid', icon: 'mosque', color: 'bg-sky-500/20 text-sky-600 dark:text-sky-300 border-sky-500/30', action: () => setActiveTab('mosque') },
    { id: 'kalender', label: 'Kalender', icon: 'calendar_month', color: 'bg-teal-500/20 text-teal-600 dark:text-teal-300 border-teal-500/30', action: () => setActiveTab('schedule') },
    { id: 'quran', label: 'Al-Qur\'an', icon: 'menu_book', color: 'bg-orange-500/20 text-orange-600 dark:text-orange-300 border-orange-500/30', action: () => setActiveTab('quran') },
    { id: 'misi', label: 'Misi', icon: 'checklist', color: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/30', action: () => setActiveTab('ramadhan') },
    { id: 'setelan', label: 'Setelan', icon: 'settings', color: 'bg-slate-500/20 text-slate-600 dark:text-slate-300 border-slate-500/30', action: () => setActiveTab('settings') },
  ]

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* 2. DUAL-CALENDAR TOP APP BAR */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className={`font-bold text-lg tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            {todayDate}
          </h2>
          <span className="text-[13px] font-medium text-[#0d968b] mt-0.5">
            {hijriDate || 'Memuat...'}
          </span>
        </div>

        <button 
          onClick={() => {
            setSearchQuery('')
            setSearchResults([])
            setShowLocModal(true)
          }}
          className={`h-8 px-3 flex items-center gap-1.5 rounded-full border border-opacity-30 transition-all duration-300 active:scale-95 text-[11px] font-semibold tracking-wide cursor-pointer ${
            darkMode 
              ? 'border-slate-500 text-slate-300 hover:bg-white/5' 
              : 'border-slate-300 text-slate-600 hover:bg-slate-100 shadow-sm'
          }`}
        >
          <span>📍 {location.city || 'Jakarta'}</span>
          <span className="material-icons text-[14px] ml-1 opacity-70">expand_more</span>
        </button>
      </header>

      {/* 3. HERO PANEL: ELEGANT ISLAMIC CARD */}
      <section className={`w-full p-6 relative overflow-hidden flex flex-col gap-6 islamic-watermark ${darkMode ? 'elegant-card-dark' : 'elegant-card-light'}`}>
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col items-start gap-2 flex-1">
            {/* Active Prayer Time */}
            <div className={`font-sans text-3xl font-bold tracking-tight leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {currentPrayer?.name?.toUpperCase() || 'SUBUH'} - {currentPrayer?.time || '--:--'}
            </div>
            
            {/* Countdown Golden Badge */}
            {nextPrayer && (
              <div className={`mt-1 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
                darkMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50/80 text-amber-600 border-amber-200/50'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span>Next: {nextPrayer.name} in {countdown || '--:--:--'}</span>
              </div>
            )}
          </div>

          {/* Sisi Kanan: Jam Analog & Digital Clock Dinamis (UI/UX Pro Max Edition) */}
          <div className="flex flex-col items-center gap-1.5 shrink-0 select-none">
            {/* Analog Clock Circle */}
            <div className={`w-20 h-20 shrink-0 flex items-center justify-center rounded-full transition-all duration-500 hover:scale-105 active:scale-95 ${
              darkMode 
                ? 'bg-[#0d968b]/10 shadow-none' 
                : 'bg-[#0d968b]/05 shadow-none'
            }`}>
              <svg className="w-full h-full" viewBox="0 0 64 64">
                <defs>
                  {/* 3D Glass Refraction Gradient - Toska Tint */}
                  <radialGradient id="clock-glass-refract" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                    <stop offset="0%" stopColor={darkMode ? '#2dd4bf' : '#0d968b'} stopOpacity="0.1" />
                    <stop offset="60%" stopColor="#0d968b" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#0d968b" stopOpacity="0.18" />
                  </radialGradient>
                </defs>

                {/* Glass Dial Face (Hanya satu garis lingkaran halus via SVG stroke untuk kebersihan mutlak) */}
                <circle cx="32" cy="32" r="30.5" fill="url(#clock-glass-refract)" stroke={darkMode ? 'rgba(13,150,139,0.35)' : 'rgba(13,150,139,0.2)'} strokeWidth="0.8" />
                
                {/* Hour Numbers (12, 3, 6, 9 seimbang di posisi radius 22) */}
                <text x="32" y="11" textAnchor="middle" dominantBaseline="middle" className={`text-[8.5px] font-black tracking-tighter ${darkMode ? 'fill-emerald-100' : 'fill-emerald-950'}`}>12</text>
                <text x="53" y="32" textAnchor="middle" dominantBaseline="middle" className={`text-[8.5px] font-black tracking-tighter ${darkMode ? 'fill-emerald-100' : 'fill-emerald-950'}`}>3</text>
                <text x="32" y="53" textAnchor="middle" dominantBaseline="middle" className={`text-[8.5px] font-black tracking-tighter ${darkMode ? 'fill-emerald-100' : 'fill-emerald-950'}`}>6</text>
                <text x="11" y="32" textAnchor="middle" dominantBaseline="middle" className={`text-[8.5px] font-black tracking-tighter ${darkMode ? 'fill-emerald-100' : 'fill-emerald-950'}`}>9</text>

                {/* Dynamic Timezone Badge */}
                <text x="32" y="42.5" textAnchor="middle" dominantBaseline="middle" className={`text-[4.5px] font-extrabold tracking-widest opacity-65 ${darkMode ? 'fill-emerald-300' : 'fill-emerald-800'}`}>
                  {tzLabel}
                </text>

                {/* Hour Tick Markers (Disesuaikan melingkar sempurna secara matematis di radius 23) */}
                <circle cx="43.5" cy="12" r="0.8" className={darkMode ? 'fill-emerald-300/60' : 'fill-emerald-900/50'} />
                <circle cx="52" cy="20.5" r="0.8" className={darkMode ? 'fill-emerald-300/60' : 'fill-emerald-900/50'} />
                <circle cx="52" cy="43.5" r="0.8" className={darkMode ? 'fill-emerald-300/60' : 'fill-emerald-900/50'} />
                <circle cx="43.5" cy="52" r="0.8" className={darkMode ? 'fill-emerald-300/60' : 'fill-emerald-900/50'} />
                <circle cx="20.5" cy="52" r="0.8" className={darkMode ? 'fill-emerald-300/60' : 'fill-emerald-900/50'} />
                <circle cx="12" cy="43.5" r="0.8" className={darkMode ? 'fill-emerald-300/60' : 'fill-emerald-900/50'} />
                <circle cx="12" cy="20.5" r="0.8" className={darkMode ? 'fill-emerald-300/60' : 'fill-emerald-900/50'} />
                <circle cx="20.5" cy="12" r="0.8" className={darkMode ? 'fill-emerald-300/60' : 'fill-emerald-900/50'} />

                {/* Hour Hand (Elegant dark bar) */}
                <line 
                  x1="32" y1="32" x2="32" y2="21" 
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                  className={darkMode ? 'text-white' : 'text-slate-900'}
                  transform={`rotate(${hourDeg} 32 32)`}
                />
                
                {/* Minute Hand (Primary toska accent, thin) */}
                <line 
                  x1="32" y1="32" x2="32" y2="14" 
                  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
                  className={darkMode ? 'text-emerald-300' : 'text-[#0a726a]'}
                  transform={`rotate(${minDeg} 32 32)`}
                />
                
                {/* Second Hand (Swiss style with counterweight tail) */}
                <g transform={`rotate(${secDeg} 32 32)`}>
                  {/* Main Pointer */}
                  <line 
                    x1="32" y1="38" x2="32" y2="9" 
                    stroke="#ff4b4b" strokeWidth="0.65" strokeLinecap="round"
                  />
                  {/* Counterweight Tail Dot */}
                  <circle cx="32" cy="36" r="1.3" fill="#ff4b4b" />
                </g>

                {/* Center Pin */}
                <circle cx="32" cy="32" r="1.6" fill="#ff4b4b" />
              </svg>
            </div>

            {/* Digital Clock (Pukul HH:MM) */}
            <div className={`text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full border shadow-sm transition-all duration-300 ${
              darkMode 
                ? 'bg-emerald-950/45 text-emerald-300 border-emerald-900/30' 
                : 'bg-emerald-50/80 text-emerald-800 border-emerald-200/50 shadow-[0_2px_8px_rgba(13,150,139,0.05)]'
            }`}>
              {formattedTime || '--:--'}
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-1">
          <button 
            onClick={async () => {
              const { requestNotificationPermission, initAdzanAudio } = await import('../utils/notifications')
              
              // Unlock browser audio autoplay policy
              initAdzanAudio()

              if (!notificationsEnabled) {
                const perm = await requestNotificationPermission()
                if (perm === 'granted') setNotificationsEnabled(true)
              } else {
                setNotificationsEnabled(false)
              }
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold transition-all duration-300 ${
              darkMode 
                ? notificationsEnabled ? 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30' : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10' 
                : notificationsEnabled ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' : 'bg-white/60 hover:bg-white shadow-sm text-slate-500 border border-slate-200/50'
            }`}
          >
            <span className="material-icons text-[16px] opacity-80">
              {notificationsEnabled ? 'volume_up' : 'volume_off'}
            </span>
            {notificationsEnabled ? 'Adzan Aktif' : 'Adzan Mati'}
          </button>
          <button onClick={() => setActiveTab('qibla')} className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold transition-all duration-300 ${
            darkMode ? 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10' : 'bg-white/60 hover:bg-white shadow-sm text-slate-700 border border-slate-200/50'
          }`}>
            <span className="material-icons text-[16px] opacity-80">explore</span>
            Arah Kiblat
          </button>
        </div>
      </section>

      {/* 4. TIMELINE SHOLAT (SOFT HORIZONTAL PATH) */}
      <section className={`w-full py-4 px-2 relative flex items-center justify-between ${
        darkMode ? 'elegant-card-dark' : 'elegant-card-light'
      }`}>
        {timelinePrayers.map((prayer, i) => {
          const isActive = currentPrayer?.name === prayer.name
          const isNext = nextPrayer?.name === prayer.name
          const isPast = !isActive && !isNext && isTimePast(prayer.time)

          return (
            <div key={prayer.name} className="flex flex-col items-center flex-1 relative z-10">
              <div className={`text-[9px] uppercase tracking-wider font-bold mb-0.5 ${
                isActive ? (darkMode ? 'text-emerald-400' : 'text-emerald-600') : (darkMode ? 'text-slate-500' : 'text-slate-400')
              }`}>
                {prayer.name}
              </div>
              <div className={`text-[12px] font-medium transition-colors duration-300 ${
                isActive ? (darkMode ? 'text-emerald-300' : 'text-emerald-700') : (darkMode ? 'text-slate-300' : 'text-slate-600')
              }`}>
                {prayer.time}
              </div>
              
              {isActive && (
                <div className="absolute inset-0 border border-emerald-400/30 rounded-full scale-125 animate-pulse pointer-events-none"></div>
              )}
            </div>
          )
        })}
      </section>

      {/* 5. MENU FITUR: ELEGANT FLOATING ICONS */}
      <section className="grid grid-cols-4 gap-y-6 gap-x-2 px-2 mt-2">
        {features.map((feature) => (
          <button 
            key={feature.id}
            onClick={feature.action}
            className={`flex flex-col items-center gap-2 group focus:outline-none`}
          >
            {/* Elegant Circular Icon Box */}
            <div className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${feature.color} ${
              darkMode ? 'bg-opacity-20 hover:bg-opacity-30 backdrop-blur-md border border-white/5' : 'bg-opacity-80 hover:bg-opacity-100 backdrop-blur-xl border border-white/60'
            }`}>
              <span className="material-icons text-[24px]">{feature.icon}</span>
            </div>
            
            {/* Label */}
            <span className={`text-[10.5px] font-medium tracking-wide ${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {feature.label}
            </span>
          </button>
        ))}
      </section>

      {/* 6. WISDOM QUOTE */}
      <section className={`p-5 flex gap-4 items-start select-none transition-all duration-300 islamic-watermark ${
        darkMode ? 'elegant-card-dark' : 'elegant-card-light'
      }`}>
        <span className={`p-2 rounded-full text-lg leading-none flex items-center justify-center shrink-0 ${
          darkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50/80 text-amber-500'
        }`}>✨</span>
        <div className="space-y-2">
          <p className={`text-[12px] font-semibold tracking-wide ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
            Keutamaan Sholat
          </p>
          <p className={`text-[16px] leading-relaxed font-arabic text-right mb-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`} dir="rtl">
            إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا
          </p>
          <p className={`text-[11.5px] leading-relaxed italic ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            "Sesungguhnya sholat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman."
          </p>
          <p className={`text-[10px] font-medium mt-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            — QS. An-Nisa: 103
          </p>
        </div>
      </section>

      {/* ── LOKASI MODAL / BOTTOM SHEET ──────────────── */}
      {showLocModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={() => setShowLocModal(false)}
          ></div>
          
          <div className={`relative w-full max-w-lg h-[70vh] sm:h-[50vh] flex flex-col sm:rounded-[3rem] rounded-t-[2.5rem] p-6 shadow-2xl transition-transform animate-slide-up ${
            darkMode ? 'bg-[#0f211f]/95 border border-emerald-900/30' : 'bg-white/95 border border-slate-200'
          }`}>
            <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-6 sm:hidden"></div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-icons text-primary">location_on</span>
                <h3 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>Pilih Lokasi</h3>
              </div>
              <button 
                onClick={() => setShowLocModal(false)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${darkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'}`}
              >
                <span className="material-icons text-[18px]">close</span>
              </button>
            </div>

            <div className="flex gap-2 mb-4 shrink-0">
              <input
                type="text"
                placeholder="Cari nama kota/kabupaten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  darkMode ? 'bg-slate-900/60 text-white placeholder:text-slate-500 border border-white/5' : 'bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200'
                }`}
              />
              <button
                onClick={handleSearch}
                disabled={searching}
                className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all disabled:opacity-50 shadow-[0_4px_15px_rgba(13,150,139,0.2)] flex items-center justify-center min-w-[70px]"
              >
                {searching ? '...' : 'Cari'}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar -mx-2 px-2 space-y-3">
              {searchQuery.trim() === '' ? (
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider mb-2.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Kota Populer</p>
                  <div className="grid grid-cols-2 gap-2">
                    {POPULAR_CITIES.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => selectLocation(c)}
                        className={`p-3 rounded-xl text-left border transition-all active:scale-95 flex items-center gap-2.5 ${
                          darkMode 
                            ? 'bg-slate-800/25 border-slate-700/50 hover:bg-primary/20 hover:border-primary/30 text-slate-200' 
                            : 'bg-slate-50 border-slate-200 hover:bg-primary/10 hover:border-primary/20 text-slate-700 shadow-sm'
                        }`}
                      >
                        <span className="material-icons text-[16px] text-primary">place</span>
                        <span className="text-xs font-bold truncate">{c.city}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => selectLocation(r)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center gap-3 bento-card-hover ${
                      darkMode ? 'bg-slate-800/40 hover:bg-primary/20 border border-slate-700/50' : 'bg-slate-50 hover:bg-primary/10 border border-slate-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${darkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                      <span className="material-icons text-[16px]">place</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`text-sm font-bold block truncate ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{r.city}</span>
                      <span className={`text-[10px] block opacity-60 truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{r.provinsi || 'Indonesia'}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className={`text-center py-8 text-sm font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {searching ? 'Sedang mencari...' : 'Kota tidak ditemukan. Coba ketik nama kota dengan benar.'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
