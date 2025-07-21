// Mengimpor model User, pustaka bcrypt, jwt, dan dotenv
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Memuat variabel lingkungan

// --- Fungsi untuk Registrasi Pengguna Baru ---
exports.register = async (req, res) => {
  try {
    // 1. Mengambil username, email, dan password dari body permintaan
    const { username, email, password } = req.body;

    // 2. Validasi input dasar
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi.' });
    }

    // 3. Cek apakah email atau username sudah ada di database
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Email atau username sudah digunakan.' });
    }

    // 4. Hash kata sandi sebelum disimpan
    // 'salt' adalah string acak yang ditambahkan ke kata sandi untuk membuatnya lebih aman.
    // Angka 12 adalah 'cost factor', semakin tinggi semakin aman tapi semakin lambat.
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Buat instance pengguna baru dengan kata sandi yang sudah di-hash
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // 6. Simpan pengguna baru ke database
    const savedUser = await newUser.save();

    // 7. Buat JSON Web Token (JWT)
    const token = jwt.sign(
      { id: savedUser._id, username: savedUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token berlaku selama 1 hari
    );

    // 8. Kirim token sebagai respons
    res.status(201).json({
      message: 'Registrasi berhasil!',
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
    });

  } catch (error) {
    // Tangani error server
    console.error('Error saat registrasi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
  }
};

// --- Fungsi untuk Login Pengguna ---
exports.login = async (req, res) => {
  try {
    // 1. Mengambil email dan password dari body permintaan
    const { email, password } = req.body;

    // 2. Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi.' });
    }

    // 3. Cari pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      // Jangan beri tahu penyerang apakah email yang salah atau passwordnya
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // 4. Bandingkan password yang diberikan dengan hash di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // 5. Jika cocok, buat JWT baru
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 6. Kirim token sebagai respons
    res.status(200).json({
      message: 'Login berhasil!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        coins: user.coins
      }
    });

  } catch (error) {
    // Tangani error server
    console.error('Error saat login:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
  }
};
