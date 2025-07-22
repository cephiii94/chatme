import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

import Sidebar from './components/layout/Sidebar.jsx'; 

import LoginPage from './pages/LoginPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import AchievementsPage from './pages/AchievementsPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import FriendsPage from './pages/FriendsPage.jsx';

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const path = window.location.pathname;
  let currentPage;

  switch (path) {
    case '/chat':
      currentPage = <ChatPage />;
      break;
    case '/friends':
      currentPage = <FriendsPage />;
      break;
    case '/shop':
      currentPage = <ShopPage />;
      break;
    case '/achievements':
      currentPage = <AchievementsPage />;
      break;
    case '/inventory':
      currentPage = <InventoryPage />;
      break;
    default:
      currentPage = <ChatPage />;
      break;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar />
      
      {/* --- PERUBAHAN DI SINI --- */}
      {/* Tata letak utama sekarang lebih sederhana dan tidak akan berkonflik */}
      <main className="flex-grow overflow-y-auto">
        {currentPage}
      </main>
    </div>
  );
};

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
