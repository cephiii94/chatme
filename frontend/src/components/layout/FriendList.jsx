import React, { useState } from 'react';
import Button from '../ui/Button';
import Notification from '../ui/Notification';
import Avatar from '../ui/Avatar';
import UserProfilePreview from '../ui/UserProfilePreview';

// Data simulasi untuk daftar teman (dengan tambahan properti level)
const allFriends = [
    { id: 2, name: 'Erlin Karlinda', avatar: '👩‍💻', isOnline: true, level: 15 },
    { id: 3, name: 'Vanno', avatar: '👶', isOnline: false, level: 2 },
    { id: 4, name: 'Varren', avatar: '🍼', isOnline: true, level: 1 },
    { id: 5, name: 'John Doe', avatar: '👨‍🚀', isOnline: false, level: 25 },
    { id: 6, name: 'Jane Smith', avatar: '🎨', isOnline: true, level: 18 },
    // Menambahkan teman baru: Arman, Bycycle, dan Crombo
    { id: 7, name: 'Arman', avatar: '👨‍🎤', isOnline: true, level: 10 },
    { id: 8, name: 'Bycycle', avatar: '🚴‍♂️', isOnline: false, level: 7 },
    { id: 9, name: 'Crombo', avatar: '🤖', isOnline: true, level: 30 },
];

const FriendList = () => {
  const [notification, setNotification] = useState(null);
    
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
                <UserProfilePreview
                  user={{
                    name: friend.name,
                    level: friend.level,
                    isOnline: friend.isOnline,
                    avatarId: friend.avatarId // Pastikan properti avatarId diteruskan jika ada
                  }}
                  showLevel={true}
                  showActions={true}
                  onStartChat={handleStartChat}
                  className="flex items-center"
                >
                  <div className="relative mr-4">
                    <Avatar
                      username={friend.name}
                      size="lg"
                      className="bg-gray-200 ring-gray-300"
                    />
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
                </UserProfilePreview>

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
      
      {/* Komponen Notifikasi */}
      <Notification notification={notification} onClear={() => setNotification(null)} />
    </>
  );
};

export default FriendList;
