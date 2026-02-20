import React, { useState, useEffect, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { useCountdown } from '../hooks/useCountdown'

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]
const KOLOM = ['Imsak', 'Subuh', 'Terbit', 'Dhuha', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya']

export default function Jadwal() {
  const { prayerTimes, hijriDate, location } = useApp()
  const { currentPrayer, nextPrayer, countdown, formattedTime } = useCountdown(prayerTimes)

  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [monthlyData, setMonthlyData] = useState([])
  const [loadingMonthly, setLoadingMonthly] = useState(false)

  // Fetch data bulanan dari Aladhan Calendar API
  useEffect(() => {
    if (!location.lat || !location.lng) return
    const fetchMonthly = async () => {
      setLoadingMonthly(true)
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/calendar/${year}/${month + 1}?latitude=${location.lat}&longitude=${location.lng}&method=20`
        )
        const json = await res.json()
        if (json.code === 200 && json.data) {
          const parsed = json.data.map((day) => {
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
                // Dhuha sekitar 15 menit setelah Terbit
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
          setMonthlyData(parsed)
        }
      } catch (err) {
        console.error('Gagal mengambil jadwal bulanan:', err)
      }
      setLoadingMonthly(false)
    }
    fetchMonthly()
  }, [location.lat, location.lng, month, year])

  const isCurrentMonth = month === today.getMonth() && year === today.getFullYear()
  const todayDate = today.getDate()

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  // Waktu sholat utama untuk card hari ini
  const todayCards = useMemo(() => {
    if (!prayerTimes) return []
    return prayerTimes.filter(p => !['Imsak', 'Terbit'].includes(p.name))
  }, [prayerTimes])

  const handleExportPDF = async () => {
    try {
      const { default: jsPDF } = await import('jspdf')
      const { default: html2canvas } = await import('html2canvas')
      
      // 1. Clone element agar bisa dimodifikasi style-nya tanpa merubah tampilan asli
      const originalEl = document.getElementById('jadwal-table-export')
      if (!originalEl) return

      const clonedEl = originalEl.cloneNode(true)
      
      // 2. Wrap dalam container dark mode agar style konsisten
      const container = document.createElement('div')
      container.className = 'dark' // Paksa class dark
      container.style.position = 'absolute'
      container.style.top = '-9999px'
      container.style.left = '0'
      container.style.width = '1000px'
      container.appendChild(clonedEl)
      document.body.appendChild(container)

      // Set style clone
      clonedEl.style.width = '1000px'
      clonedEl.style.height = 'auto'
      clonedEl.style.overflow = 'visible'
      clonedEl.style.backgroundColor = '#0c1a18' // Pastikan background tabel gelap
      clonedEl.style.color = '#ffffff' // Pastikan text putih

      // 3. Modifikasi Clone:
      // a. (Header tetap ditampilkan sesuai request user)
      
      // b. Fix tampilan baris "Hari Ini" agar tidak putih/terang
      // Kita cari row yang aktif (biasanya ada text-primary atau class animate-pulse di dalam cell)
      const rows = clonedEl.querySelectorAll('tbody tr')
      rows.forEach(row => {
        // Cek jika ini baris hari ini (bisa cek dari class bg-primary/10 atau lainnya)
        if (row.className.includes('bg-primary/10') || row.className.includes('ring-1')) {
           // Reset class yang bikin terang
           row.className = row.className.replace('bg-primary/10', '').replace('ring-1', '').replace('ring-inset', '').replace('ring-primary/30', '')
           // Force dark background manual
           row.style.backgroundColor = 'rgba(255, 255, 255, 0.05)' 
           row.style.border = '1px solid rgba(255, 255, 255, 0.1)'
           
           // Pastikan text tetap berwarna (primary/cyan/emerald) sesuai aslinya
           // Tidak perlu ubah warna text karena sudah ok
        }
      })

      // 4. Capture dengan html2canvas
      const canvas = await html2canvas(clonedEl, { 
        backgroundColor: '#0c1a18',
        scale: 2,
        windowWidth: 1200
      })
      
      // 5. Hapus container
      document.body.removeChild(container)

      // 6. Generate PDF
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

  const handleShare = async () => {
    if (!prayerTimes) return
    const dateStr = today.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    const text = `📍 ${location.city}\n📅 ${dateStr}\n🕌 ${hijriDate}\n\n` +
      prayerTimes.map(p => `${p.name}: ${p.time}`).join('\n') +
      '\n\n— SholatKu App'

    if (navigator.share) {
      try { await navigator.share({ title: 'Jadwal Sholat', text }) } catch {}
    } else {
      await navigator.clipboard.writeText(text)
      alert('Jadwal berhasil disalin!')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ─── SECTION 1: Countdown Sholat Berikutnya ─── */}
      {nextPrayer && (
        <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-icons text-primary">notifications_active</span>
            </div>
            <div>
              <p className="text-xs text-slate-400">Sholat Berikutnya</p>
              <p className="text-lg font-bold text-primary">{nextPrayer.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-primary tracking-wider">{countdown}</div>
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-slate-400 uppercase tracking-wide">Sekarang</p>
              <p className="font-mono text-lg text-slate-800 dark:text-white font-semibold">{formattedTime}</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── SECTION 2: Jadwal Sholat Hari Ini (Cards) ─── */}
      <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/10 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-icons text-primary">wb_sunny</span>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Jadwal Sholat Hari Ini</h3>
              <span className="text-xs bg-accent-gold/20 text-accent-gold px-2 py-0.5 rounded-full font-medium border border-accent-gold/30">
                {today.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {location.city} {hijriDate ? `• ${hijriDate}` : ''}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {todayCards.map((prayer) => {
            const isCurrent = currentPrayer?.name === prayer.name
            const isNext = nextPrayer?.name === prayer.name
            return (
              <div
                key={prayer.name}
                className={`relative rounded-xl p-3 sm:p-4 text-center transition-all duration-300 border ${
                  isCurrent
                    ? 'bg-primary/15 border-primary/50 shadow-lg shadow-primary/10 scale-[1.02]'
                    : isNext
                    ? 'bg-accent-gold/10 border-accent-gold/30'
                    : 'bg-white/60 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-primary/20'
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <span className="material-icons text-[10px]">notifications_active</span>
                      <span className="hidden sm:inline">Sekarang</span>
                    </span>
                  </div>
                )}
                <p className={`text-xs font-medium mb-1 ${isCurrent ? 'text-primary' : isNext ? 'text-accent-gold' : 'text-slate-500 dark:text-slate-400'}`}>
                  {prayer.name}
                </p>
                <p className={`font-mono text-lg sm:text-2xl font-bold ${
                  isCurrent ? 'text-primary' : isNext ? 'text-accent-gold' : 'text-slate-800 dark:text-white'
                }`}>
                  {prayer.time}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── SECTION 3: Navigasi Bulan + Tombol Aksi ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-2 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/20 transition-colors text-slate-600 dark:text-slate-300">
            <span className="material-icons text-lg">chevron_left</span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg">
            <span className="material-icons text-primary text-lg">calendar_month</span>
            <span className="font-bold text-slate-800 dark:text-white">{BULAN[month]} {year}</span>
          </div>
          <button onClick={nextMonth} className="p-2 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/20 transition-colors text-slate-600 dark:text-slate-300">
            <span className="material-icons text-lg">chevron_right</span>
          </button>
          {!isCurrentMonth && (
            <button onClick={() => { setMonth(today.getMonth()); setYear(today.getFullYear()) }} className="text-xs text-primary font-medium hover:underline ml-2">
              Hari Ini
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/20 transition-colors text-sm font-medium">
            <span className="material-icons text-sm">picture_as_pdf</span>
            Unduh PDF
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
            <span className="material-icons text-sm">share</span>
            Bagikan
          </button>
        </div>
      </div>

      {/* ─── SECTION 4: Tabel Jadwal Bulanan ─── */}
      <div id="jadwal-table-export" className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-icons text-primary">date_range</span>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Jadwal Sholat {BULAN[month]} {year}
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {location.city} • {monthlyData.length} hari
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loadingMonthly ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="text-sm text-slate-400">Memuat jadwal bulanan...</p>
            </div>
          ) : (
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                  <th className="text-left py-3 px-3 text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider w-12">Tgl</th>
                  <th className="text-left py-3 px-3 text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider w-20">Hari</th>
                  {KOLOM.map((col) => (
                    <th
                      key={col}
                      className={`text-center py-3 px-2 font-semibold text-xs uppercase tracking-wider ${
                        col === 'Imsak' ? 'text-orange-400' :
                        col === 'Maghrib' ? 'text-red-400' :
                        col === 'Subuh' ? 'text-cyan-400' :
                        col === 'Ashar' ? 'text-emerald-400' :
                        col === 'Isya' ? 'text-indigo-400' :
                        'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row, idx) => {
                  const isToday = isCurrentMonth && parseInt(row.tgl) === todayDate
                  const isJumat = row.hari === 'Jumat'
                  return (
                    <tr
                      key={idx}
                      className={`border-b border-slate-50 dark:border-white/5 transition-colors ${
                        isToday
                          ? 'bg-primary/10 dark:bg-primary/15 ring-1 ring-inset ring-primary/30'
                          : idx % 2 === 0
                          ? 'bg-white/30 dark:bg-transparent'
                          : 'bg-slate-50/50 dark:bg-white/[0.02]'
                      } hover:bg-primary/5 dark:hover:bg-white/5`}
                    >
                      <td className={`py-3 px-3 font-medium ${isToday ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-300'}`}>
                        <div className="flex items-center gap-1">
                          {isToday && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>}
                          {row.tgl}
                        </div>
                      </td>
                      <td className={`py-3 px-3 ${
                        isToday ? 'text-primary font-bold' :
                        isJumat ? 'text-emerald-500 font-medium' :
                        'text-slate-500 dark:text-slate-400'
                      }`}>
                        {row.hari}
                      </td>
                      {KOLOM.map((col) => (
                        <td
                          key={col}
                          className={`py-3 px-2 text-center font-mono text-xs sm:text-sm ${
                            isToday ? 'font-semibold' : ''
                          } ${
                            col === 'Imsak' ? 'text-orange-400' :
                            col === 'Maghrib' ? 'text-red-400' :
                            col === 'Subuh' ? (isToday ? 'text-cyan-300' : 'text-cyan-500 dark:text-cyan-400') :
                            col === 'Ashar' ? (isToday ? 'text-emerald-300' : 'text-emerald-500 dark:text-emerald-400') :
                            col === 'Isya' ? (isToday ? 'text-indigo-300' : 'text-indigo-500 dark:text-indigo-400') :
                            isToday ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400 px-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary/20 border border-primary/40"></div>
          <span>Hari ini</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-orange-400"></div>
          <span>Imsak</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-cyan-400"></div>
          <span>Subuh</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-red-400"></div>
          <span>Maghrib</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-emerald-400"></div>
          <span>Ashar</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-indigo-400"></div>
          <span>Isya</span>
        </div>
      </div>
    </div>
  )
}
