import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

export default function NotificationRequest() {
  const [show, setShow] = useState(false)
  const { notificationsEnabled, setNotificationsEnabled, setImsakNotifEnabled } = useApp()

  useEffect(() => {
    // Don't show if already enabled in app settings
    if (notificationsEnabled) return
    // Don't show if browser explicitly denied
    if ('Notification' in window && Notification.permission === 'denied') return
    // Show after short delay
    const timer = setTimeout(() => setShow(true), 1000)
    return () => clearTimeout(timer)
  }, [notificationsEnabled])

  const handleEnable = async () => {
    setShow(false)
    if (!('Notification' in window)) return
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      setNotificationsEnabled(true)
      setImsakNotifEnabled(true)
    }
  }

  const handleDismiss = () => {
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed top-4 left-0 right-0 z-[60] flex justify-center px-4 animate-slide-down">
      <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-xl bg-white dark:bg-slate-800 p-4 shadow-xl border border-slate-100 dark:border-white/10 ring-1 ring-black/5">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-icons">notifications_active</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Notifikasi Sholat & Sahur?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Aktifkan pengingat ibadah otomatis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDismiss}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Tutup"
          >
            <span className="material-icons text-lg">close</span>
          </button>
          <button
            onClick={handleEnable}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-primary/20 hover:bg-emerald-600 transition-colors"
          >
            Aktifkan
          </button>
        </div>
      </div>
    </div>
  )
}
