import React, { useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import { useGeolocation } from './hooks/useGeolocation'
import { usePrayerTimes } from './hooks/usePrayerTimes'
import { checkPrayerNotification, syncPrayerTimesToSW, subscribeToPush } from './utils/notifications'
import Sidebar from './components/Sidebar'
import BagianUtama from './components/BagianUtama'
import ListSholat from './components/ListSholat'
import Jadwal from './components/Jadwal'
import Kiblat from './components/Kiblat'
import Doa from './components/Doa'
import Quran from './components/Quran'
import Setelan from './components/Setelan'
import RamadhanTracker from './components/RamadhanTracker'
import Tasbih from './components/Tasbih'
import InstallPWA from './components/InstallPWA'
import NotificationRequest from './components/NotificationRequest'
import NotificationPopup from './components/NotificationPopup'
import AiAssistant from './components/AiAssistant'
import Changelog from './components/Changelog'
import ProfileTab from './components/ProfileTab'
import MasjidTerdekat from './components/MasjidTerdekat'

function AppContent() {

  const {
    activeTab, toggleDarkMode, setActiveTab,
    location, setLocation,
    setPrayerTimes, setHijriDate,
    setLoading, loading,
    prayerTimes, notificationsEnabled,
    imsakNotifEnabled,
    darkMode,
    setAiOpen,
  } = useApp()

  // Geolokasi
  const geo = useGeolocation()

  useEffect(() => {
    if (geo.position && !geo.loading) {
      setLocation(geo.position)
    }
  }, [geo.position, geo.loading])

  // Waktu sholat
  const { prayerTimes: fetchedTimes, hijri, loading: apiLoading } = usePrayerTimes(location)

  useEffect(() => {
    if (fetchedTimes) {
      setPrayerTimes(fetchedTimes)
      setHijriDate(hijri)
      setLoading(false)
    }
  }, [fetchedTimes, hijri])

  // Cek notifikasi: langsung saat load + tiap 15 detik (fallback saat tab aktif)
  useEffect(() => {
    checkPrayerNotification(prayerTimes, notificationsEnabled, imsakNotifEnabled)

    const interval = setInterval(() => {
      checkPrayerNotification(prayerTimes, notificationsEnabled, imsakNotifEnabled)
    }, 15000)
    return () => clearInterval(interval)
  }, [prayerTimes, notificationsEnabled, imsakNotifEnabled])

  // Sync data ke Service Worker (fallback background)
  useEffect(() => {
    if (prayerTimes) {
      const syncToSW = () => {
        syncPrayerTimesToSW(prayerTimes, notificationsEnabled, imsakNotifEnabled)
      }
      syncToSW()
      if (navigator.serviceWorker) {
        navigator.serviceWorker.ready.then(() => setTimeout(syncToSW, 1000))
      }
    }
  }, [prayerTimes, notificationsEnabled, imsakNotifEnabled])

  // Subscribe ke Push Server agar notif muncul TANPA app dibuka
  useEffect(() => {
    if (prayerTimes && (notificationsEnabled || imsakNotifEnabled)) {
      // Tunggu SW ready dulu baru subscribe
      navigator.serviceWorker?.ready.then(() => {
        subscribeToPush(location.lat, location.lng, notificationsEnabled, imsakNotifEnabled)
      })
    }
  }, [prayerTimes, notificationsEnabled, imsakNotifEnabled, location])

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <BagianUtama />
          </div>
        )
      case 'schedule':
        return <Jadwal />
      case 'ramadhan':
        return <RamadhanTracker />
      case 'tasbih':
        return <Tasbih />
      case 'qibla':
        return <Kiblat />
      case 'mosque':
        return <MasjidTerdekat />
      case 'doa':
        return <Doa />
      case 'quran':
        return <Quran />
      case 'settings':
        return <Setelan />
      case 'profile':
        return <ProfileTab />
      default:
        return null
    }
  }

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className={`font-sans min-h-screen flex overflow-hidden dark-transition ${
        darkMode ? 'bg-[#0B1B18] text-slate-100' : 'bg-[#fafafa] text-slate-800'
      }`}>

        {/* Motif Islami */}
        <div className="fixed inset-0 bg-islamic-pattern pointer-events-none z-0"></div>

        {/* Floating Ambient Blur Shapes (Softer) */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div
            className={`absolute rounded-full filter blur-[140px] opacity-30 animate-float-organic-1 transition-all duration-1000 ${
              darkMode
                ? 'bg-[#0d968b] w-[500px] h-[500px] top-[-15%] left-[-15%]'
                : 'bg-[#0d968b] w-[450px] h-[450px] top-[-10%] left-[-10%]'
            }`}
          ></div>
          <div
            className={`absolute rounded-full filter blur-[150px] opacity-25 animate-float-organic-2 transition-all duration-1000 ${
              darkMode
                ? 'bg-[#d97706] w-[450px] h-[450px] bottom-[10%] right-[-15%]'
                : 'bg-[#eab308] w-[400px] h-[400px] bottom-[5%] right-[-10%]'
            }`}
          ></div>
        </div>

        {/* Sidebar */}
        <Sidebar />

        {/* Konten Utama */}
        <main className="flex-1 relative z-10 overflow-y-auto h-screen p-4 lg:p-8 pb-32 lg:pb-8">
          {/* Header Mobile */}
          <header className="flex justify-between items-center mb-8 lg:hidden">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Sholat<span className="text-primary">Ku</span>
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('profile')}
                className="p-2 rounded-lg bg-white/80 dark:bg-white/10 text-slate-600 dark:text-white flex items-center justify-center"
                aria-label="Buka Profil"
              >
                <span className="material-icons">account_circle</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className="p-2 rounded-lg bg-white/80 dark:bg-white/10 text-slate-600 dark:text-white flex items-center justify-center"
                aria-label="Buka Setelan"
              >
                <span className="material-icons">settings</span>
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-white/80 dark:bg-white/10 text-slate-600 dark:text-white"
                aria-label="Ubah mode tampilan"
              >
                <span className="material-icons">
                  {darkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            </div>
          </header>

          <div className="max-w-4xl mx-auto">
            {loading ? (
              <JadwalSkeleton darkMode={darkMode} />
            ) : (
              <div key={activeTab} className="tab-content-enter">
                {renderContent()}
              </div>
            )}
          </div>
        </main>

        {/* ELEGANT FLOATING BOTTOM NAVIGATION */}
        <div id="bottom-nav" className="fixed bottom-6 left-4 right-4 z-50 lg:hidden">
          <div className={`relative flex items-center justify-evenly h-[68px] px-2 rounded-3xl max-w-md mx-auto transition-colors duration-300 ${
            darkMode ? 'elegant-card-dark' : 'elegant-card-light'
          }`}>
            <button onClick={() => setActiveTab('home')} className={`p-1 flex flex-col items-center transition-colors duration-300 ${activeTab === 'home' ? 'text-primary' : darkMode ? 'text-slate-400' : 'text-slate-500 hover:text-slate-700'}`}>
              <span className="material-icons text-[24px]">home</span>
              <span className="text-[10px] font-medium mt-0.5">Home</span>
            </button>

            <button onClick={() => setActiveTab('schedule')} className={`p-1 flex flex-col items-center transition-colors duration-300 ${activeTab === 'schedule' ? 'text-primary' : darkMode ? 'text-slate-400' : 'text-slate-500 hover:text-slate-700'}`}>
              <span className="material-icons text-[24px]">calendar_today</span>
              <span className="text-[10px] font-medium mt-0.5">Jadwal</span>
            </button>

            {/* Center Soft AI Trigger - Custom Microphone Silhouette Button Container */}
            <div className="relative flex flex-col items-center mx-1 group">
              {/* Soft ambient glowing voice waves behind the mic shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-gradient-to-tr from-[#0d968b]/30 to-emerald-400/30 blur-md animate-pulse pointer-events-none group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[56px] h-[56px] rounded-full bg-[#0d968b]/10 blur-xl animate-ping [animation-duration:3.5s] pointer-events-none"></div>

              <button
                onClick={() => setAiOpen('half')}
                className="relative w-[64px] h-[64px] flex items-center justify-center bg-transparent transition-all duration-300 active:scale-90 hover:scale-105 z-10"
                title="Tanya AI SholatKu"
              >
                {/* Microphone Shape Vector filled with SholatKu signature green gradient */}
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 64 64" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[64px] h-[64px] drop-shadow-[0_4px_10px_rgba(13,150,139,0.35)] transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105"
                >
                  <defs>
                    <linearGradient id="micGreenGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0d968b" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>

                  {/* 1. U-shaped Microphone Stand (Green Gradient) */}
                  <path 
                    d="M 16 28 C 16 44 48 44 48 28" 
                    stroke="url(#micGreenGradient)" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    fill="none"
                  />

                  {/* 2. Vertical Pole/Shaft (Green Gradient) */}
                  <line 
                    x1="32" 
                    y1="42" 
                    x2="32" 
                    y2="56" 
                    stroke="url(#micGreenGradient)" 
                    strokeWidth="4.5" 
                    strokeLinecap="round" 
                  />

                  {/* 3. Horizontal Base Stand (Green Gradient) */}
                  <line 
                    x1="22" 
                    y1="56" 
                    x2="42" 
                    y2="56" 
                    stroke="url(#micGreenGradient)" 
                    strokeWidth="4.5" 
                    strokeLinecap="round" 
                  />

                  {/* 4. Main Microphone Capsule / Robot Head (Green Gradient) */}
                  <rect 
                    x="21.5" 
                    y="14" 
                    width="21" 
                    height="26" 
                    rx="10.5" 
                    fill="url(#micGreenGradient)" 
                  />

                  {/* 5. White Robot & Headphone Face Details (Overlay) */}
                  {/* Headphone ear-cups on left and right */}
                  <rect x="18" y="22" width="3" height="8" rx="1.5" fill="white" className="opacity-95" />
                  <rect x="43" y="22" width="3" height="8" rx="1.5" fill="white" className="opacity-95" />
                  
                  {/* Headphone arch over the head */}
                  <path 
                    d="M 21.5 23 C 21.5 17 42.5 17 42.5 23" 
                    stroke="white" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    fill="none"
                    className="opacity-90"
                  />

                  {/* Glowing Eyes */}
                  <circle 
                    cx="28" 
                    cy="25" 
                    r="2" 
                    fill="white" 
                    className="animate-pulse [animation-duration:1.5s]"
                  />
                  <circle 
                    cx="36" 
                    cy="25" 
                    r="2" 
                    fill="white" 
                    className="animate-pulse [animation-duration:1.5s]"
                  />

                  {/* Cute Digital Line Mouth */}
                  <rect 
                    x="29" 
                    y="31" 
                    width="6" 
                    height="1.5" 
                    rx="0.75" 
                    fill="white" 
                  />

                  {/* Robot Antenna on top with gold breathing glow bulb */}
                  <line x1="32" y1="14" x2="32" y2="10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="32" cy="9.5" r="1.2" fill="#eab308" className="animate-pulse" />
                </svg>
              </button>
            </div>

            <button onClick={() => setActiveTab('doa')} className={`p-1 flex flex-col items-center transition-colors duration-300 ${activeTab === 'doa' ? 'text-primary' : darkMode ? 'text-slate-400' : 'text-slate-500 hover:text-slate-700'}`}>
              <span className="material-icons text-[24px]">volunteer_activism</span>
              <span className="text-[10px] font-medium mt-0.5">Doa</span>
            </button>

            <button onClick={() => setActiveTab('quran')} className={`p-1 flex flex-col items-center transition-colors duration-300 ${activeTab === 'quran' ? 'text-primary' : darkMode ? 'text-slate-400' : 'text-slate-500 hover:text-slate-700'}`}>
              <span className="material-icons text-[24px]">menu_book</span>
              <span className="text-[10px] font-medium mt-0.5">Quran</span>
            </button>
          </div>
        </div>

      </div>
      <InstallPWA />
      <NotificationRequest />
      <AiAssistant />
      <NotificationPopup />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  )
}

