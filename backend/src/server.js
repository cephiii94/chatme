// Mengimpor pustaka yang diperlukan
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// 'dotenv' digunakan untuk memuat variabel lingkungan dari file .env
require('dotenv').config();

// Mengimpor file rute dari direktori /api
// Catatan: File-file ini perlu dibuat selanjutnya.
const authRoutes = require('./api/auth.routes');
const userRoutes = require('./api/user.routes');
const shopRoutes = require('./api/shop.routes');
const chatRoutes = require('./api/chat.routes');

// Inisialisasi aplikasi Express
const app = express();

// Mengambil variabel lingkungan dari file .env
// Menyediakan nilai default jika variabel tidak ditemukan
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;

// --- Middleware ---
// 1. Mengaktifkan Cross-Origin Resource Sharing (CORS) agar frontend
//    bisa berkomunikasi dengan backend ini.
app.use(cors());

// 2. Mengurai (parse) body permintaan yang masuk dalam format JSON.
//    Ini memungkinkan kita untuk mengakses data dari req.body.
app.use(express.json());


// --- Koneksi Database ---
// Menyambungkan ke database MongoDB menggunakan Mongoose
mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('Berhasil terhubung ke MongoDB.');
  })
  .catch((err) => {
    console.error('Koneksi database gagal. Error:', err);
    // Menghentikan proses jika koneksi ke database gagal
    process.exit(1);
  });


// --- Rute API ---
// Menetapkan rute dasar untuk setiap set endpoint.
// Setiap permintaan ke /api/auth akan ditangani oleh authRoutes, dst.
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/chat', chatRoutes);

// Rute dasar untuk memeriksa apakah server berjalan
app.get('/', (req, res) => {
  res.json({ message: `Selamat datang di server ChatsYok, Tuan Cecep. Server berjalan lancar.` });
});


// --- Menjalankan Server ---
// Server mulai mendengarkan permintaan pada port yang telah ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}.`);
  console.log(`Akses di http://localhost:${PORT}`);
});
