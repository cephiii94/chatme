const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop.controller');
const verifyToken = require('../middleware/auth.middleware');

// --- Definisi Rute Toko ---

// Rute: GET /api/shop/items
// Deskripsi: Menampilkan semua item yang tersedia di toko. (Publik)
router.get('/items', shopController.getShopItems);

// Rute: POST /api/shop/buy/:itemId
// Deskripsi: Memproses pembelian item oleh pengguna.
// Middleware: verifyToken (Hanya pengguna terautentikasi yang bisa membeli)
router.post('/buy/:itemId', verifyToken, shopController.buyItem);

module.exports = router;
