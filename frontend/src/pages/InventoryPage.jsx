import React from 'react';
// Hapus impor Navbar dari sini

// Data simulasi untuk inventaris pengguna
const userInventory = [
  { id: 1, name: 'Tema Chat "Dasar"', description: 'Tema default yang bersih dan simpel.', icon: '📄' },
  { id: 2, name: 'Stiker Pack "Emoji Klasik"', description: 'Stiker emoji standar.', icon: '😀' },
];

export default function InventoryPage() {
  // Langsung kembalikan konten utama halaman
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Inventaris Anda</h1>
      
      {userInventory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userInventory.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col text-center items-center">
              <div className="text-6xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-600 mt-2 flex-grow">{item.description}</p>
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                Gunakan
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-xl">Inventaris Anda masih kosong.</p>
          <p className="text-gray-400 mt-2">Beli item di toko untuk menambah koleksi!</p>
        </div>
      )}
    </div>
  );
}
