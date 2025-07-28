// frontend/src/components/ui/UserProfilePreview.jsx
import React, { useState } from 'react';
import Avatar from './Avatar.jsx';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import { useAppearance, WARNA_NAMA_MAP } from '../../context/AppearanceContext.jsx';
import { LogOut, RotateCcw } from 'lucide-react'; // Import ikon untuk tombol

const UserProfilePreview = ({
  user,
  children,
  showLevel = true,
  showCoins = false,
  showEmail = false,
  showActions = false, // Ini untuk aksi chat, tidak relevan untuk profil sendiri
  showUserActions = false, // PENTING: Mengontrol tampilan tombol Logout/Reset
  onStartChat = null,
  onLogout = null,
  onResetData = null,
  className = ""
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeItems } = useAppearance();

  if (!user) return children;

  const isMyProfile = !!user.email; // Asumsi ini adalah profil pengguna saat ini
  const displayAvatarId = isMyProfile ? activeItems.avatar : user.avatarId;
  const displayColorId = isMyProfile ? activeItems['warna nama'] : user.warnaName;

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
    // Menggunakan konfirmasi sederhana. Untuk aplikasi produksi, pertimbangkan modal konfirmasi kustom.
    if (window.confirm("Apakah Anda yakin ingin mereset data trial? Tindakan ini tidak dapat dibatalkan.")) {
      setIsModalOpen(false); // Tutup modal profil sebelum reset
      if (onResetData) onResetData(); // Panggil fungsi reset yang diteruskan dari Sidebar
    }
  };
  const handleLogout = () => {
    // Menggunakan konfirmasi sederhana. Untuk aplikasi produksi, pertimbangkan modal konfirmasi kustom.
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      setIsModalOpen(false); // Tutup modal profil sebelum logout
      if (onLogout) onLogout(); // Panggil fungsi logout yang diteruskan dari Sidebar
    }
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
            <Avatar
              username={user.name || user.username}
              avatarId={displayAvatarId}
              size="2xl"
              showRing={true}
            />
          </div>

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

        {/* Tombol Logout dan Reset Data sekarang berada di dalam modal UserProfilePreview */}
        {showUserActions && (
          <div className="mt-6 pt-4 border-t dark:border-gray-600 flex flex-col space-y-3">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2">Untuk keperluan trial & development</p>
            {onResetData && (
              <Button 
                variant="warning" 
                onClick={handleResetClick} 
                className="w-full !bg-yellow-500 hover:!bg-yellow-600 text-white flex items-center justify-center"
              >
                <RotateCcw className="w-5 h-5 mr-2" /> Reset Data Trial
              </Button>
            )}
            {onLogout && (
              <Button 
                variant="danger" 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center"
              >
                <LogOut className="w-5 h-5 mr-2" /> Keluar
              </Button>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          {showActions && onStartChat && <Button variant="primary" onClick={handleStartChat}>💬 Mulai Chat</Button>}
          {/* Tombol Logout di sini dihapus karena sudah ada di showUserActions */}
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Tutup</Button>
        </div>
      </Modal>
    </>
  );
};

export default UserProfilePreview;
