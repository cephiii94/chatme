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
  const warnaNamaAktif = WARNA_NAMA_MAP[user?.warnaName || activeItems?.['warna nama']] || '';

  if (!user) return children;

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleStartChat = () => {
    setIsModalOpen(false);
    if (onStartChat) {
      onStartChat(user);
    }
  };

  const handleResetClick = () => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin mereset data trial? Semua data akan hilang."
    );
    if (isConfirmed && onResetData) {
      setIsModalOpen(false);
      onResetData();
    }
  };

  const handleLogout = () => {
    setIsModalOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <>
      {/* Wrapper yang bisa diklik */}
      <div 
        onClick={handleClick}
        className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}
        title={`Lihat profil ${user.name || user.username}`}
      >
        {children}
      </div>

      {/* Modal Preview Profil */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Profil Pengguna"
      >
        <div className="text-center w-full">
          {/* Avatar Besar */}
          <div className="flex justify-center items-center mb-6 w-full min-h-[6rem]">
            {user.avatar ? (
              // Tampilkan emoji avatar langsung untuk teman
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-6xl ring-2 ring-offset-1 ring-blue-200 dark:ring-blue-500">
                {user.avatar}
              </div>
            ) : (
              // Gunakan Avatar component untuk user yang menggunakan sistem avatar
              <Avatar
                username={user.name || user.username}
                avatarId={user.avatarId || activeItems?.avatar}
                size="2xl"
                showRing={true}
              />
            )}
          </div>

          {/* Nama dengan Warna Custom */}
          <h2 
            className={
              (user.warnaName === 'wn-01' || activeItems?.['warna nama'] === 'wn-01') 
                ? "text-2xl font-bold rainbow-text" 
                : "text-2xl font-bold dark:text-gray-100"
            }
            style={
              (user.warnaName === 'wn-01' || activeItems?.['warna nama'] === 'wn-01') 
                ? {} 
                : (warnaNamaAktif ? { color: warnaNamaAktif } : {})
            }
          >
            {user.name || user.username}
          </h2>

          {/* Level */}
          {showLevel && (
            <p className="text-sm font-bold text-blue-500 dark:text-blue-400 mb-2">
              Level {user.level || 1}
            </p>
          )}

          {/* Email */}
          {showEmail && user.email && (
            <p className="text-gray-600 dark:text-gray-400 mb-2">{user.email}</p>
          )}

          {/* Status Online/Offline */}
          {user.isOnline !== undefined && (
            <div className="flex items-center justify-center mt-2 mb-4">
              <span className={`h-3 w-3 rounded-full mr-2 ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span className={`text-md ${user.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                {user.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          )}

          {/* Koin */}
          {showCoins && user.coins !== undefined && (
            <div className="mt-4 bg-yellow-100 text-yellow-800 text-lg font-semibold py-2 px-4 rounded-full inline-block">
              {user.coins} Koin 💰
            </div>
          )}
        </div>

        {/* User Actions (Reset & Logout) */}
        {showUserActions && (
          <div className="mt-6 pt-4 border-t dark:border-gray-600">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2">Untuk keperluan trial & development</p>
            {onResetData && (
              <Button
                variant="warning"
                onClick={handleResetClick}
                className="w-full !bg-yellow-500 hover:!bg-yellow-600 text-white mb-4"
              >
                Reset Data Trial
              </Button>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-4">
          {showActions && onStartChat && (
            <Button variant="primary" onClick={handleStartChat}>
              💬 Mulai Chat
            </Button>
          )}
          {showUserActions && onLogout && (
            <Button variant="danger" onClick={handleLogout}>
              Keluar
            </Button>
          )}
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Tutup
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserProfilePreview;