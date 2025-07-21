import React from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import FriendList from '../components/layout/FriendList.jsx';

export default function FriendsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <FriendList />
      </main>
    </div>
  );
}
