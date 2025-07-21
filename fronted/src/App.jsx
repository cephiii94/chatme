import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import AchievementsPage from './pages/Achievementspage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';

// Komponen Router sederhana untuk menavigasi antar halaman
const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  // Jika pengguna tidak terautentikasi, selalu tampilkan halaman login
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Jika terautentikasi, tampilkan halaman berdasarkan URL
  const path = window.location.pathname;
  switch (path) {
    case '/chat':
      return <ChatPage />;
    case '/shop':
      return <ShopPage />;
    case '/achievements':
      return <AchievementsPage />;
    case '/inventory':
      return <InventoryPage />;
    default:
      // Halaman default jika URL tidak cocok adalah halaman chat
      return <ChatPage />;
  }
};

// Komponen App utama yang membungkus semuanya dengan Provider
function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
