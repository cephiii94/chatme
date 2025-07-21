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
// Catatan: Fungsi ini mengasumsikan Anda memiliki middleware otentikasi
// yang memverifikasi JWT dan melampirkan data pengguna (seperti ID) ke objek `req`.
exports.buyItem = async (req, res) => {
  try {
    // 1. Dapatkan ID item dari parameter URL (e.g., /api/shop/buy/item-id-disini)
    const { itemId } = req.params;
    // 2. Dapatkan ID pengguna dari token JWT yang sudah diverifikasi oleh middleware
    const userId = req.user.id;

    // 3. Cari item dan pengguna secara bersamaan untuk efisiensi
    const [item, user] = await Promise.all([
      Item.findById(itemId),
      User.findById(userId)
    ]);

    // 4. Validasi apakah item dan pengguna ditemukan
    if (!item) {
      return res.status(404).json({ message: 'Item tidak ditemukan.' });
    }
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    // 5. Periksa apakah pengguna memiliki cukup koin
    if (user.coins < item.price) {
      return res.status(400).json({ message: 'Koin Anda tidak cukup untuk membeli item ini.' });
    }

    // 6. Kurangi koin pengguna dengan harga item
    user.coins -= item.price;

    // TODO: Tambahkan logika untuk menambahkan item ke inventaris pengguna.
    // Saat ini, kita belum memiliki skema inventaris, jadi kita hanya mengurangi koin.
    // Contoh: user.inventory.push(item._id);

    // 7. Simpan perubahan pada data pengguna ke database
    await user.save();

    // 8. Kirim respons berhasil beserta jumlah koin terbaru
    res.status(200).json({
      message: `Pembelian '${item.name}' berhasil!`,
      newCoinBalance: user.coins
    });

  } catch (error) {
    // Tangani error server
    console.error('Error saat membeli item:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server saat proses pembelian.' });
  }
};
