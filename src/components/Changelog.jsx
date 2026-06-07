import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useApp } from '../context/AppContext'

const changelogData = [
  {
    version: '2.0',
    date: '6 Juni 2026',
    isNew: true,
    items: [
      {
        title: 'Desain Baru & Glassmorphism 🎨',
        description: 'Perombakan besar-besaran (Redesign) tampilan aplikasi menjadi lebih elegan, premium, dan dinamis. Hadir dengan efek kaca (glassmorphism) yang transparan dan palet warna modern.'
      },
      {
        title: 'Asisten AI Islami Pintar 🤖',
        description: 'Tanya jawab hukum agama, tata cara ibadah, atau seputar puasa langsung ke Asisten AI yang cerdas. Tidak perlu ngetik, cukup panggil lewat fitur input suara (Microphone)!'
      },
      {
        title: 'Radar Masjid Terdekat 🕌',
        description: 'Lagi di luar dan bingung cari masjid? Kini ada peta interaktif canggih (Mosque Finder) yang mendeteksi posisi Anda dan memberikan navigasi langsung menuju masjid di sekitar.'
      },
      {
        title: 'Animasi & Micro-Interactions ✨',
        description: 'Sistem navigasi dan transisi halaman kini terasa sangat smooth dengan tambahan animasi hover, klik, dan perpindahan komponen yang memanjakan mata.'
      },
      {
        title: 'Optimasi Mode Gelap (Dark Mode) 🌙',
        description: 'Kombinasi warna latar dan teks pada mode gelap telah disempurnakan sehingga tidak membuat mata cepat lelah saat membaca Al-Quran atau berdoa di malam hari.'
      },
      {
        title: 'Stabilitas Voice Input AI 🎙️',
        description: 'Sistem pengenalan suara pada AI dibuat lebih responsif dan tanggap menangkap ucapan secara realtime.'
      },
      {
        title: 'Peningkatan PWA & Performa ⚡',
        description: 'Kinerja keseluruhan aplikasi jadi jauh lebih ngebut! Pengalaman menggunakannya kini sudah sangat mirip dengan aplikasi native sungguhan.'
      }
    ]
  },
  {
    version: '1.9',
    date: '30 Mei 2026',
    isNew: false,
    items: [
      {
        title: 'Perbaikan Bug & Stabilisasi 🛠️',
        description: 'Melakukan perbaikan pada sejumlah bug minor serta mengoptimalkan kode (refactoring) untuk performa aplikasi yang lebih stabil.'
      },
      {
        title: 'Optimasi Akses API ⚡',
        description: 'Mengurangi beban render pada komponen kalender serta mengoptimalkan pemanggilan request API agar lebih hemat data dan responsif.'
      }
    ]
  },
  {
    version: '1.8.0',
    date: '19 Maret 2026',
    isNew: false,
    items: [
      {
        title: 'THR Spesial Lebaran Ekstra 🎁',
        description: 'Rayakan hari kemenangan dengan berburu Amplop THR! Buka kotak kado emas yang muncul setelah Ramadhan usai untuk memenangkan hadiah kejutan spesial.'
      },
      {
        title: 'Interaksi & Animasi Premium ✨',
        description: 'Tampilan amplop melayang yang mewah dengan animasi goyang (shake) cerdas. Amplop yang sudah dibuka otomatis akan menyembunyikan diri di tepi kanan layar persis seperti widget interaktif masa kini.'
      },
      {
        title: 'Pengamanan Ketat Database 🛡️',
        description: 'Setiap klaim yang masuk dilindungi logika sistem terpusat super aman. Mengandalkan metode transaksi langsung yang memastikan: 1 pengguna 1 Amplop selamanya tanpa celah.'
      },
      {
        title: 'Jadwal & Hitung Mundur Otomatis ⏳',
        description: 'Amplop dilengkapi gembok waktu hitung mundur (countdown) pintar. Kejuatan hadiah THR otomatis diproteksi berlapis dan hanya bisa digenggam pas jadwal rilis tiba.'
      }
    ]
  },
  {
    version: '1.7.0',
    date: '18 Maret 2026',
    isNew: false,
    items: [
      {
        title: 'Sistem Akun & Sinkronisasi Cloud ☁️',
        description: 'Kini SholatKu dilengkapi fitur Login menggunakan Email/Password atau akun Google. Seluruh progres ibadah, hafalan, dan pengaturan Anda kini aman dicadangkan (auto-sync) ke Firebase Realtime Database secara instan.'
      },
      {
        title: 'Migrasi Data Cerdas 🔄',
        description: 'Saat Anda login untuk pertama kalinya, semua progres offline yang sebelumnya ada di perangkat Anda tidak akan hilang. Sistem akan menyedotnya dan memindahkannya ke Cloud.'
      },
      {
        title: 'Kustomisasi Profil 👤',
        description: 'Tambahkan sentuhan persona Anda! Ubah nama sesuka hati dan pilih puluhan avatar Islami yang lucu langsung dari menu Edit Profil baru.'
      },
      {
        title: 'Keamanan Berlapis 🔐',
        description: 'Lupa password? Tidak masalah. Disediakan tombol "Lupa Password" super praktis yang akan mengirimkan tautan reset ke email Anda.'
      }
    ]
  },
  {
    version: '1.6.0',
    date: '2 Maret 2026',
    isNew: false,
    items: [
      {
        title: 'Fitur Hafalan Al-Qur\'an 📖',
        description: 'Tandai ayat-ayat yang sudah Anda hafal langsung dari menu Al-Qur\'an. Progres hafalan per surat tersimpan otomatis di perangkat Anda.'
      },
      {
        title: 'Bantuan Mode Hafalan (Blur) 🧠',
        description: 'Latih hafalan Anda dengan menutup/mengaburkan (blur) ayat Arab. Ketuk kata demi kata untuk melihat bocorannya, atau lihat seluruh ayat sekaligus.'
      },
      {
        title: 'Pengulangan Audio (Looping) 🔁',
        description: 'Dengarkan lantunan murottal Qari pada satu ayat secara berulang-ulang tanpa henti untuk mempermudah proses menghafal secara audio.'
      },
      {
        title: 'Peningkatan Performa & Anti-Lag ⚡',
        description: 'Optimasi rendering komponen ayat menggunakan React.memo. Mengaktifkan Mode Hafalan pada surat panjang seperti Al-Baqarah kini dijamin mulus tanpa lag atau patah-patah.'
      }
    ]
  },
  {
    version: '1.5.0',
    date: '25 Feb 2026',
    isNew: false,
    items: [
      {
        title: 'Jadwal Sholat Kemenag RI 🕌',
        description: 'Sumber data jadwal sholat diubah ke EQuran.id (Kemenag RI) agar waktu sholat lebih akurat untuk seluruh Indonesia. Mendukung 517 kab/kota di 34 provinsi.'
      },
      {
        title: 'Fallback Otomatis untuk Luar Negeri',
        description: 'Untuk lokasi di luar Indonesia, jadwal sholat otomatis menggunakan Aladhan API sebagai fallback. Pengguna tidak perlu mengatur apapun.'
      },
      {
        title: 'Pengaturan Awal Ramadhan 🌙',
        description: 'Fitur baru di Setelan untuk mengatur tanggal mulai Ramadhan secara manual. Cocok untuk menangani perbedaan penetapan antar ormas (NU, Muhammadiyah, Pemerintah).'
      },
      {
        title: 'Tahun Hijriah Otomatis',
        description: 'Tahun Hijriah kini dihitung otomatis, tidak perlu update manual setiap tahun baru Hijriah.'
      },
      {
        title: 'Perbaikan Bug',
        description: 'Memperbaiki waktu sholat yang terlalu cepat dari sumber sebelumnya, dan mengoptimasi jumlah request API agar lebih hemat bandwidth.'
      }
    ]
  },
  {
    version: '1.4.0',
    date: '23 Feb 2026',
    isNew: false,
    items: [
      {
        title: 'Mode Haid untuk Wanita 🌸',
        description: 'Fitur baru di Setelan yang memungkinkan pengguna wanita mengaktifkan mode haid. Misi sholat & puasa otomatis disembunyikan, streak tetap terjaga.'
      },
      {
        title: 'Streak Haid-Aware',
        description: 'Sistem streak yang cerdas — hari-hari haid dihitung berdasarkan misi yang tersedia saja, sehingga streak tidak putus.'
      },
      {
        title: 'Banner & Badge Mode Haid',
        description: 'Indikator visual 🌸 di header gamification dan banner pink di halaman Misi Ramadhan saat mode aktif.'
      },
      {
        title: 'Kalender Ramadhan Interaktif 📅',
        description: 'Grid kalender 30 hari Ramadhan yang bisa diklik untuk berpindah tanggal secara cepat, lengkap dengan indikator status selesai, sebagian, haid, dan belum.'
      },
      {
        title: 'Navigasi Terbatas Ramadhan',
        description: 'Arrow navigasi hari dibatasi hanya di bulan Ramadhan (1-30) agar tidak keluar dari periode misi.'
      },
      {
        title: 'Perbaikan Bug',
        description: 'Memperbaiki tampilan misi hari sebelumnya agar sesuai status haid hari itu, bukan status haid saat ini.'
      }
    ]
  },
  {
    version: '1.3.0',
    date: '21 Feb 2026',
    isNew: false,
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
  const { darkMode } = useApp()

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  return createPortal(
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-fade-in ${darkMode ? 'bg-black/60' : 'bg-white/40'}`}>
      <div className={`w-full max-w-md max-h-[90vh] rounded-[2rem] shadow-2xl flex flex-col relative overflow-hidden transform transition-all ${darkMode ? 'glass-clay-dark' : 'glass-clay-light'}`}>
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200'}`}
        >
          <span className="material-icons text-[18px]">close</span>
        </button>

        {/* Top Header */}
        <div className={`flex flex-col items-center pt-10 pb-6 px-6 relative shrink-0 ${darkMode ? 'bg-gradient-to-b from-primary/10 to-transparent' : 'bg-gradient-to-b from-primary/5 to-transparent'}`}>
          <div className={`w-20 h-20 rounded-[20px] flex items-center justify-center mb-4 shadow-sm overflow-hidden p-3 border ${
            darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-slate-100'
          }`}>
            <img src="/icon.png" alt="Logo SholatKu" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <h1 className={`font-heading text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>SholatKu</h1>
          <p className={`text-sm mb-5 font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>v2.0</p>
          
          <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
            darkMode ? 'bg-slate-800 text-slate-300 border border-white/5' : 'bg-slate-50 text-slate-600 border border-slate-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-slate-500' : 'bg-slate-400'}`}></span>
            <span>Update: 6 Juni 2026</span>
          </div>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-8 custom-scrollbar">
          <h3 className={`text-sm font-bold uppercase tracking-wider mb-6 ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>Apa yang Baru</h3>
          
          <div className={`relative pl-6 space-y-10 border-l-[3px] ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            {changelogData.map((release, index) => (
              <div key={release.version} className="relative">
                {/* Timeline Dot */}
                <div className={`absolute -left-[31px] p-1 rounded-full ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
                  <div className={`w-[14px] h-[14px] rounded-full flex items-center justify-center ${
                    release.isNew 
                      ? 'bg-primary shadow-[0_0_0_4px_rgba(13,150,139,0.2)]' 
                      : darkMode ? 'bg-slate-700' : 'bg-slate-300'
                  }`}>
                    {release.isNew && <div className="w-[6px] h-[6px] bg-white rounded-full"></div>}
                  </div>
                </div>

                {/* Release Header */}
                <div className="flex items-center justify-between mb-4 -mt-1">
                  <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>v{release.version}</h4>
                  {release.isNew ? (
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                      darkMode ? 'bg-primary/20 text-primary border-primary/30' : 'bg-primary/10 text-primary-dark border-primary/20'
                    }`}>
                      Baru
                    </span>
                  ) : (
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {release.date}
                    </span>
                  )}
                </div>

                {/* Release Items */}
                <div className="space-y-5">
                  {release.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="relative pl-5">
                      {/* Sub-item bullet */}
                      <div className={`absolute left-0 top-2 w-[5px] h-[5px] rounded-full ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                      <h5 className={`text-sm font-bold mb-1 leading-snug ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{item.title}</h5>
                      <p className={`text-[13px] leading-relaxed font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
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
        <div className={`p-5 border-t shrink-0 ${darkMode ? 'border-white/5 bg-slate-800/30' : 'border-white/40 bg-white/40'}`}>
          <button 
            onClick={onClose}
            className={`w-full py-3.5 font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-sm ${
              darkMode ? 'bg-primary text-white hover:bg-emerald-500' : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            Tutup
          </button>
        </div>

      </div>
    </div>,
    document.body
  )
}
