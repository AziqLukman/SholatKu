import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

const navItems = [
  { id: 'home', icon: 'dashboard', label: 'Beranda' },
  { id: 'schedule', icon: 'calendar_today', label: 'Jadwal' },
  { id: 'ramadhan', icon: 'auto_awesome', label: 'Misi Ramadhan' },
  { id: 'tasbih', icon: 'radio_button_checked', label: 'Tasbih & Dzikir' },
  { id: 'qibla', icon: 'explore', label: 'Kiblat' },
  { id: 'mosque', icon: 'mosque', label: 'Cari Masjid' },
  { id: 'doa', icon: 'volunteer_activism', label: 'Doa Harian' },
  { id: 'quran', icon: 'menu_book', label: 'Al-Qur\'an' },
]

function getNextPrayer(prayerTimes) {
  if (!prayerTimes) return null

  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const validPrayers = prayerTimes.filter(p => p.name !== 'Terbit')

  for (const prayer of validPrayers) {
    const [hh, mm] = prayer.time.split(':').map(Number)
    const prayerMinutes = hh * 60 + mm
    if (prayerMinutes > currentMinutes) {
      const diff = prayerMinutes - currentMinutes
      const hours = Math.floor(diff / 60)
      const mins = diff % 60
      const timeStr = formatTime12h(hh, mm)
      return { ...prayer, timeFormatted: timeStr, countdown: `${hours > 0 ? hours + 'j ' : ''}${mins}m` }
    }
  }

  // All prayers passed today, next is tomorrow's first prayer
  const first = validPrayers[0]
  if (first) {
    const [hh, mm] = first.time.split(':').map(Number)
    return { ...first, timeFormatted: formatTime12h(hh, mm), countdown: 'Besok' }
  }
  return null
}

function formatTime12h(hh, mm) {
  const ampm = hh >= 12 ? 'PM' : 'AM'
  const h12 = hh % 12 || 12
  return { time: `${String(h12).padStart(2, '0')}:${String(mm).padStart(2, '0')}`, ampm }
}

export default function Sidebar() {
  const { activeTab, setActiveTab, darkMode, toggleDarkMode, prayerTimes } = useApp()
  const [nextPrayer, setNextPrayer] = useState(null)

  useEffect(() => {
    const update = () => setNextPrayer(getNextPrayer(prayerTimes))
    update()
    const interval = setInterval(update, 30000) // Update every 30s
    return () => clearInterval(interval)
  }, [prayerTimes])

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className={`sidebar-desktop w-20 lg:w-64 backdrop-blur-md border-r flex flex-col items-center lg:items-stretch py-8 z-20 h-screen transition-all duration-300 ${
        darkMode
          ? 'bg-[#0c1a18]/90 border-white/5'
          : 'bg-white/80 border-slate-200'
      }`}>
        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-start lg:px-6 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30 overflow-hidden">
            <img src="/icon.png" alt="SholatKu" className="w-8 h-8 object-contain" />
          </div>
          <h1 className={`hidden lg:block ml-3 text-xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-800'
          }`}>
            Sholat<span className="text-primary">Ku</span>
          </h1>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 w-full space-y-1.5 px-2 lg:px-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? darkMode
                    ? 'bg-primary/15 text-primary border border-primary/20'
                    : 'bg-primary/10 text-primary border border-primary/15'
                  : darkMode
                    ? 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-transparent'
              }`}
            >
              <span className="material-icons">{item.icon}</span>
              <span className="hidden lg:block ml-3">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Pengaturan */}
        <div className="px-2 lg:px-4 mt-auto space-y-1.5">
          <button
            onClick={toggleDarkMode}
            className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 ${
              darkMode
                ? 'text-slate-400 hover:bg-white/5 hover:text-white'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <span className="material-icons">{darkMode ? 'light_mode' : 'dark_mode'}</span>
            <span className="hidden lg:block ml-3">{darkMode ? 'Mode Terang' : 'Mode Gelap'}</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center p-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'settings'
                ? darkMode
                  ? 'bg-primary/15 text-primary border border-primary/20'
                  : 'bg-primary/10 text-primary border border-primary/15'
                : darkMode
                  ? 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-transparent'
            }`}
          >
            <span className="material-icons">settings</span>
            <span className="hidden lg:block ml-3">Setelan</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center p-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'profile'
                ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <span className="material-icons">account_circle</span>
            <span className="hidden lg:block ml-3">Profil Saya</span>
          </button>
        </div>

        {/* Next Prayer Card — Glass Clay */}
        {nextPrayer && (
          <div className="px-2 lg:px-6 mt-6">
            <div className={`p-3 lg:p-4 rounded-2xl relative overflow-hidden group transition-all duration-300 ${
              darkMode ? 'glass-clay-dark' : 'glass-clay-light'
            }`}>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                darkMode ? 'bg-gradient-to-r from-primary/10 to-transparent' : 'bg-gradient-to-r from-primary/5 to-transparent'
              }`}></div>
              <div className="relative z-10 flex flex-col items-center lg:items-start">
                <p className={`hidden lg:block text-[10px] uppercase tracking-wider mb-1 font-bold ${
                  darkMode ? 'text-amber-400' : 'text-amber-600'
                }`}>Sholat Berikutnya</p>
                <span className="lg:hidden material-icons text-primary text-xl mb-1">schedule</span>
                <h3 className={`hidden lg:block text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {nextPrayer.name}
                </h3>
                <p className={`hidden lg:block text-2xl font-light mt-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {nextPrayer.timeFormatted.time} <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-slate-400'}`}>{nextPrayer.timeFormatted.ampm}</span>
                </p>
                <p className={`text-[10px] lg:text-xs mt-1 lg:mt-2 flex items-center gap-1 ${
                  darkMode ? 'text-white/50' : 'text-slate-400'
                }`}>
                  <span className="material-icons text-[12px] lg:text-[14px]">schedule</span>
                  {nextPrayer.countdown}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

    </>
  )
}
