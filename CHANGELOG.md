# Changelog

Semua perubahan penting pada aplikasi **SholatKu** akan didokumentasikan di dalam file ini.

Pengembangan aplikasi ini mengikuti kaidah [*Semantic Versioning*](https://semver.org/).

---

## [v2.1.0] - 13-06-2026
**Tampilan Al-Qur'an Lebih Fleksibel, Metode Hafalan Al-Hufaz & Tajwid Warna**
Fokus pada peningkatan kualitas hafalan dan bacaan Al-Qur'an.

### 📖 Fitur Baru
- **Navigasi Cerdas (Juz & Hafalan)**: Penambahan tab navigasi di menu utama untuk mengakses Juz secara instan dan filter otomatis untuk surat-surat yang sedang dihafal.
- **Jump Modal Interaktif**: Kemudahan mencari ayat, pindah surat, atau melompat ke Juz lain langsung dari halaman bacaan ayat tanpa harus kembali ke menu utama.
- **Toggle Latin & Terjemahan**: Penambahan tombol cepat di navigasi halaman Al-Qur'an untuk menyembunyikan teks Latin dan Terjemahan secara instan.
- **Metode Hafalan Al-Hufaz**: Fitur membagi ayat dalam 5 blok warna dengan counter repetisi target 40x per blok.
- **Tajwid Warna**: Visualisasi hukum tajwid interaktif pada tiap ayat dengan warna yang rapi dan intuitif.
- **Dukung SholatKu via QRIS**: Tambahan opsi untuk mendukung developer via QRIS bebas potongan di menu Setelan.

### 🐛 Perbaikan Bug
- Memperbaiki bug notifikasi Adzan yang dibisukan browser saat di background.
- Memperbaiki bug karakter kotak-kotak di beberapa HP Android lawas.

---

## [v2.0.0] - 06-06-2026
**Desain Baru & Asisten AI Islami**
Pembaruan antarmuka besar-besaran dan integrasi kecerdasan buatan.

### 🎨 Fitur Baru
- **Desain Baru & Glassmorphism**: Perombakan tampilan menjadi lebih elegan dan premium dengan efek transparan.
- **Asisten AI Islami**: Chatbot cerdas untuk tanya jawab agama menggunakan input suara.
- **Radar Masjid Terdekat**: Peta interaktif canggih mendeteksi lokasi untuk mencari masjid di sekitar.

---

## [v1.9.0] - 30-05-2026
**Perbaikan Bug & Optimasi Akses API**

### ⚡ Peningkatan Performa
- Mengoptimalkan pemanggilan request API agar lebih hemat data.
- Refactoring komponen kalender untuk performa yang lebih stabil.

---

## [v1.8.0] - 19-03-2026
**THR Spesial Lebaran Ekstra & Interaksi Premium**
Fokus pada merayakan hari kemenangan setelah Ramadhan selesai dengan fitur Amplop THR yang interaktif, mewah, dan aman.

### 🎁 Fitur Baru
- **THR Spesial Lebaran Ekstra**: Rayakan hari kemenangan dengan berburu Amplop THR! Buka kotak kado emas yang muncul setelah Ramadhan usai untuk memenangkan hadiah kejutan spesial.
- **Interaksi & Animasi Premium**: Tampilan amplop melayang yang mewah dengan animasi goyang (shake) cerdas. Amplop yang sudah dibuka otomatis akan menyembunyikan diri di tepi kanan layar persis seperti widget interaktif masa kini.
- **Jadwal & Hitung Mundur Otomatis**: Amplop dilengkapi gembok waktu hitung mundur (countdown) pintar. Kejutan hadiah THR otomatis diproteksi berlapis dan hanya bisa digenggam pas jadwal rilis tiba.

### 🛡️ Keamanan & Database
- **Pengamanan Ketat Database**: Setiap klaim yang masuk dilindungi logika sistem terpusat super aman. Mengandalkan metode transaksi langsung yang memastikan: 1 pengguna 1 Amplop selamanya tanpa celah.

---

## [v1.7.0] - 18-03-2026
**Sistem Akun, Sinkronisasi Cloud & Kustomisasi Profil**
Fokus pada integrasi database Firebase untuk menyimpan progres ibadah, profil pengguna, dan kustomisasi avatar Islami yang lucu.

### ☁️ Fitur Baru
- **Sistem Akun & Sinkronisasi Cloud**: Kini SholatKu dilengkapi fitur Login menggunakan Email/Password atau akun Google. Seluruh progres ibadah, hafalan, dan pengaturan kini aman dicadangkan (auto-sync) ke Firebase Realtime Database secara instan.
- **Migrasi Data Cerdas**: Saat login untuk pertama kalinya, semua progres offline yang sebelumnya ada di perangkat tidak akan hilang. Sistem akan menyedotnya dan memindahkannya ke Cloud secara otomatis.
- **Kustomisasi Profil**: Tambahkan sentuhan persona! Ubah nama sesuka hati dan pilih puluhan avatar Islami yang lucu langsung dari menu Edit Profil baru.

### 🔐 Keamanan & Akun
- **Keamanan Berlapis**: Lupa password? Tidak masalah. Disediakan tombol "Lupa Password" super praktis yang akan mengirimkan tautan reset ke email pengguna secara aman.

---

## [v1.6.0] - 02-03-2026
**Hafalan Al-Qur'an & Bantuan Mode Hafalan**
Fokus pada penyempurnaan fitur Al-Qur'an dengan menambahkan Mode Hafalan (mengaburkan teks), pengulangan audio (looping), dan optimasi anti-lag.

### 📖 Fitur Baru
- **Fitur Hafalan Al-Qur'an**: Tandai ayat-ayat yang sudah dihafal langsung dari menu Al-Qur'an. Progres hafalan per surat tersimpan otomatis di perangkat pengguna.
- **Bantuan Mode Hafalan (Blur)**: Latih hafalan dengan menutup/mengaburkan (blur) ayat Arab. Ketuk kata demi kata untuk melihat bocorannya, atau lihat seluruh ayat sekaligus.
- **Pengulangan Audio (Looping)**: Dengarkan lantunan murottal Qari pada satu ayat secara berulang-ulang tanpa henti untuk mempermudah proses menghafal secara audio.

### ⚡ Peningkatan Performa
- **Optimasi Anti-Lag**: Optimasi rendering komponen ayat menggunakan `React.memo`. Mengaktifkan Mode Hafalan pada surat panjang seperti Al-Baqarah kini dijamin mulus tanpa lag atau patah-patah.

---

## [v1.5.0] - 25-02-2026
**Jadwal Sholat Kemenag RI & Pengaturan Ramadhan**
Fokus pada peningkatan akurasi jadwal sholat menggunakan API EQuran (Kemenag RI) dan penyesuaian fleksibel awal bulan Ramadhan.

### 🕌 Fitur Baru
- **Jadwal Sholat Kemenag RI**: Sumber data jadwal sholat diubah ke EQuran.id (Kemenag RI) agar waktu sholat lebih akurat untuk seluruh Indonesia. Mendukung 517 kab/kota di 34 provinsi.
- **Fallback Otomatis Luar Negeri**: Untuk lokasi di luar Indonesia, jadwal sholat otomatis menggunakan Aladhan API sebagai fallback. Pengguna tidak perlu mengatur apapun.
- **Pengaturan Awal Ramadhan**: Fitur baru di Setelan untuk mengatur tanggal mulai Ramadhan secara manual. Cocok untuk menangani perbedaan penetapan antar ormas (NU, Muhammadiyah, Pemerintah).
- **Tahun Hijriah Otomatis**: Tahun Hijriah kini dihitung otomatis, tidak perlu update manual setiap tahun baru Hijriah.

### 🛠️ Perbaikan Bug & Optimasi
- Memperbaiki waktu sholat yang terlalu cepat dari sumber sebelumnya, dan mengoptimasi jumlah request API agar lebih hemat bandwidth.

---

## [v1.4.0] - 23-02-2026
**Mode Haid untuk Wanita**
Fokus pada fitur khusus wanita agar tetap bisa menjaga streak saat berhalangan.

### 🌸 Fitur Baru
- **Mode Haid**: Fitur baru di Setelan yang memungkinkan pengguna wanita mengaktifkan mode haid. Misi sholat & puasa otomatis disembunyikan, hanya menyisakan misi yang bisa dilakukan (Dzikir Pagi, Dzikir Petang, Sedekah).
- **Streak Haid-Aware**: Sistem streak yang cerdas — hari-hari haid dihitung berdasarkan misi yang tersedia saja, sehingga streak tidak putus.
- **Banner & Badge Mode Haid**: Indikator visual 🌸 di header gamification dan banner pink di halaman Misi Ramadhan saat mode aktif.
- **Kalender Ramadhan Interaktif**: Grid kalender 30 hari Ramadhan yang bisa diklik untuk berpindah tanggal secara cepat, dengan indikator status (selesai/sebagian/haid/belum).
- **Navigasi Terbatas Ramadhan**: Arrow navigasi hari dibatasi hanya di bulan Ramadhan (1-30) agar tidak keluar dari periode misi.

### 🐛 Perbaikan Bug
- Memperbaiki tampilan misi hari sebelumnya agar sesuai status haid hari itu (bukan status haid saat ini).

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
