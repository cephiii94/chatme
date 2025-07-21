// Mengimpor Express Router untuk membuat modul rute
const express = require('express');
const router = express.Router();

// Mengimpor controller otentikasi yang berisi logika untuk register dan login
const authController = require('../controllers/auth.controller');

// --- Definisi Rute Otentikasi ---

// Rute: POST /api/auth/register
// Deskripsi: Menerima data pengguna baru (username, email, password) dan mendaftarkannya.
// Controller: authController.register
router.post('/register', authController.register);

// Rute: POST /api/auth/login
// Deskripsi: Menerima kredensial pengguna (email, password) dan mengautentikasinya.
// Controller: authController.login
router.post('/login', authController.login);

// Mengekspor router agar bisa digunakan di file utama server.js
module.exports = router;
