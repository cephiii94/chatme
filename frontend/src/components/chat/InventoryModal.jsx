import React, { useState } from 'react';
import Modal from '../ui/Modal';

// Data simulasi inventaris pengguna yang lebih lengkap
const userInventory = [
  { id: 8, name: 'Emoji "Gamer"', icon: '🎮', type: 'imoji' },
  { id: 14, name: 'Emoji "Hati"', icon: '❤️', type: 'imoji' },
  { id: 15, name: 'Emoji "Tertawa"', icon: '😂', type: 'imoji' },
  { id: 2, name: 'Stiker "Kucing"', icon: '😻', type: 'stiker' },
  { id: 16, name: 'Stiker "Anjing"', icon: '🐶', type: 'stiker' },
  { id: 13, name: 'Efek "Tawa Jahat"', icon: '😈', type: 'suara' },
  { id: 17, name: 'Efek "Drum"', icon: '🥁', type: 'suara' },
  { id: 10, name: 'Hadiah "Mawar"', icon: '🌹', type: 'hadiah' },
  { id: 18, name: 'Hadiah "Kopi"', icon: '☕', type: 'hadiah' },
];

// --- PERUBAHAN DI SINI: Ikon diubah menjadi emoji ---
const mainTabs = [
    { key: 'stiker', icon: '🖼️' },
    { key: 'imoji', icon: '😀' },
    { key: 'suara', icon: '🔊' },
    { key: 'hadiah', icon: '🎁' },
];

const InventoryModal = ({ isOpen, onClose, onSelectItem }) => {
  const [activeTab, setActiveTab] = useState('stiker');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = userInventory.filter(item => 
    item.type === activeTab && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // --- PERUBAHAN DI SINI: Menambahkan prop `hideHeader={true}` ---
    // Properti ini akan kita gunakan untuk memberitahu Modal agar tidak menampilkan header
    <Modal isOpen={isOpen} onClose={onClose} hideHeader={true}>
      <div className="flex flex-col h-96">
        {/* Header dengan Tab Ikon (sekarang menjadi bagian dari konten modal) */}
        <div className="flex-shrink-0 flex items-center justify-between p-2 border-b">
          <div className="flex space-x-2">
            {mainTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`p-2 rounded-lg ${activeTab === tab.key ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <span className="text-2xl">{tab.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Kolom Pencarian */}
        <div className="flex-shrink-0 p-2">
          <input 
            type="text"
            placeholder={`Cari ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Konten Grid Item */}
        <div className="flex-grow overflow-y-auto p-2">
          <div className="grid grid-cols-5 gap-2">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer aspect-square"
              >
                <div className="text-4xl">{item.icon}</div>
                <p className="text-xs text-center mt-1 truncate w-full">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InventoryModal;
