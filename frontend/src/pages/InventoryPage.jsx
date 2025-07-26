import React, { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { useAppearance, WARNA_NAMA_MAP, AVATAR_MAP } from '../context/AppearanceContext.jsx';
import Notification from '../components/ui/Notification.jsx';
import Avatar from '../components/ui/Avatar.jsx';

const categories = {
  tampilan: { label: 'Tampilan', sub: ['semua', 'tema', 'avatar', 'border', 'gelembung chat', 'warna nama'] },
  suara: { label: 'Suara', sub: ['semua', 'notif', 'efek'] },
  sosial: { label: 'Sosial', sub: ['semua', 'imoji', 'stiker', 'hadiah', 'adds-on'] },
};

export default function InventoryPage() {
  const { profile, inventory, consumeItem } = useUser();
  const { activeItems, setAppearance, isLoading } = useAppearance();
  
  const [activeCategory, setActiveCategory] = useState('tampilan');
  const [activeSubCategory, setActiveSubCategory] = useState('semua');
  const [notification, setNotification] = useState(null);

  if (!profile || isLoading) {
    return <div className="p-6 dark:bg-gray-900 dark:text-white">Memuat inventaris...</div>;
  }

  const handleUseAppearanceItem = (item) => {
    console.log('=== KLIK TEMA ===');
    console.log('Item diklik:', item);
    console.log('Current activeItems:', activeItems);
    console.log('Item subCategory:', item.subCategory);
    console.log('Is same as current?', activeItems[item.subCategory] === item.id);
    
    if (activeItems[item.subCategory] === item.id) {
        if (item.id === null) return;
        console.log('Menonaktifkan tema...');
        setAppearance(item.subCategory, null);
        setNotification({ message: `${item.name} telah dinonaktifkan.`, type: 'info' });
    } else {
        console.log('Mengaktifkan tema ID:', item.id, 'subCategory:', item.subCategory);
        setAppearance(item.subCategory, item.id);
        setNotification({ message: `${item.name} telah diaktifkan!`, type: 'success' });
    }
  };

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
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  let filteredInventory = processedInventory.filter(item => {
    if (item.category !== activeCategory) return false;
    if (activeSubCategory !== 'semua' && item.subCategory !== activeSubCategory) return false;
    return true;
  });

  if (activeCategory === 'tampilan') {
    // Default items for tampilan subcategories
    const defaultItems = [
      {
        id: null,
        name: 'Avatar Standar',
        icon: '👤',
        category: 'tampilan',
        subCategory: 'avatar',
      },
      {
        id: null,
        name: 'Border Standar',
        icon: '⬜',
        category: 'tampilan',
        subCategory: 'border',
      },
      {
        id: null,
        name: 'Gelembung Chat Standar',
        icon: '💬',
        category: 'tampilan',
        subCategory: 'gelembung chat',
      },
      {
        id: null,
        name: 'Warna Nama Standar',
        icon: '🔤',
        category: 'tampilan',
        subCategory: 'warna nama',
      },
      {
        id: null,
        name: 'Tema Standar',
        icon: '☀️',
        category: 'tampilan',
        subCategory: 'tema',
      },
    ];
    // Tampilkan item default hanya pada subkategori yang sesuai (bukan 'semua')
    if (activeSubCategory !== 'semua') {
      const match = defaultItems.find(def => def.subCategory === activeSubCategory);
      if (match) {
        filteredInventory = [match, ...filteredInventory.filter(item => !(item.id === null && item.subCategory === match.subCategory))];
      }
    }
  }
  if (activeCategory === 'suara') {
    // Default items for suara subcategories
    const defaultItems = [
      {
        id: null,
        name: 'Notifikasi Standar',
        icon: '🔔',
        category: 'suara',
        subCategory: 'notif',
      },
      {
        id: null,
        name: 'Efek Standar',
        icon: '🎵',
        category: 'suara',
        subCategory: 'efek',
      },
    ];
    if (activeSubCategory !== 'semua') {
      const match = defaultItems.find(def => def.subCategory === activeSubCategory);
      if (match) {
        filteredInventory = [match, ...filteredInventory.filter(item => !(item.id === null && item.subCategory === match.subCategory))];
      }
    }
  }

  return (
    <div className="container mx-auto px-6 py-8 dark:bg-gray-900 min-h-full">
      <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-6">Inventaris Anda</h1>
      
      {/* Debug Info */}
      <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-xs">
        <strong>DEBUG:</strong> Active tema: {activeItems.tema || 'null'} | 
        HTML classes: {document.documentElement.className || 'none'}
      </div>
      
      {/* UI FILTER */}
      <div className="mb-4 flex space-x-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        {Object.keys(categories).map(key => (
            <button key={key} onClick={() => { setActiveCategory(key); setActiveSubCategory('semua'); }} className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeCategory === key ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
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

      {filteredInventory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredInventory.map((item, index) => {
            const isAppearanceItem = item.category === 'tampilan';
            const isConsumable = item.subCategory === 'hadiah' || item.subCategory === 'adds-on';
            const isActive = isAppearanceItem && activeItems[item.subCategory] === item.id;

            let buttonText, buttonAction, buttonDisabled, buttonClass;

            if (isAppearanceItem) {
              buttonText = isActive ? 'Digunakan' : 'Gunakan';
              buttonAction = () => handleUseAppearanceItem(item);
              buttonDisabled = isActive;
              buttonClass = isActive ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600';
            } else if (isConsumable) {
              buttonText = item.subCategory === 'hadiah' ? 'Kirim' : 'Gunakan';
              buttonAction = () => consumeItem(item.id);
              buttonDisabled = false;
              buttonClass = 'bg-blue-500 hover:bg-blue-600';
            } else {
              buttonText = 'Gunakan';
              buttonAction = () => {};
              buttonDisabled = true;
              buttonClass = 'bg-gray-400 cursor-not-allowed';
            }

            return (
              <div key={item.id === null ? 'default-theme' : `${item.id}-${index}`} className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col text-center items-center transform hover:scale-105 transition-transform duration-300">
                {item.quantity > 1 && (<div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">x{item.quantity}</div>)}
                {/* Preview khusus untuk avatar */}
                {item.subCategory === 'avatar' ? (
                  <div className="mb-4">
                    {AVATAR_MAP[item.id]?.type === 'image' ? (
                      // Preview gambar asset
                      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                        <img 
                          src={AVATAR_MAP[item.id].src} 
                          alt={AVATAR_MAP[item.id].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      // Preview emoji atau komponen Avatar
                      <Avatar 
                        username={profile.username}
                        avatarId={item.id}
                        size="xl"
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-6xl mb-4">{item.icon}</div>
                )}
                
                {/* Preview warna nama jika item warna nama */}
                {item.subCategory === 'warna nama' && item.id === 'wn-01' ? (
                  <h3 className="text-xl font-bold rainbow-text">{item.name}</h3>
                ) : item.subCategory === 'warna nama' ? (
                  <h3 className="text-xl font-bold" style={{ color: WARNA_NAMA_MAP[item.id] || undefined }}>{item.name}</h3>
                ) : (
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{item.name}</h3>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-2 flex-grow">({item.subCategory})</p>
                <button className={`mt-4 w-full text-white py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClass}`} onClick={buttonAction} disabled={buttonDisabled}>
                  {buttonText}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-6xl">📭</span>
          <p className="text-gray-600 dark:text-gray-300 text-xl mt-4">Tidak ada item dalam kategori ini.</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">Coba periksa kategori lain atau beli item di toko!</p>
        </div>
      )}
      <Notification notification={notification} onClear={() => setNotification(null)} />
    </div>
  );
}