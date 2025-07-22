import React, { useState } from 'react';
import Modal from '../ui/Modal';

// Data simulasi inventaris pengguna
const userInventory = [
  { id: 8, name: 'Emoji "Gamer"', icon: '🎮', type: 'imoji' },
  { id: 2, name: 'Stiker "Kucing"', icon: '😻', type: 'stiker' },
  { id: 13, name: 'Efek "Tawa Jahat"', icon: '😂', type: 'suara' },
  { id: 10, name: 'Hadiah "Mawar"', icon: '🌹', type: 'hadiah' },
];

const InventoryModal = ({ isOpen, onClose, onSelectItem }) => {
  const [activeTab, setActiveTab] = useState('stiker');

  const tabs = ['stiker', 'imoji', 'suara', 'hadiah'];
  const filteredItems = userInventory.filter(item => item.type === activeTab);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pilih Item dari Inventaris">
      <div>
        {/* Tab untuk Kategori Item */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Daftar Item */}
        <div className="grid grid-cols-4 gap-4" style={{ minHeight: '200px' }}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="text-4xl">{item.icon}</div>
              <p className="text-xs text-center mt-1">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default InventoryModal;
