import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { useUser } from '../../context/UserContext.jsx';

// Tab untuk kategori item di dalam modal
const mainTabs = [
    { key: 'stiker', icon: '🖼️', label: 'Stiker' },
    { key: 'imoji', icon: '😀', label: 'Emoji' },
    { key: 'efek', icon: '🔊', label: 'Efek Suara' },
    { key: 'hadiah', icon: '🎁', label: 'Hadiah' },
];

const InventoryModal = ({ isOpen, onClose, onSelectItem }) => {
  const { inventory } = useUser(); 
  
  const [activeTab, setActiveTab] = useState('stiker');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Logika untuk mengelompokkan item yang sama (hadiah, dll.)
  const processedInventory = (inventory || []).reduce((acc, item) => {
    const isStackable = item.subCategory === 'hadiah' || item.subCategory === 'adds-on';

    if (isStackable) {
      const existingItem = acc.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
    } else {
      // Untuk item yang tidak bisa ditumpuk, anggap kuantitasnya 1
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // 2. Filter item dari inventaris yang sudah diproses
  const filteredItems = processedInventory.filter(item => 
    item.subCategory === activeTab && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideHeader={true}>
      <div className="flex flex-col h-96 bg-white rounded-lg">
        {/* Header dengan Tab Ikon */}
        <div className="flex-shrink-0 flex items-center justify-between p-2 border-b">
          <div className="flex space-x-2">
            {mainTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`p-2 rounded-lg transition-colors ${activeTab === tab.key ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                title={tab.label}
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
            placeholder={`Cari di ${mainTabs.find(t => t.key === activeTab)?.label || 'Inventaris'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Konten Grid Item */}
        <div className="flex-grow overflow-y-auto p-2">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {filteredItems.map(item => (
                <div
                  key={`${item.id}-${item.name}`}
                  onClick={() => onSelectItem(item)}
                  className="relative flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer aspect-square"
                  title={item.name}
                >
                  {/* 3. Tampilkan badge kuantitas jika lebih dari 1 */}
                  {item.quantity > 1 && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full z-10">
                      {item.quantity}
                    </div>
                  )}
                  <div className="text-4xl">{item.icon}</div>
                  <p className="text-xs text-center mt-1 truncate w-full">{item.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Tidak ada item di kategori ini.</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default InventoryModal;
