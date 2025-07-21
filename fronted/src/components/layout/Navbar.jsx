import React from 'react';

// Data pengguna simulasi, di aplikasi nyata ini akan datang dari Context atau props.
const userData = {
  username: 'Tuan Cecep',
  avatar: '👨‍💻',
  coins: 1337,
};

const Navbar = () => {
  // Fungsi placeholder untuk logout
  const handleLogout = () => {
    // Di aplikasi nyata, hapus token dan arahkan ke halaman login
    alert('Anda telah keluar.');
    // window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Bagian Kiri: Logo dan Nama Aplikasi */}
          <div className="flex-shrink-0">
            <a href="/chat" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">ChatsYok</span>
            </a>
          </div>

          {/* Bagian Tengah: Tautan Navigasi */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/chat" className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Chat</a>
              <a href="/shop" className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Toko</a>
              <a href="/achievements" className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pencapaian</a>
            </div>
          </div>

          {/* Bagian Kanan: Info Pengguna dan Logout */}
          <div className="flex items-center">
            {/* Tampilan Koin */}
            <div className="flex items-center mr-4">
              <span className="text-yellow-500 text-lg">💰</span>
              <span className="ml-1 font-semibold text-gray-700">{userData.coins}</span>
            </div>

            {/* Avatar dan Nama Pengguna */}
            <div className="flex items-center">
              <span className="text-2xl">{userData.avatar}</span>
              <span className="ml-2 font-medium text-gray-800 hidden sm:block">{userData.username}</span>
            </div>

            {/* Tombol Logout */}
            <button
              onClick={handleLogout}
              className="ml-4 p-2 rounded-full text-gray-500 hover:text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
