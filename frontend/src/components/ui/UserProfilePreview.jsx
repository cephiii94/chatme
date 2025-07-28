import React, { useState } from 'react';
import Avatar from './Avatar.jsx';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import { useAppearance, WARNA_NAMA_MAP } from '../../context/AppearanceContext.jsx';

const UserProfilePreview = ({
  user,
  children,
  showLevel = true,
  showCoins = false,
  showEmail = false,
  showActions = false,
  showUserActions = false,
  onStartChat = null,
  onLogout = null,
  onResetData = null,
  className = ""
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeItems } = useAppearance();

  if (!user) return children;

  // --- PERBAIKAN LOGIKA UTAMA ---
  // 1. Tentukan apakah ini profil PENGGUNA SAAT INI atau profil TEMAN.
  //    Kita bisa asumsikan jika ada properti 'email', itu adalah profil kita sendiri.
  const isMyProfile = !!user.email;

  // 2. Tentukan ID avatar yang benar untuk ditampilkan.
  //    - Jika ini profil SAYA, gunakan avatar dari 'activeItems'.
  //    - Jika ini profil TEMAN, gunakan 'user.avatarId' milik teman tersebut.
  const displayAvatarId = isMyProfile ? activeItems.avatar : user.avatarId;

  // 3. Tentukan ID warna nama yang benar.
  //    - Jika ini profil SAYA, gunakan warna dari 'activeItems'.
  //    - Jika ini profil TEMAN, gunakan 'user.warnaName' (jika ada).
  const displayColorId = isMyProfile ? activeItems['warna nama'] : user.warnaName;

  // Fungsi untuk merender nama pengguna dengan gaya yang benar (className atau style)
  const renderUsername = () => {
    const styleInfo = WARNA_NAMA_MAP[displayColorId] || WARNA_NAMA_MAP[null];

    if (styleInfo && styleInfo.type === 'class') {
      return <h2 className={`text-2xl font-bold ${styleInfo.value}`}>{user.name || user.username}</h2>;
    }
    
    return <h2 className="text-2xl font-bold dark:text-gray-100" style={{ color: styleInfo ? styleInfo.value : undefined }}>{user.name || user.username}</h2>;
  };
  
  const handleClick = () => setIsModalOpen(true);
  const handleStartChat = () => {
    setIsModalOpen(false);
    if (onStartChat) onStartChat(user);
  };
  const handleResetClick = () => {
    // NOTE: window.confirm() tidak direkomendasikan. Pertimbangkan custom modal di masa depan.
    if (window.confirm("Apakah Anda yakin ingin mereset data trial?") && onResetData) {
      setIsModalOpen(false);
      onResetData();
    }
  };
  const handleLogout = () => {
    setIsModalOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}
        title={`Lihat profil ${user.name || user.username}`}
      >
        {children}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Profil Pengguna"
      >
        <div className="text-center w-full">
          <div className="flex justify-center items-center mb-6 w-full min-h-[6rem]">
            {/* --- PERBAIKAN AVATAR DITERAPKAN DI SINI --- */}
            <Avatar
              username={user.name || user.username}
              avatarId={displayAvatarId} // Menggunakan ID avatar yang sudah benar
              size="2xl"
              showRing={true}
            />
          </div>

          {/* --- PERBAIKAN WARNA NAMA DITERAPKAN DI SINI --- */}
          {renderUsername()}

          {showLevel && <p className="text-sm font-bold text-blue-500 dark:text-blue-400 mb-2">Level {user.level || 1}</p>}
          {showEmail && user.email && <p className="text-gray-600 dark:text-gray-400 mb-2">{user.email}</p>}
          
          {user.isOnline !== undefined && (
            <div className="flex items-center justify-center mt-2 mb-4">
              <span className={`h-3 w-3 rounded-full mr-2 ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span className={`text-md ${user.isOnline ? 'text-green-600' : 'text-gray-500'}`}>{user.isOnline ? 'Online' : 'Offline'}</span>
            </div>
          )}

          {showCoins && user.coins !== undefined && (
            <div className="mt-4 bg-yellow-100 text-yellow-800 text-lg font-semibold py-2 px-4 rounded-full inline-block">{user.coins} Koin 💰</div>
          )}
        </div>

        {showUserActions && (
          <div className="mt-6 pt-4 border-t dark:border-gray-600">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2">Untuk keperluan trial & development</p>
            {onResetData && <Button variant="warning" onClick={handleResetClick} className="w-full !bg-yellow-500 hover:!bg-yellow-600 text-white mb-4">Reset Data Trial</Button>}
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          {showActions && onStartChat && <Button variant="primary" onClick={handleStartChat}>💬 Mulai Chat</Button>}
          {showUserActions && onLogout && <Button variant="danger" onClick={handleLogout}>Keluar</Button>}
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Tutup</Button>
        </div>
      </Modal>
    </>
  );
};

export default UserProfilePreview;
