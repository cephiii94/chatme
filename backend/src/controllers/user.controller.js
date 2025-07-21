// Mengimpor model User
const User = require('../models/user.model');

// --- Fungsi untuk Mendapatkan Profil Pengguna yang Sedang Login ---
// Fungsi ini mengambil data pengguna berdasarkan ID yang tersimpan di token JWT.
exports.getMe = async (req, res) => {
  try {
    // 1. Dapatkan ID pengguna dari token yang sudah diverifikasi oleh middleware otentikasi.
    //    Middleware akan melampirkan data pengguna ke `req.user`.
    const userId = req.user.id;

    // 2. Cari pengguna di database berdasarkan ID.
    //    `.select('-password')` digunakan untuk mengecualikan field password dari hasil query
    //    demi keamanan, agar hash password tidak pernah dikirim ke klien.
    const user = await User.findById(userId).select('-password');

    // 3. Jika pengguna tidak ditemukan (misalnya, token valid tapi user sudah dihapus)
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    // 4. Kirim data pengguna sebagai respons
    res.status(200).json(user);

  } catch (error) {
    // Tangani error server
    console.error('Error saat mengambil data pengguna:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

// --- (Placeholder) Fungsi untuk Mendapatkan Daftar Teman ---
exports.getFriends = async (req, res) => {
    // TODO: Implementasikan logika untuk mengambil daftar teman pengguna.
    res.status(501).json({ message: 'Fitur belum diimplementasikan.' });
};

// --- (Placeholder) Fungsi untuk Menambah Teman ---
exports.addFriend = async (req, res) => {
    // TODO: Implementasikan logika untuk menambah teman baru.
    res.status(501).json({ message: 'Fitur belum diimplementasikan.' });
};
