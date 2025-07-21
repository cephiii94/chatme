// Mengimpor Mongoose untuk mendefinisikan skema dan model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mendefinisikan Skema Pengguna (userSchema)
// Skema ini menentukan struktur dokumen untuk koleksi 'users' di MongoDB.
const userSchema = new Schema({
  // Nama pengguna unik untuk setiap pengguna.
  // Wajib diisi (required) dan tidak boleh ada duplikat (unique).
  // 'trim: true' akan menghapus spasi di awal dan akhir string.
  username: {
    type: String,
    required: [true, 'Username wajib diisi.'],
    unique: true,
    trim: true,
    minlength: [3, 'Username minimal 3 karakter.']
  },

  // Email unik untuk setiap pengguna.
  // Digunakan untuk login dan komunikasi.
  // Wajib diisi dan harus unik.
  email: {
    type: String,
    required: [true, 'Email wajib diisi.'],
    unique: true,
    trim: true,
    lowercase: true, // Selalu simpan email dalam huruf kecil
    // Validasi format email sederhana menggunakan regex
    match: [/.+\@.+\..+/, 'Silakan masukkan format email yang valid.']
  },

  // Kata sandi pengguna.
  // Penting: Kata sandi ini harus di-hash sebelum disimpan ke database.
  // Proses hashing akan kita lakukan di controller.
  password: {
    type: String,
    required: [true, 'Kata sandi wajib diisi.'],
    minlength: [6, 'Kata sandi minimal 6 karakter.']
  },

  // Jumlah koin yang dimiliki pengguna.
  // Digunakan untuk fitur dalam aplikasi, seperti toko item.
  // Nilai default adalah 0 saat pengguna baru dibuat.
  coins: {
    type: Number,
    default: 0
  },
  
  // (Opsional) Menambahkan timestamp otomatis.
  // 'createdAt' dan 'updatedAt' akan ditambahkan dan dikelola secara otomatis oleh Mongoose.
}, { timestamps: true });

// Membuat model 'User' dari skema yang telah didefinisikan.
// Mongoose akan secara otomatis membuat koleksi bernama 'users' (jamak dan huruf kecil)
// dari model 'User' ini di MongoDB.
const User = mongoose.model('User', userSchema);

// Mengekspor model User agar bisa digunakan di file lain (misalnya, di controller otentikasi)
module.exports = User;
