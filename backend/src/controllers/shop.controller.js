// Mengimpor model Item dan User
const Item = require('../models/item.model');
const User = require('../models/user.model');

// --- Fungsi untuk Mendapatkan Semua Item di Toko ---
exports.getShopItems = async (req, res) => {
  try {
    // 1. Cari semua dokumen dalam koleksi 'items'
    const items = await Item.find({});

    // 2. Kirim daftar item sebagai respons JSON
    res.status(200).json(items);
  } catch (error) {
    // Tangani error server
    console.error('Error saat mengambil item toko:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server saat mengambil item.' });
  }
};

// --- Fungsi untuk Membeli Item ---
exports.buyItem = async (req, res) => {
  try {
    // Dapatkan ID item dari request body
    const { itemId } = req.body; 
    // Dapatkan ID pengguna dari token JWT yang sudah diverifikasi
    const userId = req.user.id;

    // Cari item dan pengguna secara bersamaan untuk efisiensi
    const [item, user] = await Promise.all([
      Item.findById(itemId),
      User.findById(userId)
    ]);

    // Validasi apakah item dan pengguna ditemukan
    if (!item) {
      return res.status(404).json({ message: 'Item tidak ditemukan.' });
    }
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    // --- LOGIKA UTAMA DIMULAI DI SINI ---

    // 1. Tentukan kategori item yang dapat dibeli berulang kali
    const reusableCategories = ['Hadiah', 'Adds-On'];

    // 2. Periksa apakah item ini dapat dibeli berulang kali
    const isReusable = reusableCategories.includes(item.category);

    // 3. Jika BUKAN item yang bisa dibeli ulang, periksa apakah pengguna sudah memilikinya
    if (!isReusable && user.inventory.includes(itemId)) {
      return res.status(400).json({ message: 'Anda sudah memiliki item ini.' });
    }

    // 4. Periksa apakah pengguna memiliki cukup koin
    if (user.coins < item.price) {
      return res.status(400).json({ message: 'Koin Anda tidak cukup untuk membeli item ini.' });
    }

    // 5. Lanjutkan transaksi
    user.coins -= item.price; // Kurangi koin pengguna
    user.inventory.push(item._id); // Tambahkan item ke inventaris pengguna

    // 6. Simpan perubahan pada data pengguna ke database
    await user.save();

    // 7. Kirim respons berhasil
    res.status(200).json({
      message: `Pembelian '${item.name}' berhasil!`,
      user: {
        coins: user.coins,
        inventory: user.inventory
      }
    });

  } catch (error) {
    // Tangani error server
    console.error('Error saat membeli item:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server saat proses pembelian.' });
  }
};