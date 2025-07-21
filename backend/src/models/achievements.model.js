// Mengimpor Mongoose untuk mendefinisikan skema dan model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mendefinisikan Skema Pencapaian (achievementSchema)
const achievementSchema = new Schema({
  // Nama unik untuk pencapaian.
  name: {
    type: String,
    required: [true, 'Nama pencapaian wajib diisi.'],
    unique: true,
    trim: true
  },

  // Deskripsi tentang bagaimana cara mendapatkan pencapaian ini.
  description: {
    type: String,
    required: [true, 'Deskripsi pencapaian wajib diisi.'],
    trim: true
  },

  // (Opsional) URL ke ikon atau lencana untuk pencapaian.
  iconUrl: {
    type: String,
    trim: true,
    default: '' // URL ikon default atau kosong
  },
  
  // Kriteria untuk membuka pencapaian.
  // Bisa berupa string deskriptif atau objek yang lebih kompleks jika diperlukan.
  criteria: {
    type: String,
    required: [true, 'Kriteria pencapaian wajib diisi.']
  }
}, { timestamps: true });

// Membuat model 'Achievement' dari skema yang telah didefinisikan.
const Achievement = mongoose.model('Achievement', achievementSchema);

// Mengekspor model Achievement
module.exports = Achievement;
