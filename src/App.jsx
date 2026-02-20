import React, { useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { useGeolocation } from './hooks/useGeolocation'
import { usePrayerTimes } from './hooks/usePrayerTimes'
import { checkPrayerNotification, syncPrayerTimesToSW, subscribeToPush } from './utils/notifications'
import Sidebar from './components/Sidebar'
import BagianUtama from './components/BagianUtama'
import ListSholat from './components/ListSholat'
import Jadwal from './components/Jadwal'
import Kiblat from './components/Kiblat'
import Doa from './components/Doa'
import Setelan from './components/Setelan'
import RamadhanTracker from './components/RamadhanTracker'
import Tasbih from './components/Tasbih'

function AppContent() {
  const {
    activeTab, toggleDarkMode, setActiveTab,
    location, setLocation,
    setPrayerTimes, setHijriDate,
    setLoading, loading,
    prayerTimes, notificationsEnabled,
    imsakNotifEnabled,
    darkMode,
  } = useApp()

  // Geolokasi
  const geo = useGeolocation()

  useEffect(() => {
    if (geo.position && !geo.loading) {
      setLocation(geo.position)
    }
  }, [geo.position, geo.loading])

  // Waktu sholat
  const { prayerTimes: fetchedTimes, hijri, loading: apiLoading } = usePrayerTimes(location.lat, location.lng)

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
          <div className="space-y-8">
            <BagianUtama />
            <ListSholat />
            {/* Kutipan */}
            <div className="glass-panel rounded-lg p-6 flex items-start space-x-4 max-w-2xl mx-auto">
              <span className="material-icons text-primary/50 text-4xl">format_quote</span>
              <div>
                <p className="text-slate-600 dark:text-slate-300 italic mb-2 text-lg leading-relaxed">
                  "Sesungguhnya sholat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman."
                </p>
                <p className="text-sm text-primary font-medium">— QS. An-Nisa: 103</p>
              </div>
            </div>
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
      case 'doa':
        return <Doa />
      case 'settings':
        return <Setelan />
      default:
        return null
    }
  }

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display min-h-screen flex overflow-hidden dark-transition">
        {/* Motif Islami */}
        <div className="fixed inset-0 bg-islamic-pattern pointer-events-none z-0"></div>

        {/* Sidebar */}
        <Sidebar />

        {/* Konten Utama */}
        <main className="flex-1 relative z-10 overflow-y-auto h-screen p-4 lg:p-8 pb-24 lg:pb-8">
          {/* Header Mobile */}
          <header className="flex justify-between items-center mb-8 lg:hidden">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Sholat<span className="text-primary">Ku</span>
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('settings')}
                className="p-2 rounded-lg bg-white/80 dark:bg-white/10 text-slate-600 dark:text-white"
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
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <p className="text-slate-400 text-sm">Memuat jadwal sholat...</p>
              </div>
            ) : (
              <div key={activeTab} className="tab-content-enter">
                {renderContent()}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
