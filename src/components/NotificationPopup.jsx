import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { stopAdzan } from '../utils/notifications'

export default function NotificationPopup() {
  const { darkMode, setActiveTab } = useApp()
  const [notifData, setNotifData] = useState(null)

  useEffect(() => {
    // 1. Cek parameter URL kalau app baru dibuka dari notif
    const params = new URLSearchParams(window.location.search)
    const title = params.get('notif_title')
    const body = params.get('notif_body')
    
    if (title || body) {
      setNotifData({ title, body })
      stopAdzan() // Matiin adzan saat notif diklik
      // Bersihkan URL biar nggak muncul terus kalau di-refresh
      window.history.replaceState({}, document.title, '/')
    }

    // 2. Dengerin pesan dari Service Worker kalau app udah kebuka
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'NOTIF_CLICKED') {
        setNotifData({
          title: event.data.title,
          body: event.data.body
        })
        stopAdzan() // Matiin adzan saat notif diklik
      }
    }
    
    navigator.serviceWorker?.addEventListener('message', handleMessage)
    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleMessage)
    }
  }, [])

  if (!notifData) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setNotifData(null)}
      ></div>
      
      <div className={`relative w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-slide-up text-center border ${
        darkMode ? 'bg-[#0f211f] border-emerald-900/40' : 'bg-white border-slate-200'
      }`}>
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-tr from-primary to-emerald-400 shadow-lg shadow-primary/30`}>
          <span className="material-icons text-white text-3xl">notifications_active</span>
        </div>
        
        <h3 className={`text-xl font-black mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          {notifData.title}
        </h3>
        
        <p className={`text-sm mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {notifData.body}
        </p>
        
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={() => {
              setNotifData(null)
              setActiveTab('mosque')
            }}
            className={`w-full py-3.5 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
              darkMode
                ? 'bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10'
                : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
            }`}
          >
            <span className="material-icons text-[18px]">mosque</span>
            Cari Masjid Terdekat
          </button>
          <button
            onClick={() => setNotifData(null)}
            className={`w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95 bg-primary shadow-md shadow-primary/30 hover:bg-primary-dark`}
          >
            Tutup & Lanjutkan
          </button>
        </div>
      </div>
    </div>
  )
}