function JadwalSkeleton({ darkMode }) {
  const containerBg = darkMode ? 'bg-slate-900/60 border-white/10' : 'bg-slate-100/80 border-slate-200/60 shadow-sm'
  const pulseBg = darkMode ? 'bg-white/15' : 'bg-slate-300/60'

  return (
    <div className="space-y-6 animate-pulse font-sans pb-32">
      {/* Skeleton Hero Card */}
      <div className={`p-6 rounded-[2rem] border ${containerBg}`}>
        <div className="flex items-center gap-6">
          <div className={`w-24 h-24 rounded-2xl shrink-0 ${pulseBg}`}></div>
          <div className="flex-1 space-y-3">
            <div className={`h-6 w-2/3 rounded-lg ${pulseBg}`}></div>
            <div className={`h-4 w-1/2 rounded-lg ${pulseBg}`}></div>
            <div className={`h-5 w-1/3 rounded-full ${pulseBg}`}></div>
          </div>
        </div>
      </div>

      {/* Skeleton Greeting */}
      <div className={`p-4 rounded-3xl border flex items-center gap-4 ${containerBg}`}>
        <div className={`w-12 h-12 rounded-2xl shrink-0 ${pulseBg}`}></div>
        <div className="flex-1 space-y-2">
          <div className={`h-4 w-1/3 rounded-lg ${pulseBg}`}></div>
          <div className={`h-3 w-1/2 rounded-lg ${pulseBg}`}></div>
        </div>
      </div>

      {/* Skeleton Grid Sholat */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className={`p-5 rounded-3xl border flex flex-col justify-between h-[130px] ${containerBg}`}>
            <div className="space-y-2.5">
              <div className={`h-4 w-1/2 rounded-lg ${pulseBg}`}></div>
              <div className={`h-7 w-2/3 rounded-xl ${pulseBg}`}></div>
            </div>
            <div className={`h-3 w-3/4 rounded-lg mt-4 ${pulseBg}`}></div>
          </div>
        ))}
      </div>
    </div>
  )
}


