// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { ChatProvider } from './context/ChatContext.jsx';
import { AppearanceProvider } from './context/AppearanceContext.jsx';

import Sidebar from './components/layout/Sidebar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import AchievementsPage from './pages/AchievementsPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import FriendsPage from './pages/FriendsPage.jsx';

const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  // State untuk mengontrol visibilitas navbar mobile
  const [showMobileNavbar, setShowMobileNavbar] = useState(true); 
  // State untuk melacak apakah ChatWindow aktif di ChatPage (khusus mobile)
  const [isChatWindowActiveMobile, setIsChatWindowActiveMobile] = useState(false);

  // Efek untuk mengontrol visibilitas navbar mobile dan padding konten utama
  useEffect(() => {
    const handleVisibility = () => {
      if (window.innerWidth >= 768) {
        // Di desktop, navbar mobile selalu disembunyikan
        setShowMobileNavbar(false);
      } else {
        // Di mobile, tampilkan navbar mobile kecuali di halaman chat DAN chat window aktif
        if (location.pathname === '/chat' && isChatWindowActiveMobile) {
          setShowMobileNavbar(false); // Sembunyikan navbar jika chat window aktif di mobile
        } else {
          setShowMobileNavbar(true); // Tampilkan navbar di semua kasus mobile lainnya
        }
      }
    };

    // Panggil handler saat komponen dimuat dan saat ukuran jendela berubah
    window.addEventListener('resize', handleVisibility);
    handleVisibility(); // Panggil sekali saat mount

    return () => window.removeEventListener('resize', handleVisibility);
  }, [location.pathname, isChatWindowActiveMobile]); // Bergantung pada pathname dan isChatWindowActiveMobile

  // Jika belum terautentikasi, tampilkan halaman login saja
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      {/* Sidebar (desktop) dan Navbar (mobile) */}
      {/* Sidebar itu sendiri yang mengelola hidden/md:flex */}
      <Sidebar showMobileNavbar={showMobileNavbar} />
      
      {/* Konten utama aplikasi */}
      {/* Margin kiri fixed ke lebar sidebar desktop (w-16) */}
      {/* Padding bawah dihilangkan jika navbar mobile disembunyikan */}
      <main className={`flex-grow overflow-y-auto md:ml-16 ${showMobileNavbar ? 'pb-16' : 'pb-0'}`}>
        {/* Routes akan merender halaman yang sesuai */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* Meneruskan setIsChatWindowActiveMobile ke ChatPage */}
          <Route path="/chat" element={<ChatPage setIsChatWindowActiveMobile={setIsChatWindowActiveMobile} />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          {/* Rute default untuk halaman utama */}
          <Route path="/" element={<ChatPage setIsChatWindowActiveMobile={setIsChatWindowActiveMobile} />} />
          {/* Fallback route jika tidak ada yang cocok (opsional, untuk debugging) */}
          <Route path="*" element={<div className="p-4 text-center text-gray-500 dark:text-gray-400">Halaman tidak ditemukan.</div>} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router> {/* BrowserRouter sebagai Router */}
      <AuthProvider>
        <UserProvider>
          <ChatProvider>
            <AppearanceProvider>
              <AppRouter />
            </AppearanceProvider>
          </ChatProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
