import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { useCountdown } from '../hooks/useCountdown'
import { fetchEquranSchedule } from '../data/indonesiaLocations'

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]
const KOLOM = ['Imsak', 'Subuh', 'Terbit', 'Dhuha', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya']

export default function Jadwal() {
  const { prayerTimes, hijriDate, location, darkMode } = useApp()
  const { currentPrayer, nextPrayer, countdown, formattedTime } = useCountdown(prayerTimes)

  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [monthlyData, setMonthlyData] = useState([])
  const [loadingMonthly, setLoadingMonthly] = useState(false)
  
  // Selected date state for the interactive calendar (defaults to today's date)
  const [selectedDate, setSelectedDate] = useState(today.getDate())
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false)

  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const carouselRef = useRef(null)
  const hasAutoScrolled = useRef(false)


  // Fetch monthly schedule data
  useEffect(() => {
    if (!location.lat || !location.lng) return
    const fetchMonthly = async () => {
      setLoadingMonthly(true)
      try {
        let parsed = null

        if (location.provinsi && location.kabkota) {
          const jadwal = await fetchEquranSchedule(location.provinsi, location.kabkota, month + 1, year)
          if (jadwal) {
            parsed = jadwal.map((day) => ({
              tgl: String(day.tanggal).padStart(2, '0'),
              hari: day.hari || HARI[new Date(day.tanggal_lengkap).getDay()],
              Imsak: day.imsak,
              Subuh: day.subuh,
              Terbit: day.terbit,
              Dhuha: day.dhuha,
              Dzuhur: day.dzuhur,
              Ashar: day.ashar,
              Maghrib: day.maghrib,
              Isya: day.isya,
            }))
          }
        }

        if (!parsed) {
          const res = await fetch(
            `https://api.aladhan.com/v1/calendar/${year}/${month + 1}?latitude=${location.lat}&longitude=${location.lng}&method=20`
          )
          const json = await res.json()
          if (json.code === 200 && json.data) {
            parsed = json.data.map((day) => {
              const t = day.timings
              const clean = (s) => s.replace(/\s*\(.*\)/, '')
              const d = new Date(day.date.readable)
              return {
                tgl: day.date.gregorian.day,
                hari: HARI[new Date(`${year}-${String(month + 1).padStart(2, '0')}-${day.date.gregorian.day}`).getDay()] || HARI[d.getDay()],
                hijri: day.date.hijri,
                Imsak: clean(t.Imsak),
                Subuh: clean(t.Fajr),
                Terbit: clean(t.Sunrise),
                Dhuha: clean(t.Dhuhr).replace(/^(\d{2}):(\d{2})$/, (_, h, m) => {
                  const terbitH = parseInt(clean(t.Sunrise).split(':')[0])
                  const terbitM = parseInt(clean(t.Sunrise).split(':')[1])
                  let dm = terbitM + 15
                  let dh = terbitH
                  if (dm >= 60) { dm -= 60; dh += 1 }
                  return `${String(dh).padStart(2, '0')}:${String(dm).padStart(2, '0')}`
                }),
                Dzuhur: clean(t.Dhuhr),
                Ashar: clean(t.Asr),
                Maghrib: clean(t.Maghrib),
                Isya: clean(t.Isha),
              }
            })
            console.log('[SholatKu] ⚠️ Monthly schedule from aladhan.com (fallback)')
          }
        }

        if (parsed) setMonthlyData(parsed)
      } catch (err) {
        console.error('Gagal mengambil jadwal bulanan:', err)
      }
      setLoadingMonthly(false)
    }
    fetchMonthly()
  }, [location.lat, location.lng, location.provinsi, location.kabkota, month, year])

  const isCurrentMonth = month === today.getMonth() && year === today.getFullYear()
  const todayDate = today.getDate()

  // Reset selected date when month/year changes
  useEffect(() => {
    if (isCurrentMonth) {
      setSelectedDate(todayDate)
    } else {
      setSelectedDate(1)
    }
  }, [month, year, isCurrentMonth, todayDate])

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  // Calculate dynamic prayer data for selected date
  const selectedDayData = useMemo(() => {
    if (!monthlyData || monthlyData.length === 0) {
      return prayerTimes ? prayerTimes : []
    }
    const found = monthlyData.find(d => parseInt(d.tgl) === selectedDate)
    if (!found) return prayerTimes ? prayerTimes : []
    
    return [
      { name: 'Imsak', time: found.Imsak, icon: 'notifications_none' },
      { name: 'Subuh', time: found.Subuh, icon: 'brightness_5' },
      { name: 'Terbit', time: found.Terbit, icon: 'wb_twilight' },
      { name: 'Dhuha', time: found.Dhuha, icon: 'wb_sunny' },
      { name: 'Dzuhur', time: found.Dzuhur, icon: 'wb_sunny' },
      { name: 'Ashar', time: found.Ashar, icon: 'cloud' },
      { name: 'Maghrib', time: found.Maghrib, icon: 'brightness_4' },
      { name: 'Isya', time: found.Isya, icon: 'brightness_2' }
    ]
  }, [selectedDate, monthlyData, prayerTimes])

  const selectedDayName = useMemo(() => {
    const found = monthlyData.find(d => parseInt(d.tgl) === selectedDate)
    if (found) {
      return `${found.hari}, ${selectedDate} ${BULAN[month]} ${year}`
    }
    return `${HARI[today.getDay()]}, ${selectedDate} ${BULAN[month]} ${year}`
  }, [selectedDate, monthlyData, month, year])

  const selectedHijri = useMemo(() => {
    if (isCurrentMonth && selectedDate === todayDate && hijriDate) {
      return hijriDate
    }
    const found = monthlyData.find(d => parseInt(d.tgl) === selectedDate)
    if (found && found.hijri) {
      return `${found.hijri.day} ${found.hijri.month.id || found.hijri.month.ar} ${found.hijri.year} H`
    }
    return ''
  }, [selectedDate, monthlyData, hijriDate, isCurrentMonth, todayDate])

  const todayCards = useMemo(() => {
    if (!prayerTimes) return []
    return prayerTimes.filter(p => !['Imsak', 'Terbit'].includes(p.name))
  }, [prayerTimes])

  // PDF Export
  const handleExportPDF = async () => {
    try {
      const { default: jsPDF } = await import('jspdf')
      const { default: html2canvas } = await import('html2canvas')
      
      const originalEl = document.getElementById('jadwal-table-export')
      if (!originalEl) return

      const clonedEl = originalEl.cloneNode(true)
      
      const container = document.createElement('div')
      container.className = 'dark' 
      container.style.position = 'absolute'
      container.style.top = '-9999px'
      container.style.left = '0'
      container.style.width = '1000px'
      container.appendChild(clonedEl)
      document.body.appendChild(container)

      clonedEl.style.width = '1000px'
      clonedEl.style.height = 'auto'
      clonedEl.style.overflow = 'visible'
      clonedEl.style.backgroundColor = '#0c1a18' 
      clonedEl.style.color = '#ffffff' 

      const rows = clonedEl.querySelectorAll('tbody tr')
      rows.forEach(row => {
        if (row.className.includes('bg-primary/10') || row.className.includes('ring-1')) {
           row.className = row.className.replace('bg-primary/10', '').replace('ring-1', '').replace('ring-inset', '').replace('ring-primary/30', '')
           row.style.backgroundColor = 'rgba(255, 255, 255, 0.05)' 
           row.style.border = '1px solid rgba(255, 255, 255, 0.1)'
        }
      })

      const canvas = await html2canvas(clonedEl, { 
        backgroundColor: '#0c1a18',
        scale: 2,
        windowWidth: 1200
      })
      
      document.body.removeChild(container)

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfW = pdf.internal.pageSize.getWidth()
      const pdfH = pdf.internal.pageSize.getHeight()
      
      const imgRatio = canvas.width / canvas.height
      const printW = pdfW - 20
      const printH = printW / imgRatio

      pdf.addImage(imgData, 'PNG', 10, 10, printW, printH)
      pdf.save(`jadwal-sholat-${BULAN[month]}-${year}.pdf`)
    } catch (err) {
      console.error('Gagal export PDF:', err)
      alert('Gagal mengunduh PDF. Coba lagi.')
    }
  }

  // Share schedule
  const handleShare = async () => {
    if (!selectedDayData) return
    const text = `📍 ${location.city}\n📅 ${selectedDayName}\n🕌 ${selectedHijri || ''}\n\n` +
      selectedDayData.map(p => `${p.name}: ${p.time}`).join('\n') +
      '\n\n— SholatKu App'

    if (navigator.share) {
      try { await navigator.share({ title: 'Jadwal Sholat', text }) } catch {}
    } else {
      await navigator.clipboard.writeText(text)
      alert('Jadwal berhasil disalin!')
    }
  }

  // Helper to get color theme for each prayer
  const getPrayerTheme = (name) => {
    switch (name) {
      case 'Imsak':
        return {
          bg: 'bg-amber-500/5 dark:bg-amber-500/10',
          border: 'border-amber-500/20 dark:border-amber-500/30',
          text: 'text-amber-900 dark:text-amber-300',
          iconColor: 'text-amber-600 dark:text-amber-400',
          dot: 'bg-amber-500'
        }
      case 'Subuh':
        return {
          bg: 'bg-cyan-500/5 dark:bg-cyan-500/10',
          border: 'border-cyan-500/20 dark:border-cyan-500/30',
          text: 'text-cyan-900 dark:text-cyan-300',
          iconColor: 'text-cyan-600 dark:text-cyan-400',
          dot: 'bg-cyan-500'
        }
      case 'Terbit':
        return {
          bg: 'bg-orange-500/5 dark:bg-orange-500/10',
          border: 'border-orange-500/20 dark:border-orange-500/30',
          text: 'text-orange-900 dark:text-orange-300',
          iconColor: 'text-orange-600 dark:text-orange-400',
          dot: 'bg-orange-500'
        }
      case 'Dhuha':
        return {
          bg: 'bg-teal-500/5 dark:bg-teal-500/10',
          border: 'border-teal-500/20 dark:border-teal-500/30',
          text: 'text-teal-900 dark:text-teal-300',
          iconColor: 'text-teal-600 dark:text-teal-400',
          dot: 'bg-teal-500'
        }
      case 'Dzuhur':
        return {
          bg: 'bg-amber-600/5 dark:bg-amber-500/10',
          border: 'border-amber-600/20 dark:border-amber-500/30',
          text: 'text-amber-950 dark:text-amber-200',
          iconColor: 'text-amber-600 dark:text-amber-400',
          dot: 'bg-amber-500'
        }
      case 'Ashar':
        return {
          bg: 'bg-emerald-500/5 dark:bg-emerald-500/10',
          border: 'border-emerald-500/20 dark:border-emerald-500/30',
          text: 'text-emerald-900 dark:text-emerald-300',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
          dot: 'bg-emerald-500'
        }
      case 'Maghrib':
        return {
          bg: 'bg-red-500/5 dark:bg-red-500/10',
          border: 'border-red-500/20 dark:border-red-500/30',
          text: 'text-red-900 dark:text-red-300',
          iconColor: 'text-red-600 dark:text-red-400',
          dot: 'bg-red-500'
        }
      case 'Isya':
        return {
          bg: 'bg-indigo-500/5 dark:bg-indigo-500/10',
          border: 'border-indigo-500/20 dark:border-indigo-500/30',
          text: 'text-indigo-900 dark:text-indigo-300',
          iconColor: 'text-indigo-600 dark:text-indigo-400',
          dot: 'bg-indigo-500'
        }
      default:
        return {
          bg: 'bg-slate-500/5 dark:bg-slate-500/10',
          border: 'border-slate-500/20 dark:border-slate-500/30',
          text: 'text-slate-900 dark:text-slate-300',
          iconColor: 'text-slate-600 dark:text-slate-400',
          dot: 'bg-slate-500'
        }
    }
  }

  const getCardGradient = (name) => {
    switch (name) {
      case 'Imsak': return 'from-slate-900 to-slate-800'
      case 'Subuh': return 'from-[#0F172A] to-[#0369A1]'
      case 'Terbit': return 'from-orange-900 to-orange-700'
      case 'Dhuha': return 'from-teal-900 to-teal-700'
      case 'Dzuhur': return 'from-[#0284C7] to-[#F59E0B]'
      case 'Ashar': return 'from-[#D97706] to-[#78350F]'
      case 'Maghrib': return 'from-[#B91C1C] to-[#4338CA]'
      case 'Isya': return 'from-[#030712] to-[#1E1B4B]'
      default: return 'from-slate-800 to-slate-900'
    }
  }

  // Monthly Calendar Cell calculations
  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay()
    const totalDays = new Date(year, month + 1, 0).getDate()
    
    const cells = []
    // Add empty cells for padding
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push({ empty: true, id: `empty-${i}` })
    }
    // Add day cells
    for (let d = 1; d <= totalDays; d++) {
      const dayName = HARI[new Date(year, month, d).getDay()]
      cells.push({
        dayNum: d,
        dayName,
        empty: false,
        id: `day-${d}`
      })
    }
    return cells
  }, [month, year])

  // Reset scroll flag when date changes
  useEffect(() => {
    hasAutoScrolled.current = false
  }, [selectedDate, month, year])

  // Auto-scroll to active prayer card
  useEffect(() => {
    if (carouselRef.current && selectedDayData && selectedDayData.length > 0 && !hasAutoScrolled.current) {
      let targetName = 'Subuh' // default
      if (isCurrentMonth && selectedDate === todayDate) {
        if (currentPrayer) targetName = currentPrayer.name
        else if (nextPrayer) targetName = nextPrayer.name
      }
      const idx = selectedDayData.findIndex(p => p.name === targetName)
      if (idx !== -1) {
        setTimeout(() => {
           if (carouselRef.current) {
             const card = carouselRef.current.children[idx]
             if (card) {
               const scrollLeft = card.offsetLeft - carouselRef.current.offsetLeft
               carouselRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' })
               setActiveCardIndex(idx)
               hasAutoScrolled.current = true
             }
           }
        }, 150)
      }
    }
  }, [selectedDayData, isCurrentMonth, selectedDate, todayDate, currentPrayer, nextPrayer])

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-32">
      
      {/* ─── SECTION 1: DUAL-DATE HERO CARD (TANGGAL RAKSASA) ─── */}
      <div className={`p-6 transition-all duration-300 relative overflow-hidden ${
        darkMode ? 'glass-clay-dark' : 'glass-clay-light'
      }`}>
        <div className="flex items-center gap-6 relative z-10">
          {/* Angka Tanggal Raksasa di Sisi Kiri */}
          <div className={`w-[96px] h-[96px] flex-shrink-0 rounded-2xl flex items-center justify-center font-sans font-black text-5xl tracking-tighter ${
            darkMode 
              ? 'bg-white/5 border border-white/10 text-white shadow-inner' 
              : 'bg-slate-50 border border-slate-200/60 text-slate-800 shadow-sm'
          }`}>
            {selectedDate}
          </div>
          
          {/* Stacked Info di Sisi Kanan */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-xl font-bold tracking-tight truncate leading-tight ${
              darkMode ? 'text-white' : 'text-slate-800'
            }`}>
              {selectedDayName.split(',')[0]}, {BULAN[month]} {year}
            </h3>
            
            {selectedHijri && (
              <p className="text-[12px] font-bold text-[#0d968b] mt-1.5 flex items-center gap-1.5">
                <span className="material-icons text-[14px]">event_note</span>
                {selectedHijri}
              </p>
            )}
            
            {/* Countdown / Status Badge (Jika Tanggal Aktif Adalah Hari Ini) */}
            {isCurrentMonth && selectedDate === todayDate && nextPrayer ? (
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span>{nextPrayer.name} in {countdown}</span>
              </div>
            ) : (
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-slate-500/10 border border-slate-500/20 text-slate-500 dark:text-slate-400">
                <span>Jadwal Terpilih</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: DYNAMIC GREETING & DAILY INSIGHT ─── */}
      <div className={`p-4 rounded-3xl transition-all duration-300 relative overflow-hidden flex items-center gap-4 ${
        darkMode ? 'bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-white/5' : 'bg-gradient-to-r from-slate-50/80 to-slate-100/80 border border-slate-200/50'
      }`}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary shadow-inner">
          <span className="material-icons text-2xl">{
            today.getHours() >= 5 && today.getHours() < 11 ? 'wb_twilight' :
            today.getHours() >= 11 && today.getHours() < 15 ? 'wb_sunny' :
            today.getHours() >= 15 && today.getHours() < 18 ? 'brightness_medium' : 'nights_stay'
          }</span>
        </div>
        <div className="flex-1">
          <h4 className={`font-black text-sm tracking-tight ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
            {
              today.getHours() >= 5 && today.getHours() < 11 ? 'Pagi yang Berkah! 🌅' :
              today.getHours() >= 11 && today.getHours() < 15 ? 'Tetap Semangat Siang Ini! ☀️' :
              today.getHours() >= 15 && today.getHours() < 18 ? 'Senja Menjelang, Udah Sholat? 🌇' : 'Malam Tenang, Jangan Lupa Berdoa 🌙'
            }
          </h4>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 italic">
            "Barangsiapa yang menjaga sholatnya, Allah akan menjaga hidupnya."
          </p>
        </div>
      </div>


      {/* ─── SECTION 3: HORIZONTAL SWIPEABLE PRAYER CAROUSEL ─── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <span className="material-icons text-primary text-lg">swipe</span>
          <h4 className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Geser Jadwal Sholat
          </h4>
        </div>
        
        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          onScroll={(e) => {
            const scrollLeft = e.target.scrollLeft
            const cardWidth = e.target.offsetWidth
            const newIndex = Math.round(scrollLeft / cardWidth)
            if (newIndex !== activeCardIndex && newIndex >= 0 && newIndex < selectedDayData.length) {
              setActiveCardIndex(newIndex)
            }
          }}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {selectedDayData.map((prayer, idx) => {
            const isTodayPrayer = isCurrentMonth && selectedDate === todayDate
            const isCurrent = isTodayPrayer && currentPrayer?.name === prayer.name
            const isNext = isTodayPrayer && nextPrayer?.name === prayer.name
            const gradient = getCardGradient(prayer.name)
            
            return (
              <div 
                key={prayer.name}
                className="w-full flex-shrink-0 snap-center px-1"
                style={{ width: '100%' }}
              >
                <div 
                  className={`h-[240px] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${gradient} shadow-lg text-white border border-white/20`}
                >
                  {/* Background Glow / Blur Effect inside Card */}
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
                  
                  {/* Card Content - Z-10 to stay above blur */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                      <span className="material-icons text-[20px]">{prayer.icon}</span>
                      <span className="text-sm font-bold uppercase tracking-wider">{prayer.name}</span>
                    </div>
                    
                    {/* Status Badge */}
                    {isCurrent ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/80 text-white text-[10px] uppercase tracking-wider font-black shadow-sm backdrop-blur-md border border-emerald-400/50">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        <span>Sekarang</span>
                      </div>
                    ) : isNext ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/80 text-white text-[10px] uppercase tracking-wider font-black shadow-sm backdrop-blur-md border border-amber-400/50">
                        <span>Selanjutnya</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-[10px] uppercase tracking-wider font-bold backdrop-blur-md">
                        <span>Tersedia</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center justify-center flex-1 mt-4">
                    <p className="font-mono text-7xl font-black tracking-tighter drop-shadow-md">
                      {prayer.time}
                    </p>
                    {isNext && (
                      <p className="text-sm font-bold opacity-90 mt-2 bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                        <span className="material-icons text-sm">timer</span>
                        dalam {countdown}
                      </p>
                    )}
                    {isCurrent && (
                      <p className="text-sm font-bold text-emerald-200 mt-2 bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                        <span className="material-icons text-sm">check_circle</span>
                        Waktu sholat telah tiba
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Interactive Timeline Navigation Capsule */}
        <div className="flex justify-center mt-2 px-1 w-full overflow-x-auto no-scrollbar">
          <div className={`inline-flex items-center p-1.5 rounded-full backdrop-blur-xl border shadow-sm ${
            darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            {selectedDayData.map((prayer, idx) => {
              const isActive = activeCardIndex === idx
              const isTodayPrayer = isCurrentMonth && selectedDate === todayDate
              const isCurrent = isTodayPrayer && currentPrayer?.name === prayer.name
              
              return (
                <button
                  key={prayer.name}
                  onClick={() => {
                    if (carouselRef.current) {
                      const card = carouselRef.current.children[idx]
                      if (card) {
                        const scrollLeft = card.offsetLeft - carouselRef.current.offsetLeft
                        carouselRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' })
                        setActiveCardIndex(idx)
                      }
                    }
                  }}
                  className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                    isActive 
                      ? 'bg-primary text-white shadow-md scale-110 z-10' 
                      : darkMode 
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title={prayer.name}
                >
                  <span className="material-icons text-[18px]">{prayer.icon}</span>
                  {isCurrent && !isActive && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-800"></span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── SECTION 4: MONTH CONTROL & ACTION BAR ─── */}
      <div className={`w-full max-w-md mx-auto p-2 rounded-full flex items-center justify-between shadow-sm backdrop-blur-xl border transition-all duration-300 mt-2 ${
        darkMode 
          ? 'bg-slate-800/50 border-white/10' 
          : 'bg-slate-100/80 border-slate-200/80'
      }`}>
        {/* Month Nav Group */}
        <div className="flex items-center gap-1 flex-1">
          <button 
            onClick={prevMonth} 
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
              darkMode ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
            }`}
            title="Bulan Sebelumnya"
          >
            <span className="material-icons text-lg">chevron_left</span>
          </button>
          
          <span className={`flex-1 text-center font-black text-xs sm:text-sm tracking-tight truncate px-1 ${
            darkMode ? 'text-white' : 'text-slate-800'
          }`}>
            {BULAN[month]} {year}
          </span>
          
          <button 
            onClick={nextMonth} 
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
              darkMode ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
            }`}
            title="Bulan Berikutnya"
          >
            <span className="material-icons text-lg">chevron_right</span>
          </button>
        </div>

        {/* Thin Vertical Divider */}
        <div className={`w-[1px] h-6 mx-2 ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`}></div>

        {/* Actions Group */}
        <div className="flex items-center gap-1.5">
          <button 
            onClick={handleExportPDF} 
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 border ${
              darkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300' 
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
            title="Unduh PDF Bulanan"
          >
            <span className="material-icons text-lg">picture_as_pdf</span>
          </button>
          
          <button 
            onClick={handleShare} 
            className="w-11 h-11 rounded-full flex items-center justify-center bg-primary text-white transition-all duration-200 active:scale-90 hover:bg-primary-dark shadow-sm shadow-[#0d968b]/20"
            title="Bagikan Jadwal Hari Ini"
          >
            <span className="material-icons text-lg">share</span>
          </button>
        </div>
      </div>

      {/* ─── SECTION 5: EXPANDABLE BENTO CALENDAR GRID ─── */}
      <div className={`p-4 transition-all duration-300 ${
        darkMode ? 'glass-clay-dark' : 'glass-clay-light'
      }`}>
        <button
          onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
          className="w-full flex items-center justify-between pb-2 border-b border-slate-200/50 dark:border-white/5 min-h-[44px]"
        >
          <div className="flex items-center gap-2">
            <span className="material-icons text-primary text-sm">calendar_month</span>
            <span className={`text-[11px] font-black uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Lihat Kalender Bulanan Penuh
            </span>
          </div>
          <span className="material-icons text-slate-400">
            {isCalendarExpanded ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {isCalendarExpanded && (
          <div className="mt-4 animate-fade-in">
            {/* Header Nama Hari */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((dayName, idx) => (
                <span 
                  key={dayName}
                  className={`text-[9px] uppercase font-black tracking-wider ${
                    idx === 5 ? 'text-emerald-500 dark:text-emerald-400' : idx === 0 ? 'text-red-500' : darkMode ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {dayName}
                </span>
              ))}
            </div>
            
            {/* Grid Sel Kalender */}
            <div className="grid grid-cols-7 gap-1.5">
              {calendarCells.map((cell) => {
                if (cell.empty) {
                  return <div key={cell.id} className="aspect-square"></div>
                }
                
                const isSelected = selectedDate === cell.dayNum
                const isCellToday = isCurrentMonth && cell.dayNum === todayDate
                const isFriday = cell.dayName === 'Jumat'
                
                return (
                  <button
                    key={cell.id}
                    onClick={() => {
                      setSelectedDate(cell.dayNum)
                    }}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center font-sans transition-all duration-200 text-xs font-black relative active:scale-90 ${
                      isSelected
                        ? 'bg-primary text-white shadow-sm shadow-primary/20'
                        : isCellToday
                        ? darkMode
                          ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                          : 'bg-amber-50 border border-amber-200 text-amber-700'
                        : isFriday
                        ? 'text-emerald-600 dark:text-emerald-400 hover:bg-slate-100 dark:hover:bg-white/5'
                        : darkMode
                        ? 'hover:bg-white/5 text-slate-200'
                        : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    {cell.dayNum}
                    {/* Dot Penanda Hari Ini */}
                    {isCellToday && (
                      <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-amber-500 animate-pulse'}`}></span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* ─── EXPORT TABLE BUFFER (HIDDEN) ─── */}
      <div className="hidden">
        <div id="jadwal-table-export" className="p-8 text-[#ffffff]">
          <h2 className="text-center text-xl font-bold mb-1">JADWAL SHOLAT SHOLATKU</h2>
          <p className="text-center text-xs opacity-80 mb-6">Lokasi: {location.city} • Bulan: {BULAN[month]} {year}</p>
          
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
                <th className="py-2.5 px-3">Tgl</th>
                <th className="py-2.5 px-3">Hari</th>
                {KOLOM.map(c => <th key={c} className="py-2.5 px-2 text-center">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td className="py-2.5 px-3 font-mono">{row.tgl}</td>
                  <td className="py-2.5 px-3">{row.hari}</td>
                  {KOLOM.map(c => <td key={c} className="py-2.5 px-2 text-center font-mono">{row[c]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
