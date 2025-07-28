import React, { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { useAppearance, WARNA_NAMA_MAP, AVATAR_MAP, THEME_CONFIG } from '../context/AppearanceContext.jsx'; // Import useAppearance
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import Notification from '../components/ui/Notification.jsx';
import Avatar from '../components/ui/Avatar.jsx';

// Daftar item yang dijual di toko, pastikan item neon sudah ada
const shopItems = [
  // tema
  { id: 'tm-01', name: 'Tema "Gelap"', price: 500, icon: '🌙', category: 'tampilan', subCategory: 'tema' },
  { id: 'tm-02', name: 'Tema "Galaxy"', price: 500, icon: '🌌', category: 'tampilan', subCategory: 'tema' },
  { id: 'tm-03', name: 'Tema "Soft Blue"', price: 600, icon: '💙', category: 'tampilan', subCategory: 'tema' },
 
  // warna nama
  { id: 'wn-01', name: 'Warna Nama "Pelangi"', price: 750, icon: '🌈', category: 'tampilan', subCategory: 'warna nama' },
  { id: 'wn-02', name: 'Warna Nama "Biru"', price: 700, icon: '🔵', category: 'tampilan', subCategory: 'warna nama' },
  { id: 'wn-03', name: 'Warna Nama "Hijau"', price: 700, icon: '🟢', category: 'tampilan', subCategory: 'warna nama' },
  { id: 'wn-04', name: 'Warna Nama "Ungu"', price: 700, icon: '🟣', category: 'tampilan', subCategory: 'warna nama' },
  { id: 'wn-05', name: 'Warna Nama "Neon Glow"', price: 1500, icon: '❇️', category: 'tampilan', subCategory: 'warna nama' },

  // avatar
  { id: 'ava-01', name: 'Avatar "Astronot"', price: 400, icon: '👨‍🚀', category: 'tampilan', subCategory: 'avatar' },
  { id: 'ava-02', name: 'Avatar "Kucing"', price: 350, icon: '🐱', category: 'tampilan', subCategory: 'avatar' },
  { id: 'ava-03', name: 'Avatar "Kustom"', price: 500, icon: '🖼️', category: 'tampilan', subCategory: 'avatar' },

  // ... item lainnya
];

const categories = {
  tampilan: { label: 'Tampilan', sub: ['semua', 'tema', 'avatar', 'border', 'gelembung chat', 'warna nama'] },
  suara: { label: 'Suara', sub: ['semua', 'notif', 'efek'] },
  sosial: { label: 'Sosial', sub: ['semua', 'imoji', 'stiker', 'hadiah', 'adds-on'] },
};

export default function ShopPage() {
  const { profile, inventory, updateCoins, addItemToInventory } = useUser();
  const { setAppearance } = useAppearance(); // Dapatkan setAppearance dari AppearanceContext
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [notification, setNotification] = useState(null);
  const [activeCategory, setActiveCategory] = useState('tampilan');
  const [activeSubCategory, setActiveSubCategory] = useState('semua');

  if (!profile) {
    return <div className="p-6">Memuat data toko...</div>;
  }

  const handleCategoryClick = (categoryKey) => {
    setActiveCategory(categoryKey);
    setActiveSubCategory('semua');
  };

  const handleConfirmPurchase = () => {
    if (!selectedItem) return;

    const isOwned = inventory.some(invItem => invItem.id === selectedItem.id);
    if (isOwned) {
      setNotification({ message: 'Anda sudah memiliki item ini.', type: 'info' });
    } else if (profile.coins >= selectedItem.price) {
      updateCoins(profile.coins - selectedItem.price);
      addItemToInventory(selectedItem);
      
      // PENTING: Tambahkan logika ini untuk menerapkan tema/tampilan setelah pembelian
      if (selectedItem.subCategory === 'tema' || 
          selectedItem.subCategory === 'warna nama' || 
          selectedItem.subCategory === 'avatar' || 
          selectedItem.subCategory === 'border' || 
          selectedItem.subCategory === 'gelembung chat'
      ) {
        setAppearance(selectedItem.subCategory, selectedItem.id);
      }

      setNotification({ message: `Anda berhasil membeli ${selectedItem.name}!`, type: 'success' });
    } else {
      setNotification({ message: 'Koin Anda tidak cukup.', type: 'error' });
    }
    
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const filteredItems = shopItems.filter(item => {
    if (item.category !== activeCategory) return false;
    if (activeSubCategory !== 'semua' && item.subCategory !== activeSubCategory) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-6 py-8 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300">Toko Item</h1>
        <div className="text-lg font-semibold bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg">
          Koin Anda: {profile.coins} 💰
        </div>
      </div>

      {/* UI FILTER */}
      <div className="mb-4 flex space-x-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        {Object.keys(categories).map(key => (
            <button key={key} onClick={() => handleCategoryClick(key)} className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeCategory === key ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                {categories[key].label}
            </button>
        ))}
      </div>
      <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
        {categories[activeCategory].sub.map(subKey => (
            <button key={subKey} onClick={() => setActiveSubCategory(subKey)} className={`px-4 py-2 text-xs font-medium rounded-full transition-colors flex-shrink-0 ${activeSubCategory === subKey ? 'bg-gray-700 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                {subKey.replace(/ /g, '-')}
            </button>
        ))}
      </div>
      
      {/* GRID ITEM */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const isOwned = inventory.some(invItem => invItem.id === item.id);
          return (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col text-center items-center">
              {item.subCategory === 'avatar' ? (
                <div className="mb-4">
                  <Avatar username={profile.username} avatarId={item.id} size="xl" />
                </div>
              ) : (
                <div className="text-6xl mb-4">{item.icon}</div>
              )}
              
              {/* ======================= PERUBAHAN UTAMA DI SINI ======================= */}
              {item.subCategory === 'warna nama' ? (() => {
                  const styleInfo = WARNA_NAMA_MAP[item.id];
                  if (styleInfo && styleInfo.type === 'class') {
                      return <h3 className={`text-xl font-bold ${styleInfo.value}`}>{item.name}</h3>;
                  }
                  return <h3 className="text-xl font-bold" style={{ color: styleInfo ? styleInfo.value : undefined }}>{item.name}</h3>;
              })() : (
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{item.name}</h3>
              )}
              {/* ======================================================================= */}

              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-2">({item.subCategory})</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 my-4">{item.price} Koin</p>
              <Button
                onClick={() => { setSelectedItem(item); setIsModalOpen(true); }}
                variant="primary"
                disabled={isOwned}
                className={isOwned ? 'bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed' : ''}
              >
                {isOwned ? 'Dimiliki' : 'Beli'}
              </Button>
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Konfirmasi Pembelian">
        {selectedItem && (
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              Apakah Anda yakin ingin membeli <strong>{selectedItem.name}</strong> seharga <strong>{selectedItem.price} koin</strong>?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
              <Button variant="primary" onClick={handleConfirmPurchase}>Yakin & Beli</Button>
            </div>
          </div>
        )}
      </Modal>

      <Notification notification={notification} onClear={() => setNotification(null)} />
    </div>
  );
}
