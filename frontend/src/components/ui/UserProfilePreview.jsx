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

  const isMyProfile = !!user.email;
  const displayAvatarId = isMyProfile ? activeItems.avatar : user.avatarId;
  const displayColorId = isMyProfile ? activeItems['warna nama'] : user.warnaName;

  const renderUsername = () => {
    const styleInfo = WARNA_NAMA_MAP[displayColorId] || WARNA_NAMA_MAP[null];

    if (styleInfo && styleInfo.type === 'class') {
      // Mengurangi ukuran font username lebih lanjut untuk layar sangat kecil
      return <h2 className={`text-base sm:text-xl font-bold ${styleInfo.value}`}>{user.name || user.username}</h2>;
    }
    
    // Mengurangi ukuran font username lebih lanjut untuk layar sangat kecil
    return <h2 className="text-base sm:text-xl font-bold dark:text-gray-100" style={{ color: styleInfo ? styleInfo.value : undefined }}>{user.name || user.username}</h2>;
  };
  
  const handleClick = () => setIsModalOpen(true);
  const handleStartChat = () => {
    setIsModalOpen(false);
    if (onStartChat) onStartChat(user);
  };
  const handleResetClick = () => {
    if (window.confirm("Apakah Anda yakin ingin mereset data trial? Tindakan ini tidak dapat dibatalkan.")) {
      setIsModalOpen(false);
      if (onResetData) onResetData();
    }
  };
  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      setIsModalOpen(false);
      if (onLogout) onLogout();
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
          <div className="flex justify-center items-center mb-1">
            <Avatar
              username={user.name || user.username}
              avatarId={displayAvatarId}
              size="lg"
              showRing={true}
            />
          </div>

          {renderUsername()}

          {/* Pastikan showLevel true dan user.level ada */}
          {showLevel && user.level !== undefined && (
            <p className="text-xs font-bold text-blue-500 dark:text-blue-400 mt-0.5 mb-0.5">Level {user.level}</p>
          )}
          {showEmail && user.email && <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 mb-0.5">{user.email}</p>}
          
          {user.isOnline !== undefined && (
            <div className="flex items-center justify-center mt-1 mb-1">
              <span className={`h-3 w-3 rounded-full mr-2 ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span className={`text-xs ${user.isOnline ? 'text-green-600' : 'text-gray-500'}`}>{user.isOnline ? 'Online' : 'Offline'}</span>
            </div>
          )}

          {showCoins && user.coins !== undefined && (
            <div className="mt-1 bg-yellow-100 text-yellow-800 text-sm font-semibold py-1 px-2 rounded-full inline-block">
                {user.coins} Koin 💰
            </div>
          )}
        </div>

        {showUserActions && (
          <div className="mt-3 pt-2 border-t dark:border-gray-600">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2">Untuk keperluan trial & development</p>
            <div className="flex justify-center gap-x-2">
              {onResetData && (
                <Button 
                  variant="warning" 
                  onClick={handleResetClick} 
                  className="flex-1 !bg-yellow-500 hover:!bg-yellow-600 text-white flex items-center justify-center py-2 text-sm"
                >
                  <RotateCcw className="w-4 h-4 mr-1" /> Reset
                </Button>
              )}
              {onLogout && (
                <Button 
                  variant="danger" 
                  onClick={handleLogout} 
                  className="flex-1 flex items-center justify-center py-2 text-sm"
                >
                  <LogOut className="w-4 h-4 mr-1" /> Keluar
                </Button>
              )}
            </div>
          </div>
        )}

        {showActions && onStartChat && (
          <div className="mt-3 flex justify-center">
            <Button 
              variant="primary" 
              onClick={handleStartChat} 
              className="w-full py-2 px-3 text-sm"
            >
              💬 Mulai Chat
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserProfilePreview;
