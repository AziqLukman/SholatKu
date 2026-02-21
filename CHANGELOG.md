# Changelog

Semua perubahan penting pada aplikasi **SholatKu** akan didokumentasikan di dalam file ini.

Pengembangan aplikasi ini mengikuti kaidah [*Semantic Versioning*](https://semver.org/).

---

## [v1.3.0] - 21-02-2026
**Animasi Idul Fitri, Penyempurnaan Streak & Changelog**
Fokus pada pengalaman spesial Lebaran, penyempurnaan sistem gamifikasi, dan dokumentasi aplikasi.

### 🎉 Fitur Baru
- **Animasi Idul Fitri**: Penambahan perayaan hari kemenangan berupa animasi tirai merah dan jatuhan ketupat yang otomatis muncul pada 2 minggu pertama bulan Syawal.
- **Penyempurnaan Streak & Title**: Peningkatan sistem streak harian dengan animasi api dan penyempurnaan tampilan title level ibadah.
- **Smart Mission Lock (Periode Bulan)**: Perbaikan logika periode Ramadhan agar misi otomatis terkunci saat memasuki 1 Syawal dan streak/XP berhenti terakumulasi.
- **Halaman Tentang Aplikasi & Changelog**: Menambahkan menu "Tentang Aplikasi" di Setelan dengan popup riwayat pembaruan interaktif.

### 🐛 Perbaikan Bug
- Memperbaiki Invalid Hook Call pada navigasi Tentang Aplikasi.
- Menyempurnakan tampilan modal agar tidak tertutup navbar di mode mobile (React Portal).

---

## [v1.2.0] - 20-02-2026
**Tasbih Digital & Misi Ramadhan**
Fokus pada fitur dzikir interaktif dan gamifikasi ibadah Ramadhan.

### 🌟 Fitur Baru
- **Tasbih Digital**: Fitur baru untuk menghitung dzikir (Subhanallah, Alhamdulillah, Allahuakbar, dll) dengan desain counter yang mulus dan interaktif.
- **Ramadhan Tracker (Misi)**: Fitur pelacak Misi Sholat, Puasa, dan Dzikir harian selama bulan Ramadhan.
- **Sistem Gamifikasi (XP & Streak)**: Fitur pengumpulan stempel (Streak hijau/merah), akumulasi XP, dan perolehan Level ibadah harian.

### 🛠️ Perbaikan Bug & Environment
- Memisahkan struktur komponen (`RamadhanTracker.jsx`, `Tasbih.jsx`) agar codebase lebih modular dan rapi.

---

## [v1.1.0] - 19-02-2026
**Al-Quran, Kalender Bulanan, PWA & Notifikasi**
Fokus pada utilitas bacaan ibadah harian, pemantauan jangka panjang, dan pengalaman seperti aplikasi native.

### 📖 Fitur Baru
- **Fitur Al-Quran Lengkap**: Penambahan halaman khusus untuk membaca 114 Surah lengkap dengan ayat, terjemahan, dan UI yang nyaman untuk dibaca.
- **Audio Murottal (Playback)**: Fitur pemutaran audio Al-Quran per-ayat untuk membantu mendengarkan bacaan yang benar.
- **Kalender Bulanan ("Lihat Bulanan")**: Perbaikan dan penyempurnaan UI kalender jadwal sholat agar pengguna bisa melihat tabel jadwal sebulan penuh dengan rapi.
- **Push Notifications**: Penambahan sistem notifikasi canggih di latar belakang untuk Pengingat Waktu Sholat dan Peringatan Imsak/Sahur.
- **Progressive Web App (PWA)**: SholatKu kini bisa di-install atau ditambahkan ke Home Screen HP seperti aplikasi biasa.

### 🐞 Perbaikan Bug
- Memperbaiki masalah tampilan kalender yang bertumpuk dan tata letak responsif.
- Menyempurnakan konfigurasi `vite-plugin-pwa` untuk *caching* aset offline.

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
