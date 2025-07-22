import React from 'react';
// Hapus impor Navbar dari sini
import FriendList from '../components/layout/FriendList.jsx';

export default function FriendsPage() {
  // Langsung kembalikan konten utama halaman
  return (
    <main className="container mx-auto px-6 py-8">
      <FriendList />
    </main>
  );
}
