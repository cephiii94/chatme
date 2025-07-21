const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const verifyToken = require('../middleware/auth.middleware');

// --- Definisi Rute Chat ---

// Rute: POST /api/chat/ai
// Deskripsi: Mengirim pesan ke AI dan mendapatkan balasan.
// Middleware: verifyToken
router.post('/ai', verifyToken, chatController.chatWithAI);

// Rute: POST /api/chat/log-p2p
// Deskripsi: Mencatat pengiriman pesan P2P dan memberikan hadiah koin.
// Middleware: verifyToken
router.post('/log-p2p', verifyToken, chatController.logP2PMessage);

module.exports = router;
