// Mengimpor model User, pustaka axios, dan dotenv
const User = require('../models/user.model');
const axios = require('axios');
require('dotenv').config();

// --- Fungsi untuk Berinteraksi dengan PuterAI ---
exports.chatWithAI = async (req, res) => {
  try {
    // 1. Dapatkan pesan dari body permintaan pengguna
    const { message } = req.body;
    const userId = req.user.id; // Didapat dari middleware otentikasi

    // 2. Validasi input
    if (!message) {
      return res.status(400).json({ message: 'Pesan tidak boleh kosong.' });
    }

    // 3. Ambil API Key dari variabel lingkungan
    const apiKey = process.env.PUTERAI_API_KEY;
    if (!apiKey) {
      console.error('PUTERAI_API_KEY tidak ditemukan di file .env');
      return res.status(500).json({ message: 'Konfigurasi server AI tidak lengkap.' });
    }

    // 4. Kirim permintaan ke API Puter.ai menggunakan axios
    //    Catatan: Ganti URL endpoint ini dengan URL API Puter.ai yang sebenarnya.
    const response = await axios.post(
      'https://api.puter.ai/v1/chat/completions', // Contoh URL, harap disesuaikan
      {
        model: 'puter-ai-model-terbaru', // Contoh model, harap disesuaikan
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // 5. Ekstrak respons dari AI
    const aiResponse = response.data.choices[0].message.content;

    // 6. Kirim balasan AI ke klien
    res.status(200).json({ reply: aiResponse });

  } catch (error) {
    // Tangani error, baik dari axios maupun error server lainnya
    console.error('Error saat berkomunikasi dengan AI:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Gagal mendapatkan respons dari AI.' });
  }
};

// --- Fungsi untuk Mencatat Pesan P2P dan Memberi Koin ---
// Fungsi ini dipanggil setiap kali pengguna berhasil mengirim pesan ke pengguna lain.
exports.logP2PMessage = async (req, res) => {
  try {
    // 1. Dapatkan ID pengguna dari token JWT yang sudah diverifikasi
    const userId = req.user.id;

    // 2. Cari pengguna dan perbarui jumlah koin mereka
    //    `findByIdAndUpdate` menemukan dokumen dan memperbaruinya dalam satu operasi atomik.
    //    `$inc` adalah operator MongoDB untuk menambah nilai sebuah field.
    //    `{ new: true }` memastikan dokumen yang dikembalikan adalah versi setelah diperbarui.
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { coins: 1 } }, // Tambah koin sebanyak 1
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    // 3. Kirim respons berhasil beserta jumlah koin terbaru
    res.status(200).json({
      message: 'Pesan terkirim dan Anda mendapatkan 1 koin!',
      newCoinBalance: updatedUser.coins,
    });

  } catch (error) {
    // Tangani error server
    console.error('Error saat memberi koin untuk pesan P2P:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};
