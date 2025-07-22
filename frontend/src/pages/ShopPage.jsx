import React, { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import Notification from '../components/ui/notification.jsx';

// Data simulasi untuk item di toko dengan struktur kategori baru
const shopItems = [
  { id: 1, name: 'Tema "Galaxy"', price: 500, icon: '🌌', category: 'tampilan', subCategory: 'tema' },
  { id: 5, name: 'Warna Nama "Pelangi"', price: 750, icon: '🌈', category: 'tampilan', subCategory: 'warna nama' },
  { id: 7, name: 'Gelembung "Komik"', price: 350, icon: '💥', category: 'tampilan', subCategory: 'gelembung chat' },
  { id: 12, name: 'Avatar "Astronot"', price: 400, icon: '👨‍🚀', category: 'tampilan', subCategory: 'avatar' },
  { id: 4, name: 'Bingkai "Emas"', price: 1000, icon: '🖼️', category: 'tampilan', subCategory: 'border' },
  { id: 6, name: 'Bingkai "Api"', price: 1200, icon: '🔥', category: 'tampilan', subCategory: 'border' },
  { id: 3, name: 'Notif "Retro"', price: 300, icon: '👾', category: 'suara', subCategory: 'notif' },
  { id: 13, name: 'Efek "Tawa Jahat"', price: 100, icon: '😂', category: 'suara', subCategory: 'efek' },
  { id: 2, name: 'Stiker "Kucing Lucu"', price: 250, icon: '😻', category: 'sosial', subCategory: 'stiker' },
  { id: 8, name: 'Emoji "Gamer"', price: 200, icon: '🎮', category: 'sosial', subCategory: 'imoji' },
  { id: 10, name: 'Hadiah "Mawar"', price: 50, icon: '🌹', category: 'sosial', subCategory: 'hadiah' },
  { id: 9, name: 'Slot Teman (+5)', price: 1500, icon: '➕', category: 'sosial', subCategory: 'adds-on' },
];

// Struktur kategori dan sub-kategori untuk filter
const categories = {
  tampilan: { label: 'Tampilan', sub: ['semua', 'tema', 'avatar', 'border', 'gelembung chat', 'warna nama'] },
  suara: { label: 'Suara', sub: ['semua', 'notif', 'efek'] },
  sosial: { label: 'Sosial', sub: ['semua', 'imoji', 'stiker', 'hadiah', 'adds-on'] },
};

export default function ShopPage() {
  const { profile, updateCoins } = useUser();
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
    setActiveSubCategory('semua'); // Reset sub-kategori saat kategori utama berubah
  };

  const filteredItems = shopItems.filter(item => {
    if (item.category !== activeCategory) return false;
    if (activeSubCategory !== 'semua' && item.subCategory !== activeSubCategory) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Toko Item</h1>
        <div className="text-lg font-semibold bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg">
          Koin Anda: {profile.coins} 💰
        </div>
      </div>

      {/* Filter Kategori Utama */}
      <div className="mb-4 flex space-x-2 border-b pb-2">
        {Object.keys(categories).map(key => (
            <button
                key={key}
                onClick={() => handleCategoryClick(key)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                    activeCategory === key 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
                {categories[key].label}
            </button>
        ))}
      </div>

      {/* Filter Sub-kategori */}
      <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
        {categories[activeCategory].sub.map(subKey => (
            <button
                key={subKey}
                onClick={() => setActiveSubCategory(subKey)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-colors flex-shrink-0 ${
                    activeSubCategory === subKey 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
                {subKey.replace(/ /g, '-')}
            </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col text-center items-center">
            <div className="text-6xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500 capitalize mb-2">({item.subCategory})</p>
            <p className="text-2xl font-bold text-blue-600 my-4">{item.price} Koin</p>
            <Button onClick={() => { setSelectedItem(item); setIsModalOpen(true); }} variant="primary">
              Beli
            </Button>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Konfirmasi Pembelian">
        {selectedItem && (
          <div>
            <p className="text-gray-700">
              Apakah Anda yakin ingin membeli <strong>{selectedItem.name}</strong> seharga <strong>{selectedItem.price} koin</strong>?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
              <Button variant="primary" onClick={() => {
                  if (profile.coins >= selectedItem.price) {
                    updateCoins(profile.coins - selectedItem.price);
                    setNotification({ message: `Pembelian '${selectedItem.name}' berhasil!`, type: 'success' });
                  } else {
                    setNotification({ message: 'Koin Anda tidak cukup.', type: 'error' });
                  }
                  setIsModalOpen(false);
              }}>Yakin & Beli</Button>
            </div>
          </div>
        )}
      </Modal>

      <Notification notification={notification} onClear={() => setNotification(null)} />
    </div>
  );
}
