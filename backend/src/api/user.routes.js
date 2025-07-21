const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware'); // Impor middleware

// --- Definisi Rute Pengguna ---

// Rute: GET /api/users/me
// Deskripsi: Mendapatkan profil pengguna yang sedang login.
// Middleware: verifyToken (Memastikan hanya pengguna terautentikasi yang bisa akses)
router.get('/me', verifyToken, userController.getMe);

// TODO: Tambahkan rute untuk teman (friends) di sini
// router.get('/friends', verifyToken, userController.getFriends);
// router.post('/friends', verifyToken, userController.addFriend);

module.exports = router;
