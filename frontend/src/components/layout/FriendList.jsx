import React, { useState } from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Notification from '../ui/notification';

// Data simulasi untuk daftar teman (dengan tambahan properti level)
const allFriends = [
    { id: 2, name: 'Erlin Karlinda', avatar: '👩‍💻', isOnline: true, level: 15 },
    { id: 3, name: 'Vanno', avatar: '👶', isOnline: false, level: 2 },
    { id: 4, name: 'Varren', avatar: '🍼', isOnline: true, level: 1 },
    { id: 5, name: 'John Doe', avatar: '👨‍🚀', isOnline: false, level: 25 },
    { id: 6, name: 'Jane Smith', avatar: '🎨', isOnline: true, level: 18 },
];

const FriendList = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fungsi untuk menampilkan profil di modal
  const handleViewProfile = (friend) => {
    setSelectedFriend(friend);
    setIsProfileModalOpen(true);
  };
    
  // Fungsi yang akan dipanggil saat ikon chat diklik
  const handleStartChat = (friend) => {
    setNotification({ message: `Membuka chat dengan ${friend.name}...`, type: 'success' });
    setTimeout(() => {
        window.location.href = '/chat';
    }, 1500);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md">
        {/* Header komponen */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Daftar Teman</h2>
          <Button variant="primary" onClick={() => setNotification({ message: 'Fitur belum diimplementasikan.', type: 'error' })}>
            Tambah Teman
          </Button>
        </div>

        {/* Daftar yang dapat di-scroll */}
        <div className="overflow-y-auto">
          <ul>
            {allFriends.map((friend, index) => (
              <li
                key={friend.id}
                className={`flex items-center justify-between p-4 ${index < allFriends.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                {/* Info Teman (Bisa Diklik) */}
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleViewProfile(friend)}
                >
                  {/* --- PERUBAHAN DI SINI: BINGKAI PROFIL --- */}
                  <div className="relative mr-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl ring-2 ring-offset-1 ring-gray-300">
                      {friend.avatar}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{friend.name}</p>
                    <div className="flex items-center mt-1">
                      <span className={`h-2 w-2 rounded-full mr-1.5 ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      <span className={`text-xs ${friend.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                        {friend.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tombol untuk memulai chat */}
                <button 
                  onClick={() => handleStartChat(friend)}
                  className="p-2 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-600 focus:outline-none"
                  aria-label={`Mulai chat dengan ${friend.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.252 0 9.75-3.694 9.75-8.25s-4.498-8.25-9.75-8.25S3 7.694 3 12.25c0 .81.097 1.6.279 2.355A6.721 6.721 0 002.25 18c0 1.06.314 2.06.857 2.944l1.697-.852z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal untuk Profil Teman */}
      <Modal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        title="Profil Teman"
      >
        {selectedFriend && (
          <div>
            <div className="text-center">
              {/* --- PERUBAHAN DI SINI: BINGKAI PROFIL DI MODAL --- */}
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-5xl ring-4 ring-offset-2 ring-blue-400 mx-auto mb-4">
                {selectedFriend.avatar}
              </div>
              <h2 className="text-2xl font-bold">{selectedFriend.name}</h2>
              {/* --- PERUBAHAN DI SINI: TAMPILKAN LEVEL --- */}
              <p className="text-sm font-bold text-blue-500 mb-2">Level {selectedFriend.level}</p>
              <div className="flex items-center justify-center mt-2">
                <span className={`h-3 w-3 rounded-full mr-2 ${selectedFriend.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span className={`text-md ${selectedFriend.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                  {selectedFriend.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="secondary" onClick={() => setIsProfileModalOpen(false)}>Tutup</Button>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Komponen Notifikasi */}
      <Notification notification={notification} onClear={() => setNotification(null)} />
    </>
  );
};

export default FriendList;
