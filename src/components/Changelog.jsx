import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useApp } from '../context/AppContext'

const changelogData = [
  {
    version: '1.3.0',
    date: '21 Feb 2026',
    isNew: true,
    items: [
      {
        title: 'Animasi Idul Fitri',
        description: 'Penambahan perayaan hari kemenangan berupa animasi tirai merah dan jatuhan ketupat yang otomatis muncul pada 2 minggu pertama bulan Syawal.'
      },
      {
        title: 'Penyempurnaan Streak & Title',
        description: 'Peningkatan sistem streak harian dengan animasi api dan penyempurnaan tampilan title level ibadah.'
      },
      {
        title: 'Smart Mission Lock (Periode Bulan)',
        description: 'Perbaikan logika periode Ramadhan agar misi otomatis terkunci saat memasuki 1 Syawal dan streak/XP berhenti terakumulasi.'
      },
      {
        title: 'Halaman Tentang Aplikasi & Changelog',
        description: 'Menambahkan menu "Tentang Aplikasi" di Setelan dengan popup riwayat pembaruan interaktif.'
      },
      {
        title: 'Perbaikan Bug',
        description: 'Memperbaiki Invalid Hook Call pada navigasi dan tampilan modal di mode mobile (React Portal).'
      }
    ]
  },
  {
    version: '1.2.0',
    date: '20 Feb 2026',
    isNew: false,
    items: [
      {
        title: 'Tasbih Digital',
        description: 'Fitur baru untuk menghitung dzikir (Subhanallah, Alhamdulillah, Allahuakbar, dll) dengan desain counter yang mulus dan interaktif.'
      },
      {
        title: 'Misi Ramadhan',
        description: 'Fitur pelacak Misi Sholat, Puasa, dan Dzikir harian selama bulan Ramadhan.'
      },
      {
        title: 'Sistem Gamifikasi (XP & Streak)',
        description: 'Fitur pengumpulan stempel (Streak hijau/merah), animasi api streak, akumulasi XP, dan perolehan Level ibadah harian.'
      },
      {
        title: 'Perbaikan Bug & Environment',
        description: 'Memisahkan struktur komponen (RamadhanTracker.jsx, Tasbih.jsx) agar codebase lebih modular dan rapi.'
      }
    ]
  },
  {
    version: '1.1.0',
    date: '19 Feb 2026',
    isNew: false,
    items: [
      {
        title: 'Fitur Al-Quran Lengkap',
        description: 'Penambahan halaman khusus untuk membaca 114 Surah lengkap dengan ayat, terjemahan, dan UI yang nyaman untuk dibaca.'
      },
      {
        title: 'Audio Murottal (Playback)',
        description: 'Fitur pemutaran audio Al-Quran per-ayat untuk membantu mendengarkan bacaan yang benar.'
      },
      {
        title: 'Kalender Bulanan ("Lihat Bulanan")',
        description: 'Perbaikan dan penyempurnaan UI kalender jadwal sholat agar pengguna bisa melihat tabel jadwal sebulan penuh dengan rapi.'
      },
      {
        title: 'Push Notifications',
        description: 'Penambahan sistem notifikasi canggih di latar belakang untuk Pengingat Waktu Sholat dan Peringatan Imsak/Sahur.'
      },
      {
        title: 'Progressive Web App (PWA)',
        description: 'SholatKu kini bisa di-install atau ditambahkan ke Home Screen HP seperti aplikasi biasa.'
      },
      {
        title: 'Perbaikan Bug',
        description: 'Memperbaiki masalah tampilan kalender yang bertumpuk, tata letak responsif, dan konfigurasi vite-plugin-pwa untuk caching offline.'
      }
    ]
  },
  {
    version: '1.0.0',
    date: '14 Feb 2026',
    isNew: false,
    items: [
      {
        title: 'Jadwal Sholat Real-Time',
        description: 'Menampilkan jadwal 5 waktu, Imsak, dan Terbit menggunakan data dari Aladhan API.'
      },
      {
        title: 'Manajemen Lokasi',
        description: 'Deteksi lokasi secara otomatis (Geolokasi), pencarian nama kota manual, dan fitur menyimpan Lokasi Favorit.'
      },
      {
        title: 'UI/UX Modern',
        description: 'Tampilan berkonsep glassmorphism yang responsif.'
      },
      {
        title: 'Mode Gelap (Dark Mode)',
        description: 'Dukungan penuh untuk tema terang dan gelap.'
      },
      {
        title: 'Arah Kiblat',
        description: 'Fitur indikator kompas sederhana untuk penunjuk arah kiblat.'
      },
      {
        title: 'Perbaikan Environment (Rilis Awal)',
        description: 'Menggunakan Vite sebagai build tool dan React Context untuk state management (AppContext).'
      }
    ]
  }
]

export default function Changelog({ onClose }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/50 flex flex-col relative overflow-hidden transform transition-all">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <span className="material-icons text-[18px]">close</span>
        </button>

        {/* Top Header */}
        <div className="flex flex-col items-center pt-10 pb-6 px-6 relative shrink-0">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-emerald-600/20 dark:from-primary/30 dark:to-emerald-600/30 rounded-[20px] flex items-center justify-center mb-4 shadow-sm border border-emerald-100 dark:border-emerald-800/50 overflow-hidden p-3">
            <img src="/icon.png" alt="Logo SholatKu" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">SholatKu</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">v1.3.0</p>
          
          <div className="bg-slate-100 dark:bg-slate-700/50 px-4 py-2 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
            <span>Update: 21 Februari 2026</span>
          </div>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-8 custom-scrollbar">
          <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 mb-6 sticky top-0 bg-white dark:bg-slate-800 py-2 z-10">Apa yang Baru</h3>
          
          <div className="relative pl-6 space-y-10 border-l-[3px] border-slate-200 dark:border-slate-700">
            {changelogData.map((release, index) => (
              <div key={release.version} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] bg-white dark:bg-slate-800 p-1">
                  <div className={`w-[14px] h-[14px] rounded-full flex items-center justify-center ${
                    release.isNew 
                      ? 'bg-emerald-600 dark:bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]' 
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}>
                    {release.isNew && <div className="w-[6px] h-[6px] bg-white rounded-full"></div>}
                  </div>
                </div>

                {/* Release Header */}
                <div className="flex items-center justify-between mb-4 -mt-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">v{release.version}</h4>
                  {release.isNew ? (
                    <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-md text-xs font-bold ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-500/30">
                      Baru
                    </span>
                  ) : (
                    <span className="bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-500 px-3 py-1 rounded-md text-xs font-semibold">
                      {release.date}
                    </span>
                  )}
                </div>

                {/* Release Items */}
                <div className="space-y-5">
                  {release.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="relative pl-5">
                      {/* Sub-item bullet */}
                      <div className="absolute left-0 top-2 w-[5px] h-[5px] rounded-full bg-slate-300 dark:bg-slate-600"></div>
                      <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 leading-snug">{item.title}</h5>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Action Footer */}
        <div className="p-5 border-t border-slate-100 dark:border-slate-700/50 shrink-0 bg-slate-50 dark:bg-slate-800/80">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>,
    document.body
  )
}
