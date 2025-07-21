import React, { useState } from 'react';
// Menggunakan path relatif yang benar dari folder 'pages'
import Navbar from '../components/layout/Navbar.jsx';
import FriendList from '../components/chat/ChatList.jsx';
import ChatWindow from '../components/chat/ChatWindow.jsx';

// Data Simulasi
const friendsData = [
  { id: 2, name: 'Erlin Karlinda', avatar: '👩‍💻', lastMessage: 'Jangan lupa beli susu ya.', unread: 2, isOnline: true },
  { id: 3, name: 'Vanno', avatar: '👶', lastMessage: 'Ayah, main yuk!', unread: 0, isOnline: false },
  { id: 4, name: 'Varren', avatar: '🍼', lastMessage: 'zzzz...', unread: 1, isOnline: true },
];

const messagesData = {
    'ai': [{ sender: 'ai', text: 'Halo Tuan Cecep! Ada yang bisa saya bantu hari ini?' }],
    2: [{ sender: 'other', text: 'Jangan lupa beli susu ya.'}, {sender: 'me', text: 'Oke, siap!'}],
    3: [{ sender: 'other', text: 'Ayah, main yuk!'}],
    4: [{ sender: 'other', text: 'zzzz...'}],
}

export default function ChatPage() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setMessages(messagesData[friend.id] || []);
  };

  const handleSendMessage = (newMessageText) => {
      const newMessage = { sender: 'me', text: newMessageText };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      // Di sini Anda akan memanggil peerService.sendMessage(newMessage)
  }

  return (
    <div className="flex flex-col h-screen font-sans antialiased text-gray-800">
        <Navbar />

        <div className="flex flex-grow overflow-hidden">
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
                <ChatWindow 
                    friend={selectedFriend} 
                    messages={messages}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    </div>
  );
}
