const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware untuk memverifikasi token JWT
const verifyToken = (req, res, next) => {
  // Ambil token dari header 'Authorization'
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(403).json({ message: 'Token tidak tersedia. Akses ditolak.' });
  }

  try {
    // Verifikasi token menggunakan secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Lampirkan payload dari token (misalnya, id dan username) ke objek request
    req.user = decoded;
    next(); // Lanjutkan ke controller selanjutnya
  } catch (error) {
    console.error('Token tidak valid:', error);
    return res.status(401).json({ message: 'Token tidak valid atau sudah kedaluwarsa.' });
  }
};

module.exports = verifyToken;
