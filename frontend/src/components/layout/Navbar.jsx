import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useUser } from '../../context/UserContext.jsx';
import Modal from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';

const Navbar = () => {
  const { logout } = useAuth();
  const { profile, loading } = useUser();
  
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  // Efek untuk menutup dropdown saat mengklik di luar area
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    // Tambahkan event listener saat komponen dimuat
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Hapus event listener saat komponen dibongkar
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  // Tampilkan versi loading dari navbar jika profil belum siap
  if (loading || !profile) {
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">ChatsYok</span>
            </div>
            <div className="text-sm text-gray-500">Memuat profil...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="/chat" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">ChatsYok</span>
              </a>
            </div>
            <div className="hidden md:block">
              {/* --- PERUBAHAN DI SINI --- */}
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/chat" className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Chat</a>
                <a href="/friends" className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Teman</a>
                <a href="/shop" className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Toko</a>
                <a href="/inventory" className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Inventaris</a>
                <a href="/achievements" className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pencapaian</a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <span className="text-yellow-500 text-lg">💰</span>
                <span className="ml-1 font-semibold text-gray-700">{profile.coins}</span>
              </div>
              <div 
                className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                onClick={() => setIsProfileModalOpen(true)}
              >
                <span className="text-3xl">👨‍💻</span>
                <div className="ml-2 hidden sm:block">
                    <p className="font-semibold text-gray-800 leading-tight">{profile.username}</p>
                    <p className="text-xs text-gray-500 leading-tight">Level {profile.level || 1}</p>
                </div>
              </div>
              <div className="relative ml-3" ref={dropdownRef}>
                <div>
                  <button
                    type="button"
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="sr-only">Buka menu pengguna</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.424.35.534.954.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.127c-.331.183-.581.495-.644.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.127.332-.183.582-.495.644-.87l.213-1.281z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsProfileModalOpen(true); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil Anda</a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Pengaturan</a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bantuan</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Keluar</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Profil Pengguna"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">👨‍💻</div>
          <h2 className="text-2xl font-bold">{profile.username}</h2>
          <p className="text-sm font-bold text-blue-500 mb-2">Level {profile.level || 1}</p>
          <p className="text-gray-600">{profile.email}</p>
          <div className="mt-4 bg-yellow-100 text-yellow-800 text-lg font-semibold py-2 px-4 rounded-full inline-block">
            {profile.coins} Koin 💰
          </div>
        </div>
        <div className="mt-6 flex justify-end">
            <Button variant="secondary" onClick={() => setIsProfileModalOpen(false)}>Tutup</Button>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
