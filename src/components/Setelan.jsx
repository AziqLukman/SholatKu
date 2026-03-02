import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { requestNotificationPermission } from '../utils/notifications'
import { resolveIndonesiaLocation } from '../data/indonesiaLocations'
import Changelog from './Changelog'

export default function Setelan() {
  const {
    activeTab, setActiveTab,
    darkMode, toggleDarkMode,
    location, setLocation,
    favorites, addFavorite, removeFavorite,
    notificationsEnabled, setNotificationsEnabled,
    imsakNotifEnabled, setImsakNotifEnabled,
    haidMode, setHaidMode,
    ramadhanStartDate, setRamadhanStartDate,
  } = useApp()

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showChangelog, setShowChangelog] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setSearching(true)
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=5&accept-language=id&addressdetails=1&countrycodes=`
      )
      const data = await res.json()
      const results = []
      for (const r of data) {
        const loc = {
          lat: parseFloat(r.lat),
          lng: parseFloat(r.lon),
          city: r.display_name.split(',').slice(0, 3).join(',').trim(),
          provinsi: null,
          kabkota: null,
        }
        // Resolve Indonesia location for equran.id API
        if (r.address) {
          const idLoc = await resolveIndonesiaLocation(r.address)
          if (idLoc) {
            loc.provinsi = idLoc.provinsi
            loc.kabkota = idLoc.kabkota
          }
        }
        results.push(loc)
      }
      setSearchResults(results)
    } catch {
      setSearchResults([])
    }
    setSearching(false)
  }

  const selectLocation = (loc) => {
    setLocation(loc)
    setShowSearch(false)
    setSearchQuery('')
    setSearchResults([])
  }

  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) {
      const perm = await requestNotificationPermission()
      if (perm === 'granted') {
        setNotificationsEnabled(true)
      }
    } else {
      setNotificationsEnabled(false)
    }
  }

  const handleToggleImsakNotif = async () => {
    if (!imsakNotifEnabled) {
      const perm = await requestNotificationPermission()
      if (perm === 'granted') {
        setImsakNotifEnabled(true)
      }
    } else {
      setImsakNotifEnabled(false)
    }
  }

  const handleTestNotification = async () => {
    const perm = await requestNotificationPermission()
    if (perm === 'granted') {
      sendNotification(
        '🕌 Test Notifikasi SholatKu',
        'Notifikasi berhasil! Kamu akan menerima notif saat waktu sholat tiba. ✅'
      )
    } else {
      alert('Izin notifikasi ditolak. Aktifkan di pengaturan browser.')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Setelan</h2>

      {/* Tampilan */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Tampilan</h3>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 divide-y divide-slate-100 dark:divide-white/5">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <span className="material-icons text-slate-500 dark:text-slate-400">{darkMode ? 'dark_mode' : 'light_mode'}</span>
              <span className="text-slate-800 dark:text-white font-medium">Mode Gelap</span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-primary' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${darkMode ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Notifikasi */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Notifikasi</h3>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 divide-y divide-slate-100 dark:divide-white/5">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <span className="material-icons text-slate-500 dark:text-slate-400">notifications</span>
              <div>
                <span className="text-slate-800 dark:text-white font-medium">Notifikasi Sholat</span>
                <p className="text-xs text-slate-400 mt-0.5">Pengingat saat masuk waktu sholat</p>
              </div>
            </div>
            <button
              onClick={handleToggleNotifications}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${notificationsEnabled ? 'bg-primary' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${notificationsEnabled ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <span className="material-icons text-slate-500 dark:text-slate-400">restaurant</span>
              <div>
                <span className="text-slate-800 dark:text-white font-medium">Notifikasi Imsak & Sahur</span>
                <p className="text-xs text-slate-400 mt-0.5">Peringatan sahur & waktu imsak</p>
              </div>
            </div>
            <button
              onClick={handleToggleImsakNotif}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${imsakNotifEnabled ? 'bg-primary' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${imsakNotifEnabled ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mode Haid */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Mode Khusus</h3>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-rose-200 dark:border-rose-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-500/10 dark:to-pink-500/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center">
                  <span className="text-lg">🌸</span>
                </div>
                <div>
                  <span className="text-slate-800 dark:text-white font-medium block">Mode Haid</span>
                  <p className="text-xs text-rose-500 dark:text-rose-400 mt-0.5">Untuk menjaga streak saat berhalangan</p>
                </div>
              </div>
              <button
                onClick={() => setHaidMode(!haidMode)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${haidMode ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-600'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${haidMode ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
          {haidMode && (
            <div className="p-4 border-t border-rose-100 dark:border-rose-500/10 animate-fade-in">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Misi sholat & puasa disembunyikan. Misi yang tersedia:</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                  <span className="material-icons text-xs">spa</span> Dzikir Pagi
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                  <span className="material-icons text-xs">psychology</span> Dzikir Petang
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                  <span className="material-icons text-xs">volunteer_activism</span> Sedekah
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ramadhan Settings */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Ramadhan</h3>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-emerald-200 dark:border-emerald-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <span className="text-lg">🌙</span>
              </div>
              <div>
                <span className="text-slate-800 dark:text-white font-medium block">Awal Ramadhan {new Date().getFullYear() - 579} H</span>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Sesuaikan dengan penetapan organisasi Anda</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setRamadhanStartDate(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  !ramadhanStartDate
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                    : 'bg-white/80 dark:bg-white/10 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-emerald-300'
                }`}
              >
                <span className="flex items-center gap-1">
                  <span className="material-icons text-xs">auto_awesome</span>
                  Auto (API)
                </span>
              </button>
            </div>
          </div>
          {/* Custom date input */}
          <div className="p-4 border-t border-emerald-100 dark:border-emerald-500/10">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">Atau pilih tanggal kustom:</p>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={ramadhanStartDate || ''}
                onChange={(e) => setRamadhanStartDate(e.target.value || null)}
                className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
              {ramadhanStartDate && (
                <button
                  onClick={() => setRamadhanStartDate(null)}
                  className="px-2 py-1.5 text-xs text-red-400 hover:text-red-500 font-medium"
                >
                  Reset
                </button>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              {ramadhanStartDate
                ? `✅ Ramadhan dimulai: ${new Date(ramadhanStartDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`
                : '🔄 Menggunakan deteksi otomatis dari API'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Lokasi */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Lokasi</h3>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-icons text-primary">location_on</span>
              <div>
                <p className="text-slate-800 dark:text-white font-medium">{location.city}</p>
                <p className="text-xs text-slate-400 font-mono">{location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°</p>
              </div>
            </div>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-sm text-primary font-medium hover:underline"
            >
              Ubah
            </button>
          </div>

          {showSearch && (
            <div className="p-4 border-t border-slate-100 dark:border-white/5 space-y-3 animate-fade-in">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cari kota..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 px-4 py-2 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg text-slate-800 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleSearch}
                  disabled={searching}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {searching ? '...' : 'Cari'}
                </button>
              </div>
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  {searchResults.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => selectLocation(r)}
                      className="w-full text-left p-3 rounded-lg bg-slate-50 dark:bg-white/5 hover:bg-primary/10 transition-colors flex items-center gap-2"
                    >
                      <span className="material-icons text-sm text-slate-400">place</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{r.city}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lokasi Favorit */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Lokasi Favorit</h3>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 divide-y divide-slate-100 dark:divide-white/5">
          {favorites.length === 0 ? (
            <div className="p-4 text-center text-slate-400 text-sm">
              Belum ada lokasi favorit
            </div>
          ) : (
            favorites.map((fav, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="material-icons text-accent-gold text-lg">star</span>
                  <span className="text-slate-700 dark:text-slate-300 text-sm">{fav.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLocation(fav)}
                    className="text-xs text-primary font-medium hover:underline"
                  >
                    Pilih
                  </button>
                  <button
                    onClick={() => removeFavorite(fav)}
                    className="text-xs text-red-400 hover:text-red-500"
                  >
                    <span className="material-icons text-sm">close</span>
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="p-3">
            <button
              onClick={() => addFavorite(location)}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors"
            >
              <span className="material-icons text-sm">add</span>
              Simpan lokasi saat ini
            </button>
          </div>
        </div>
      </div>

      {/* Tentang */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Tentang Aplikasi</h3>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 divide-y divide-slate-100 dark:divide-white/5 overflow-hidden">
          <button
            onClick={() => setShowChangelog(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <span className="material-icons">info</span>
              </div>
              <div>
                <span className="text-slate-800 dark:text-white font-medium block">Versi 1.6.0</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Lihat apa yang baru</span>
              </div>
            </div>
            <span className="material-icons text-slate-400">chevron_right</span>
          </button>
        </div>
      </div>
      
      {/* Footer text */}
      <div className="text-center text-xs text-slate-400 space-y-1 pb-4">
        <p>SholatKu v1.6.0 — Jadwal Sholat by Ajekkk</p>
        <p>Data dari <a href="https://equran.id" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">EQuran.id</a> (Kemenag RI)</p>
      </div>

      {/* Modal Changelog Popup */}
      {showChangelog && <Changelog onClose={() => setShowChangelog(false)} />}
    </div>
  )
}
