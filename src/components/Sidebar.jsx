import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

const navItems = [
  { id: 'home', icon: 'dashboard', label: 'Beranda' },
  { id: 'schedule', icon: 'calendar_today', label: 'Jadwal' },
  { id: 'ramadhan', icon: 'auto_awesome', label: 'Misi Ramadhan' },
  { id: 'tasbih', icon: 'radio_button_checked', label: 'Tasbih & Dzikir' },
  { id: 'qibla', icon: 'explore', label: 'Kiblat' },
  { id: 'doa', icon: 'menu_book', label: 'Doa & Al-Qur`an' },
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
      <aside className="sidebar-desktop w-20 lg:w-64 bg-white/80 dark:bg-[#0c1a18]/90 backdrop-blur-md border-r border-slate-200 dark:border-white/5 flex flex-col items-center lg:items-stretch py-8 z-20 h-screen transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-start lg:px-6 mb-12">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30 overflow-hidden">
            <img src="/icon.png" alt="SholatKu" className="w-8 h-8 object-contain" />
          </div>
          <h1 className="hidden lg:block ml-3 text-xl font-bold tracking-tight text-slate-800 dark:text-white">
            Sholat<span className="text-primary">Ku</span>
          </h1>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 w-full space-y-2 px-2 lg:px-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <span className="material-icons">{item.icon}</span>
              <span className="hidden lg:block ml-3">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Pengaturan */}
        <div className="px-2 lg:px-4 mt-auto space-y-2">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center p-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white transition-all duration-200"
          >
            <span className="material-icons">{darkMode ? 'light_mode' : 'dark_mode'}</span>
            <span className="hidden lg:block ml-3">{darkMode ? 'Mode Terang' : 'Mode Gelap'}</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center p-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'settings'
                ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <span className="material-icons">settings</span>
            <span className="hidden lg:block ml-3">Setelan</span>
          </button>
        </div>

        {/* Next Prayer Card */}
        {nextPrayer && (
          <div className="px-2 lg:px-6 mt-6">
            <div className="glass-panel p-3 lg:p-4 rounded-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col items-center lg:items-start">
                <p className="hidden lg:block text-[10px] text-amber-400 uppercase tracking-wider mb-1 font-semibold">Sholat Berikutnya</p>
                <span className="lg:hidden material-icons text-primary text-xl mb-1">schedule</span>
                <h3 className="hidden lg:block text-lg font-bold text-slate-800 dark:text-white">{nextPrayer.name}</h3>
                <p className="hidden lg:block text-2xl font-light text-slate-800 dark:text-white mt-1">
                  {nextPrayer.timeFormatted.time} <span className="text-sm text-slate-400 dark:text-white/60">{nextPrayer.timeFormatted.ampm}</span>
                </p>
                <p className="text-[10px] lg:text-xs text-slate-400 dark:text-white/50 mt-1 lg:mt-2 flex items-center gap-1">
                  <span className="material-icons text-[12px] lg:text-[14px]">schedule</span>
                  {nextPrayer.countdown}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Tab Bar Mobile */}
      <nav className="bottom-tab-mobile fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0c1a18]/95 backdrop-blur-md border-t border-slate-200 dark:border-white/5">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 min-w-[56px] ${
                activeTab === item.id
                  ? 'text-primary bg-primary/10'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <span className={`material-icons text-2xl ${activeTab === item.id ? 'scale-110' : ''} transition-transform`}>
                {item.icon}
              </span>
              <span className={`text-[10px] mt-0.5 font-semibold ${activeTab === item.id ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
