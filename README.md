ChatsYok
Selamat datang di ChatsYok, sebuah aplikasi web chat modern yang dirancang oleh Cecep Hardiansyah. Aplikasi ini memungkinkan pengguna untuk berkomunikasi secara peer-to-peer (P2P), berinteraksi dengan asisten AI, dan mengumpulkan item serta pencapaian.

✨ Fitur Utama
Chat P2P Real-time: Komunikasi langsung antar pengguna menggunakan teknologi WebRTC (PeerJS) untuk privasi dan kecepatan.

Asisten AI: Terintegrasi dengan PuterAI untuk menjawab pertanyaan dan membantu pengguna.

Sistem Ekonomi: Pengguna mendapatkan koin dari aktivitas chat yang bisa digunakan di toko.

Toko & Inventaris: Beli item-item unik seperti tema atau stiker untuk mempersonalisasi pengalaman chat.

Sistem Pencapaian: Dapatkan lencana untuk setiap pencapaian yang berhasil diselesaikan.

📂 Struktur Proyek
Proyek ini dibagi menjadi tiga bagian utama:

/backend: Server Node.js dengan Express.js yang menangani logika bisnis, otentikasi, dan interaksi database (MongoDB).

/frontend: Aplikasi klien yang dibangun dengan React, menangani semua antarmuka pengguna (UI) dan interaksi.

/signaling-server: Server pensinyalan PeerJS mandiri yang diperlukan untuk membangun koneksi WebRTC antar klien.

🚀 Cara Menjalankan Proyek
Prasyarat
Node.js (v18 atau lebih baru)

npm

MongoDB (atau akun MongoDB Atlas)

Langkah-langkah Instalasi
Clone repositori ini:

git clone <URL-repositori-anda>
cd chatsyok

Konfigurasi Backend:

Masuk ke direktori backend.

Salin file .env.example menjadi .env.

cd backend
cp .env.example .env

Buka file .env dan isi variabel yang diperlukan seperti DATABASE_URL, JWT_SECRET, dan PUTERAI_API_KEY.

Instal Dependensi untuk Semua Bagian:

Buka 3 terminal terpisah.

Di terminal pertama, instal dependensi backend:

cd backend
npm install

Di terminal kedua, instal dependensi frontend:

cd frontend
npm install

Di terminal ketiga, instal dependensi signaling-server:

cd signaling-server
npm install

Jalankan Semua Server:

Di terminal pertama (backend), jalankan server Express:

# Dari dalam folder /backend
npm run dev

Di terminal kedua (frontend), jalankan server pengembangan Vite:

# Dari dalam folder /frontend
npm run dev

Di terminal ketiga (signaling-server), jalankan server PeerJS:

# Dari dalam folder /signaling-server
npm run dev

Buka Aplikasi:

Buka browser Anda dan akses URL yang ditampilkan oleh Vite (biasanya http://localhost:5173).

🛠️ Teknologi yang Digunakan
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT

Frontend: React, Vite, Tailwind CSS, Axios

Real-time: PeerJS (WebRTC), Socket.IO

Dibuat dengan ❤️ oleh Cecep Hardiansyah.