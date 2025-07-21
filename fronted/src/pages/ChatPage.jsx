import React, { useState } from 'react';

// --- Data Simulasi ---
// Di aplikasi nyata, data ini akan diambil dari API atau state management.
const friendsData = [
  { id: 1, name: 'PuterAI', avatar: '🤖', lastMessage: 'Ada yang bisa saya bantu?', unread: 0 },
  { id: 2, name: 'Erlin Karlinda', avatar: '👩‍💻', lastMessage: 'Jangan lupa beli susu ya.', unread: 2 },
  { id: 3, name: 'Vanno', avatar: '👶', lastMessage: 'Ayah, main yuk!', unread: 0 },
  { id: 4, name: 'Varren', avatar: '🍼', lastMessage: 'zzzz...', unread: 1 },
];

// --- Komponen Placeholder: FriendList ---
const FriendList = ({ friends, onSelectFriend, selectedFriendId }) => {
  return (
    <div className="bg-blue-50 border-r border-blue-200 flex flex-col">
      <div className="p-4 border-b border-blue-200">
        <h2 className="text-xl font-bold text-blue-900">Chats</h2>
      </div>
      <div className="flex-grow overflow-y-auto">
        <ul>
          {friends.map((friend) => (
            <li
              key={friend.id}
              onClick={() => onSelectFriend(friend)}
              className={`flex items-center p-4 cursor-pointer hover:bg-blue-100 ${selectedFriendId === friend.id ? 'bg-blue-200' : ''}`}
            >
              <div className="text-3xl mr-4">{friend.avatar}</div>
              <div className="flex-grow">
                <p className="font-semibold text-blue-800">{friend.name}</p>
                <p className="text-sm text-gray-600 truncate">{friend.lastMessage}</p>
              </div>
              {friend.unread > 0 && (
                <div className="bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {friend.unread}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// --- Komponen Placeholder: ChatWindow ---
const ChatWindow = ({ friend }) => {
  if (!friend) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl text-gray-500">Pilih teman untuk memulai obrolan</h2>
          <p className="text-gray-400">Pilih seseorang dari daftar di sebelah kiri.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex items-center p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="text-3xl mr-4">{friend.avatar}</div>
        <h2 className="text-xl font-bold text-gray-800">{friend.name}</h2>
      </div>
      <div className="flex-grow p-6 overflow-y-auto">
        {/* Pesan-pesan chat akan ditampilkan di sini */}
        <p className="text-center text-gray-400">Mulai percakapan dengan {friend.name}...</p>
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <input
          type="text"
          placeholder={`Ketik pesan untuk ${friend.name}...`}
          className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};


// --- Komponen Utama ChatPage ---
export default function ChatPage() {
  // State untuk melacak teman mana yang sedang dipilih
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    console.log('Memilih teman:', friend.name);
  };

  return (
    <div className="flex h-screen font-sans antialiased text-gray-800">
      {/* Kolom Kiri: Daftar Teman */}
      <div className="w-1/3 max-w-sm">
        <FriendList 
          friends={friendsData} 
          onSelectFriend={handleSelectFriend}
          selectedFriendId={selectedFriend?.id}
        />
      </div>

      {/* Kolom Kanan: Jendela Obrolan */}
      <div className="flex-grow">
        <ChatWindow friend={selectedFriend} />
      </div>
    </div>
  );
}
