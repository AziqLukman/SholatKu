# Changelog

Semua perubahan penting pada aplikasi **SholatKu** akan didokumentasikan di dalam file ini.

Pengembangan aplikasi ini mengikuti kaidah [*Semantic Versioning*](https://semver.org/).

---

## [v1.3.0] - 22-02-2026
**Update Edisi Spesial Ramadhan**
Fokus pada gamifikasi ibadah dan pengalaman spesial di bulan suci hingga lebaran.

### 🎉 Baru (Fitur Utama)
- **Ramadhan Tracker**: Fitur pelacak Misi Sholat, Puasa, dan Dzikir harian selama bulan Ramadhan.
- **Sistem Gamifikasi (XP & Streak)**: Fitur pengumpulan stempel (Streak hijau/merah), akumulasi XP, dan perolehan Level ibadah harian.
- **Smart Mission Lock**: Sistem pintar yang otomatis "mengunci" menu misi Ramadhan dan menghentikan laju streak/XP tepat ketika bulan Ramadhan berakhir (masuk 1 Syawal).
- **Animasi Idul Fitri**: Penambahan perayaan hari kemenangan berupa animasi tirai merah dan jatuhan ketupat yang akan otomatis "meledak/terbuka" pada 2 minggu pertama bulan Syawal.

### 🐛 Perbaikan Bug & Peningkatan
- Memperbaiki logika periode isRamadhan.
- Memisahkan struktur komponen (RamadhanTracker.jsx) agar codebase lebih rapi.

---

## [v1.2.0] - 20-02-2026
**Tasbih Digital & Notifikasi Pintar (PWA)**
Fokus pada interaktivitas dan menjadikan web app terasa seperti aplikasi native sungguhan.

### 🌟 Fitur Baru
- **Tasbih Digital**: Fitur baru untuk menghitung dzikir (Subhanallah, Alhamdulillah, Allahuakbar, dll) dengan desain counter yang mulus dan interaktif.
- **Push Notifications**: Penambahan sistem notifikasi canggih di latar belakang untuk Pengingat Waktu Sholat dan Peringatan Imsak/Sahur.
- **Progressive Web App (PWA)**: SholatKu kini bisa di-install atau ditambahkan ke Home Screen (Layar Utama) HP seperti aplikasi biasa, dan bisa berjalan lebih responsif.

### 🛠️ Perbaikan Environment
- Menyempurnakan konfigurasi `vite-plugin-pwa` untuk *caching* aset offline.
- Menstabilkan sistem sinkronisasi notifikasi (service worker) di perangkat *mobile*.

---

## [v1.1.0] - 19-02-2026
**Pembaruan Al-Quran & Kalender Bulanan**
Fokus pada penambahan utilitas bacaan ibadah harian dan pemantauan jangka panjang.

### 📖 Fitur Baru
- **Fitur Al-Quran Lengkap**: Penambahan halaman khusus untuk membaca 114 Surah lengkap dengan ayat, terjemahan, dan UI yang nyaman untuk dibaca.
- **Audio Murottal (Playback)**: Fitur pemutaran audio Al-Quran per-ayat untuk membantu mendengarkan bacaan yang benar.
- **Kalender Bulanan ("Lihat Bulanan")**: Perbaikan dan penyempurnaan UI kalender jadwal sholat agar pengguna bisa melihat tabel jadwal sebulan penuh dengan rapi tanpa harus mencari hari per hari.

### 🐞 Perbaikan Bug
- Memperbaiki masalah pada tampilan kalender yang bertumpuk.
- Memperbaiki tata letak responsif tabel bulanan di layar beresolusi kecil.

---

## [v1.0.0] - 14-02-2026
**Rilis Awal (Fondasi Dasar)**
Fokus pada fungsi inti sebagai pengingat sholat yang minimalis dan cantik.

### 🚀 Fitur Awal
- **Jadwal Sholat Real-Time**: Menampilkan jadwal 5 waktu, Imsak, dan Terbit menggunakan data dari Aladhan API.
- **Manajemen Lokasi**: Deteksi lokasi secara otomatis (Geolokasi), pencarian nama kota manual, dan fitur menyimpan Lokasi Favorit.
- **UI/UX Modern**: Tampilan berkonsep *glassmorphism* yang responsif.
- **Mode Gelap (Dark Mode)**: Dukungan penuh untuk tema terang dan gelap.
- **Arah Kiblat**: Fitur indikator kompas sederhana untuk penunjuk arah kiblat.

### ⚙️ Environment Awal
- Menggunakan Vite sebagai build tool untuk kinerja loading yang lebih cepat.
- Implementasi arsitektur React state management berbasis `AppContext`.
