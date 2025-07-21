// Mengimpor Mongoose untuk mendefinisikan skema dan model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mendefinisikan Skema Item (itemSchema)
// Skema ini menentukan struktur dokumen untuk koleksi 'items' di MongoDB.
const itemSchema = new Schema({
  // Nama unik untuk item.
  // Wajib diisi dan tidak boleh ada duplikat.
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
  // Wajib diisi dan tidak boleh bernilai negatif.
  price: {
    type: Number,
    required: [true, 'Harga item wajib diisi.'],
    min: [0, 'Harga tidak boleh negatif.']
  },

  // (Opsional) URL ke gambar atau ikon untuk item.
  imageUrl: {
    type: String,
    trim: true,
    default: '' // URL gambar default atau kosong
  }
}, { timestamps: true });

// Membuat model 'Item' dari skema yang telah didefinisikan.
const Item = mongoose.model('Item', itemSchema);

// Mengekspor model Item agar bisa digunakan di file lain (misalnya, di controller toko)
module.exports = Item;
