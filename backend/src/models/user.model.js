// Mengimpor Mongoose untuk mendefinisikan skema dan model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mendefinisikan Skema Pengguna (userSchema)
const userSchema = new Schema({
  // Nama pengguna unik untuk setiap pengguna.
  username: {
    type: String,
    required: [true, 'Username wajib diisi.'],
    unique: true,
    trim: true,
    minlength: [3, 'Username minimal 3 karakter.']
  },

  // Email unik untuk setiap pengguna.
  email: {
    type: String,
    required: [true, 'Email wajib diisi.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Silakan masukkan format email yang valid.']
  },

  // Kata sandi pengguna.
  password: {
    type: String,
    required: [true, 'Kata sandi wajib diisi.'],
    minlength: [6, 'Kata sandi minimal 6 karakter.']
  },

  // Jumlah koin yang dimiliki pengguna.
  coins: {
    type: Number,
    default: 0
  },
  
  // --- PERUBAHAN DI SINI ---
  // Menambahkan field 'inventory' untuk menyimpan item yang dimiliki pengguna.
  // Ini adalah sebuah array yang berisi ObjectId dari setiap item.
  // 'ref: 'Item'' menghubungkan ObjectId ini ke model 'Item'.
  inventory: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
  
}, { timestamps: true });

// Membuat model 'User' dari skema yang telah didefinisikan.
const User = mongoose.model('User', userSchema);

// Mengekspor model User agar bisa digunakan di file lain
module.exports = User;