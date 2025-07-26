import React, { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import Notification from '../components/ui/Notification.jsx';
import { WARNA_NAMA_MAP } from '../context/AppearanceContext.jsx';

// Daftar item yang dijual di toko, termasuk item tema baru
const shopItems = [
  // tema
  { id: 'tm-01', name: 'Tema "Gelap"', price: 500, icon: '🌙', category: 'tampilan', subCategory: 'tema' },
  { id: 'tm-02', name: 'Tema "Galaxy"', price: 500, icon: '🌌', category: 'tampilan', subCategory: 'tema' },
  { id: 'tm-03', name: 'Tema "Soft Blue"', price: 600, icon: '💙', category: 'tampilan', subCategory: 'tema' },
 
  // warna nama
  { id: 'wn-01', name: 'Warna Nama "Pelangi"', price: 750, icon: '🌈', category: 'tampilan', subCategory: 'warna nama' },
  { id: 'wn-02', name: 'Warna Nama "Biru"', price: 700, icon: '🔵', category: 'tampilan', subCategory: 'warna nama' },
  { id: 'wn-03', name: 'Warna Nama "Hijau"', price: 700, icon: '🟢', category: 'tampilan', subCategory: 'warna nama' },

  // gelembung chat
  { id: 'boob-01', name: 'Gelembung "Komik"', price: 350, icon: '💥', category: 'tampilan', subCategory: 'gelembung chat' },

  // avatar
  { id: 'ava-01', name: 'Avatar "Astronot"', price: 400, icon: '👨‍🚀', category: 'tampilan', subCategory: 'avatar' },

  // border
  { id: 'border-01', name: 'Bingkai "Emas"', price: 1000, icon: '🖼️', category: 'tampilan', subCategory: 'border' },
  { id: 'border-02', name: 'Bingkai "Api"', price: 1200, icon: '🔥', category: 'tampilan', subCategory: 'border' },

  // notif
  { id: 'not-01', name: 'Notif "Retro"', price: 300, icon: '👾', category: 'suara', subCategory: 'notif' },

  //efek
  { id: 'ef-01', name: 'Efek "Tawa Jahat"', price: 100, icon: '😂', category: 'suara', subCategory: 'efek' },

  // stiker
  { id: 'stk-01', name: 'Stiker "Kucing Lucu"', price: 250, icon: '😻', category: 'sosial', subCategory: 'stiker' },

  //imoji
  { id: 'emj-01', name: 'Emoji "Gamer"', price: 200, icon: '🎮', category: 'sosial', subCategory: 'imoji' },

  // hadiah
  { id: 'rew-01', name: 'Hadiah "Mawar"', price: 50, icon: '🌹', category: 'sosial', subCategory: 'hadiah' },

  // adds-on
  { id: 'adds-01', name: 'Slot Teman (+5)', price: 1500, icon: '➕', category: 'sosial', subCategory: 'adds-on' },
];

const categories = {
  tampilan: { label: 'Tampilan', sub: ['semua', 'tema', 'avatar', 'border', 'gelembung chat', 'warna nama'] },
  suara: { label: 'Suara', sub: ['semua', 'notif', 'efek'] },
  sosial: { label: 'Sosial', sub: ['semua', 'imoji', 'stiker', 'hadiah', 'adds-on'] },
};

export default function ShopPage() {
  const { profile, inventory, updateCoins, addItemToInventory } = useUser();
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
    const isRebuyable = selectedItem.subCategory === 'hadiah' || selectedItem.subCategory === 'adds-on';

    if (isOwned && !isRebuyable) {
      setNotification({ message: 'Anda sudah memiliki item ini.', type: 'info' });
    } else if (profile.coins >= selectedItem.price) {
      const newCoinBalance = profile.coins - selectedItem.price;
      updateCoins(newCoinBalance);
      addItemToInventory(selectedItem);
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
          const isRebuyable = item.subCategory === 'hadiah' || item.subCategory === 'adds-on';
          const canPurchase = !isOwned || isRebuyable;
          return (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col text-center items-center">
              <div className="text-6xl mb-4">{item.icon}</div>
              {/* Preview warna nama jika item warna nama */}
              {item.subCategory === 'warna nama' && item.id === 'wn-01' ? (
                <h3 className="text-xl font-bold rainbow-text">{item.name}</h3>
              ) : item.subCategory === 'warna nama' ? (
                <h3 className="text-xl font-bold" style={{ color: WARNA_NAMA_MAP[item.id] || undefined }}>{item.name}</h3>
              ) : (
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{item.name}</h3>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-2">({item.subCategory})</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 my-4">{item.price} Koin</p>
              <Button
                onClick={() => { setSelectedItem(item); setIsModalOpen(true); }}
                variant="primary"
                disabled={!canPurchase}
                className={!canPurchase ? 'bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed' : ''}
              >
                {canPurchase ? 'Beli' : 'Dimiliki'}
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
