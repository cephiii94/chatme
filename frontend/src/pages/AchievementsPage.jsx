import React from 'react';
// Hapus impor Navbar dari sini

// Data simulasi untuk pencapaian
const userAchievements = [
  { id: 1, name: 'Pesan Pertama', description: 'Mengirim pesan pertama Anda.', icon: '💌', unlocked: true },
  { id: 2, name: 'Pembelian Pertama', description: 'Membeli item pertama dari toko.', icon: '🛍️', unlocked: true },
  { id: 3, name: 'Teman Pertama', description: 'Menambahkan teman pertama Anda.', icon: '🤝', unlocked: true },
  { id: 4, name: 'Raja Ngobrol', description: 'Mengirim 100 pesan.', icon: '👑', unlocked: false },
  { id: 5, name: 'Kolektor', description: 'Memiliki 5 item di inventaris.', icon: '🎁', unlocked: false },
  { id: 6, name: 'Super Cerdas', description: 'Bertanya 10 kali pada PuterAI.', icon: '🧠', unlocked: false },
];

export default function AchievementsPage() {
  // Langsung kembalikan konten utama halaman
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Pencapaian Anda</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {userAchievements.map((ach) => (
          <div 
            key={ach.id} 
            className={`bg-white rounded-xl shadow-md p-5 flex items-center transition-opacity ${!ach.unlocked ? 'opacity-40' : ''}`}
          >
            <div className="text-5xl mr-5">{ach.icon}</div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{ach.name}</h3>
              <p className="text-gray-600 text-sm">{ach.description}</p>
              {ach.unlocked && (
                 <p className="text-xs font-bold text-green-600 mt-1">TERBUKA</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
