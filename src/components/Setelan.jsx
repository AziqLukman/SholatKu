import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { requestNotificationPermission, sendNotification, playAdzan } from '../utils/notifications'
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

  const handleTestAdzan = () => {
    playAdzan()
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
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="material-icons text-primary text-2xl">settings</span>
          <h2 className={`font-heading text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>Setelan</h2>
        </div>
        <p className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Kustomisasi Pengalamanmu</p>
      </div>

      {/* Tampilan */}
      <div>
        <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>Tampilan</h3>
        <div className={`rounded-2xl border transition-all ${darkMode ? 'glass-clay-dark' : 'glass-clay-light'} divide-y ${darkMode ? 'divide-white/5' : 'divide-slate-200/60'}`}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${darkMode ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}>
                <span className="material-icons text-[18px]">{darkMode ? 'dark_mode' : 'light_mode'}</span>
              </div>
              <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Mode Gelap</span>
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
        <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>Notifikasi</h3>
        <div className={`rounded-2xl border transition-all ${darkMode ? 'glass-clay-dark' : 'glass-clay-light'} divide-y ${darkMode ? 'divide-white/5' : 'divide-slate-200/60'}`}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
                <span className="material-icons text-[20px]">notifications</span>
              </div>
              <div>
                <span className={`text-sm font-bold block ${darkMode ? 'text-white' : 'text-slate-800'}`}>Notifikasi Sholat</span>
                <p className={`text-[11px] font-medium mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pengingat saat masuk waktu sholat</p>
              </div>
            </div>
            <button
              onClick={handleToggleNotifications}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 shrink-0 ${notificationsEnabled ? 'bg-primary' : darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${notificationsEnabled ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                <span className="material-icons text-[20px]">restaurant</span>
              </div>
              <div>
                <span className={`text-sm font-bold block ${darkMode ? 'text-white' : 'text-slate-800'}`}>Notifikasi Imsak & Sahur</span>
                <p className={`text-[11px] font-medium mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Peringatan sahur & waktu imsak</p>
              </div>
            </div>
            <button
              onClick={handleToggleImsakNotif}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 shrink-0 ${imsakNotifEnabled ? 'bg-primary' : darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${imsakNotifEnabled ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mode Haid */}
      <div>
        <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>Mode Khusus</h3>
        <div className={`rounded-2xl border transition-all overflow-hidden ${darkMode ? 'glass-clay-dark border-rose-500/20' : 'glass-clay-light border-rose-200'}`}>
          <div className={`p-4 ${darkMode ? 'bg-gradient-to-r from-rose-500/10 to-pink-500/10' : 'bg-gradient-to-r from-rose-50/50 to-pink-50/50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-rose-500/20' : 'bg-rose-100'}`}>
                  <span className="text-lg">🌸</span>
                </div>
                <div>
                  <span className={`text-sm font-bold block ${darkMode ? 'text-white' : 'text-slate-800'}`}>Mode Haid</span>
                  <p className={`text-[11px] font-medium mt-0.5 ${darkMode ? 'text-rose-400' : 'text-rose-500'}`}>Menjaga streak saat berhalangan</p>
                </div>
              </div>
              <button
                onClick={() => setHaidMode(!haidMode)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 shrink-0 ${haidMode ? 'bg-rose-500' : darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${haidMode ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
          {haidMode && (
            <div className={`p-4 border-t animate-fade-in ${darkMode ? 'border-rose-500/10 bg-slate-900/20' : 'border-rose-100 bg-white/40'}`}>
              <p className={`text-[11px] font-medium mb-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Misi sholat & puasa disembunyikan. Misi yang tersedia:</p>
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-xl border ${
                  darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                }`}>
                  <span className="material-icons text-[14px]">spa</span> Dzikir Pagi
                </span>
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-xl border ${
                  darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                }`}>
                  <span className="material-icons text-[14px]">psychology</span> Dzikir Petang
                </span>
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-xl border ${
                  darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                }`}>
                  <span className="material-icons text-[14px]">volunteer_activism</span> Sedekah
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ramadhan Settings */}
      <div>
        <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>Ramadhan</h3>
        <div className={`rounded-2xl border transition-all overflow-hidden ${darkMode ? 'glass-clay-dark border-emerald-500/20' : 'glass-clay-light border-emerald-200'}`}>
          <div className={`p-4 ${darkMode ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10' : 'bg-gradient-to-r from-emerald-50/50 to-teal-50/50'}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                <span className="text-lg">🌙</span>
              </div>
              <div>
                <span className={`text-sm font-bold block ${darkMode ? 'text-white' : 'text-slate-800'}`}>Awal Ramadhan {new Date().getFullYear() - 579} H</span>
                <p className={`text-[11px] font-medium mt-0.5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Penyesuaian tanggal awal puasa</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setRamadhanStartDate(null)}
                className={`px-3 py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold transition-all border ${
                  !ramadhanStartDate
                    ? darkMode ? 'bg-primary text-white border-primary shadow-[0_4px_15px_rgba(13,150,139,0.3)]' : 'bg-primary text-white border-primary shadow-sm'
                    : darkMode ? 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-700' : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="material-icons text-[14px]">auto_awesome</span>
                  Deteksi Otomatis (API)
                </span>
              </button>
            </div>
          </div>
          {/* Custom date input */}
          <div className={`p-4 border-t ${darkMode ? 'border-emerald-500/10 bg-slate-900/20' : 'border-emerald-100 bg-white/40'}`}>
            <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pilih Tanggal Manual:</p>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={ramadhanStartDate || ''}
                onChange={(e) => setRamadhanStartDate(e.target.value || null)}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  darkMode ? 'bg-slate-800/50 border border-slate-700 text-white' : 'bg-white/80 border border-slate-200 text-slate-800'
                }`}
              />
              {ramadhanStartDate && (
                <button
                  onClick={() => setRamadhanStartDate(null)}
                  className={`px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                    darkMode ? 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30' : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                  }`}
                >
                  Reset
                </button>
              )}
            </div>
            <p className={`text-[10px] font-medium mt-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {ramadhanStartDate
                ? `✅ Ditetapkan pada: ${new Date(ramadhanStartDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`
                : '🔄 Menggunakan tanggal standar dari kalender Hijriah'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Lokasi */}
      <div>
        <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>Lokasi Saat Ini</h3>
        <div className={`rounded-2xl border transition-all ${darkMode ? 'glass-clay-dark' : 'glass-clay-light'}`}>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}>
                <span className="material-icons text-[20px]">location_on</span>
              </div>
              <div>
                <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{location.city}</p>
                <p className={`text-[10px] font-mono mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°</p>
              </div>
            </div>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                darkMode ? 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-700' : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-white'
              }`}
            >
              Ubah
            </button>
          </div>

          {showSearch && (
            <div className={`p-4 border-t animate-fade-in space-y-3 ${darkMode ? 'border-white/5 bg-slate-900/30' : 'border-slate-200/60 bg-slate-50/50'}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cari nama kota..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    darkMode ? 'bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500' : 'bg-white/80 border border-slate-200 text-slate-800 placeholder:text-slate-400'
                  }`}
                />
                <button
                  onClick={handleSearch}
                  disabled={searching}
                  className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all disabled:opacity-50 shadow-[0_4px_15px_rgba(13,150,139,0.2)]"
                >
                  {searching ? '...' : 'Cari'}
                </button>
              </div>
              {searchResults.length > 0 && (
                <div className="space-y-2 mt-2">
                  {searchResults.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => selectLocation(r)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 bento-card-hover ${
                        darkMode ? 'bg-slate-800/40 hover:bg-primary/20 border border-slate-700/50' : 'bg-white/60 hover:bg-primary/10 border border-slate-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${darkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                        <span className="material-icons text-[16px]">place</span>
                      </div>
                      <span className={`text-sm font-bold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{r.city}</span>
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
        <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>Lokasi Favorit</h3>
        <div className={`rounded-2xl border transition-all ${darkMode ? 'glass-clay-dark' : 'glass-clay-light'} divide-y ${darkMode ? 'divide-white/5' : 'divide-slate-200/60'}`}>
          {favorites.length === 0 ? (
            <div className={`p-6 text-center text-sm font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Belum ada lokasi yang disimpan
            </div>
          ) : (
            favorites.map((fav, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-500'}`}>
                    <span className="material-icons text-[20px]">star</span>
                  </div>
                  <span className={`text-sm font-bold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{fav.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLocation(fav)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                      darkMode ? 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30' : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'
                    }`}
                  >
                    Pilih
                  </button>
                  <button
                    onClick={() => removeFavorite(fav)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all border ${
                      darkMode ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20' : 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100'
                    }`}
                  >
                    <span className="material-icons text-[16px]">close</span>
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="p-3">
            <button
              onClick={() => addFavorite(location)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${
                darkMode ? 'hover:bg-white/5 text-primary' : 'hover:bg-slate-50 text-primary-dark'
              }`}
            >
              <span className="material-icons text-[16px]">add</span>
              Simpan lokasi saat ini ke Favorit
            </button>
          </div>
        </div>
      </div>

      {/* Tentang */}
      <div>
        <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>Aplikasi</h3>
        <div className={`rounded-2xl border transition-all overflow-hidden ${darkMode ? 'glass-clay-dark' : 'glass-clay-light'}`}>
          <button
            onClick={() => setShowChangelog(true)}
            className={`w-full flex items-center justify-between p-4 transition-all text-left bento-card-hover ${
              darkMode ? 'hover:bg-white/5' : 'hover:bg-white/60'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
              }`}>
                <span className="material-icons text-[20px]">info</span>
              </div>
              <div>
                <span className={`text-sm font-bold block ${darkMode ? 'text-white' : 'text-slate-800'}`}>Versi 1.8.0</span>
                <span className={`text-[11px] font-medium block mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Lihat apa yang baru (Changelog)</span>
              </div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <span className="material-icons text-[20px]">chevron_right</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Footer text */}
      <div className={`text-center text-[10px] font-medium space-y-1 pb-4 pt-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
        <p>SholatKu v1.8.0 — Jadwal Sholat by Ajekkk</p>
        <p>Data dari <a href="https://equran.id" target="_blank" rel="noopener noreferrer" className={`hover:underline font-bold ${darkMode ? 'text-primary/70' : 'text-primary'}`}>EQuran.id</a> (Kemenag RI)</p>
      </div>

      {/* Modal Changelog Popup */}
      {showChangelog && <Changelog onClose={() => setShowChangelog(false)} />}
    </div>
  )
}
