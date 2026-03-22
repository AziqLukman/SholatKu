import React, { useState, useEffect } from 'react'

export default function InstallPWA() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [platform, setPlatform] = useState('desktop')
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    // Already installed? Skip entirely
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone ||
                         document.referrer.includes('android-app://')
    if (isStandalone) return

    const userAgent = window.navigator.userAgent.toLowerCase()

    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios')
      // iOS: show guide after delay
      setTimeout(() => setShowPrompt(true), 2000)
      return
    }

    if (/android/.test(userAgent)) setPlatform('android')
    else setPlatform('desktop')

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => setShowPrompt(false)

  if (!showPrompt) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6 sm:items-center sm:pb-0">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleDismiss}></div>
      <div className="relative rounded-2xl bg-white dark:bg-slate-800 shadow-2xl sm:w-full sm:max-w-md animate-slide-up">
        <div className="absolute top-3 right-3">
          <button onClick={handleDismiss} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <span className="material-icons text-xl">close</span>
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span className="material-icons text-2xl">{platform === 'ios' ? 'ios_share' : 'install_mobile'}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Install Aplikasi</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Nikmati akses lebih cepat, layar penuh, dan fitur offline. 100% Aman & Ringan.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-700/50 p-4 border border-slate-100 dark:border-slate-700">
            {platform === 'ios' ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-600 text-xs font-bold">1</span>
                  <span>Tekan tombol <strong>Share</strong> <span className="material-icons text-sm align-middle mx-1">ios_share</span> di bar kanan atas</span>
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-600/50"></div>
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-600 text-xs font-bold">2</span>
                  <span>Pilih <strong>Add to Home Screen</strong> <span className="material-icons text-sm align-middle mx-1">add_box</span></span>
                </div>
              </div>
            ) : (
              <button
                onClick={handleInstallClick}
                className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white shadow-lg hover:bg-emerald-600 active:scale-95 transition-all flex justify-center items-center gap-2"
              >
                <span className="material-icons text-lg">download</span>
                Install Sekarang
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
