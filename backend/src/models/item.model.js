// Mengimpor Mongoose untuk mendefinisikan skema dan model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mendefinisikan Skema Item (itemSchema)
const itemSchema = new Schema({
  // Nama unik untuk item.
  name: {
    type: String,
    required: [true, 'Nama item wajib diisi.'],
    unique: true,
    trim: true
  },

  // Deskripsi singkat mengenai item.
  description: {
    type: String,
    required: [true, 'Deskripsi item wajib diisi.'],
    trim: true
  },

  // Harga item dalam bentuk koin.
  price: {
    type: Number,
    required: [true, 'Harga item wajib diisi.'],
    min: [0, 'Harga tidak boleh negatif.']
  },

  // URL ke gambar atau ikon untuk item.
  imageUrl: {
    type: String,
    trim: true,
    default: ''
  },
  
  // --- PERUBAHAN DI SINI ---
  // Menambahkan field 'category' untuk mengklasifikasikan item.
  // 'enum' membatasi nilai yang bisa dimasukkan ke dalam field ini.
  // Ini penting untuk logika pembelian kita nanti.
  category: {
    type: String,
    required: [true, 'Kategori item wajib diisi'],
    enum: ['Tema', 'Avatar', 'Hadiah', 'Adds-On', 'Lainnya'],
    default: 'Lainnya'
  }

}, { timestamps: true });

// Membuat model 'Item' dari skema yang telah didefinisikan.
const Item = mongoose.model('Item', itemSchema);

// Mengekspor model Item agar bisa digunakan di file lain
module.exports = Item;