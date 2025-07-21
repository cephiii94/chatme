import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

// Data simulasi untuk item di toko
const shopItems = [
  { id: 1, name: 'Tema Chat "Galaxy"', description: 'Ubah tampilan chat Anda menjadi luar angkasa.', price: 500, icon: '🌌' },
  { id: 2, name: 'Stiker Pack "Kucing Lucu"', description: 'Ekspresikan diri dengan stiker kucing menggemaskan.', price: 250, icon: '😻' },
  { id: 3, name: 'Efek Suara "Retro"', description: 'Notifikasi dengan suara game 8-bit.', price: 300, icon: '👾' },
  { id: 4, name: 'Bingkai Avatar "Emas"', description: 'Tunjukkan status premium Anda dengan bingkai emas.', price: 1000, icon: '🖼️' },
];

// Data pengguna simulasi
const currentUser = {
  coins: 1337,
};

export default function ShopPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userCoins, setUserCoins] = useState(currentUser.coins);

  const handleBuyClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    if (!selectedItem) return;

    if (userCoins >= selectedItem.price) {
      setUserCoins(userCoins - selectedItem.price);
      alert(`Anda berhasil membeli ${selectedItem.name}!`);
    } else {
      alert('Koin Anda tidak cukup.');
    }
    
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Toko Item</h1>
          <div className="text-lg font-semibold bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg">
            Koin Anda: {userCoins} 💰
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shopItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col text-center items-center">
              <div className="text-6xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-600 mt-2 flex-grow">{item.description}</p>
              <p className="text-2xl font-bold text-blue-600 my-4">{item.price} Koin</p>
              <Button onClick={() => handleBuyClick(item)} variant="primary">
                Beli
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Konfirmasi Pembelian */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Konfirmasi Pembelian"
      >
        {selectedItem && (
          <div>
            <p className="text-gray-700">
              Apakah Anda yakin ingin membeli <strong>{selectedItem.name}</strong> seharga <strong>{selectedItem.price} koin</strong>?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
              <Button variant="primary" onClick={handleConfirmPurchase}>Yakin & Beli</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
