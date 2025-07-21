import React from 'react';
import Button from '../ui/Button';

// Data simulasi untuk daftar teman
// Di aplikasi nyata, data ini akan datang dari UserContext atau API
const allFriends = [
    { id: 2, name: 'Erlin Karlinda', avatar: '👩‍💻', isOnline: true },
    { id: 3, name: 'Vanno', avatar: '👶', isOnline: false },
    { id: 4, name: 'Varren', avatar: '🍼', isOnline: true },
    { id: 5, name: 'John Doe', avatar: '👨‍🚀', isOnline: false },
    { id: 6, name: 'Jane Smith', avatar: '🎨', isOnline: true },
];

const FriendList = () => {
  return (
    // Saya menghapus beberapa class agar komponen ini lebih fleksibel
    <div className="bg-white rounded-lg shadow-md">
      {/* Header komponen */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Daftar Teman</h2>
        <Button variant="primary" onClick={() => alert('Fitur cari teman belum dibuat.')}>
          Tambah Teman
        </Button>
      </div>

      {/* Daftar yang dapat di-scroll */}
      <div className="overflow-y-auto">
        <ul>
          {allFriends.map((friend, index) => (
            <li
              key={friend.id}
              // Menambahkan garis batas bawah untuk semua item kecuali yang terakhir
              className={`flex items-center justify-between p-4 ${index < allFriends.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex items-center">
                <div className="text-3xl mr-4">{friend.avatar}</div>
                <div>
                  <p className="font-semibold text-gray-900">{friend.name}</p>
                </div>
              </div>

              {/* Indikator Status Online */}
              <div className="flex items-center">
                <span className={`h-2.5 w-2.5 rounded-full mr-2 ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span className={`text-sm ${friend.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                  {friend.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendList;
