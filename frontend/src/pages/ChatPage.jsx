import React, { useState } from 'react';
import ChatList from '../components/chat/ChatList.jsx';
import ChatWindow from '../components/chat/ChatWindow.jsx';
import InventoryModal from '../components/chat/InventoryModal.jsx';
import Notification from '../components/ui/notification.jsx';

// Data Simulasi
const friendsData = [
  { id: 2, name: 'Erlin Karlinda', avatar: '👩‍💻', lastMessage: 'Jangan lupa beli susu ya.', unread: 2, isOnline: true },
  { id: 3, name: 'Vanno', avatar: '👶', lastMessage: 'Ayah, main yuk!', unread: 0, isOnline: false },
];
const messagesData = {
    'ai': [{ id: 1, sender: 'ai', text: 'Halo Tuan Cecep!', type: 'text' }],
    2: [
        { id: 2, sender: 'other', text: 'Jangan lupa beli susu ya.', type: 'text'}, 
        { id: 3, sender: 'me', text: 'Oke, siap!', type: 'text'},
        { id: 4, sender: 'other', type: 'hadiah', itemName: 'Hadiah "Mawar"', itemIcon: '🌹', claimed: false },
        { id: 6, sender: 'me', type: 'suara', itemName: 'Efek "Tawa Jahat"', itemIcon: '😈' }
    ],
    3: [{ id: 5, sender: 'other', text: 'Ayah, main yuk!', type: 'text'}],
}

export default function ChatPage() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setMessages(messagesData[friend.id] || []);
  };

  const handleSendMessage = (newMessageText) => {
      const newMessage = { id: Date.now(), sender: 'me', text: newMessageText, type: 'text' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleSendFile = (file) => {
    // ... (kode tidak berubah)
  };

  const handleSendItem = (item) => {
    const newItemMessage = {
        id: Date.now(),
        sender: 'me',
        type: item.type, // Menggunakan tipe item langsung (stiker, hadiah, dll)
        itemName: item.name,
        itemIcon: item.icon
    };
    setMessages(prevMessages => [...prevMessages, newItemMessage]);
    setIsInventoryOpen(false);
  };

  const handleAcceptGift = (messageId) => {
    setMessages(prevMessages => 
        prevMessages.map(msg => {
            if (msg.id === messageId) {
                setNotification({ message: `Anda menerima ${msg.itemName}!`, type: 'success' });
                // Di sini Anda bisa menambahkan logika untuk menambah XP
                return { ...msg, claimed: true }; // Tandai hadiah sudah diterima
            }
            return msg;
        })
    );
  };

  // --- FUNGSI BARU DI SINI ---
  const handlePlaySound = (soundMessage) => {
    // Di aplikasi nyata, ini akan memutar file suara.
    // Untuk sekarang, kita hanya akan menampilkan notifikasi.
    setNotification({ message: `Memutar suara: ${soundMessage.itemName}`, type: 'success' });
    console.log("Memutar suara:", soundMessage);
  };

  return (
    <>
        <div className="flex h-full w-full overflow-hidden">
            <div className="w-1/3 max-w-sm flex-shrink-0">
                <ChatList 
                    friends={friendsData} 
                    onSelectFriend={handleSelectFriend}
                    selectedFriendId={selectedFriend?.id}
                />
            </div>
            <div className="flex-grow">
                <ChatWindow 
                    friend={selectedFriend} 
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    onSendFile={handleSendFile}
                    onOpenInventory={() => setIsInventoryOpen(true)}
                    onAcceptGift={handleAcceptGift}
                    onPlaySound={handlePlaySound} // Teruskan fungsi baru
                />
            </div>
        </div>
        
        <InventoryModal 
            isOpen={isInventoryOpen}
            onClose={() => setIsInventoryOpen(false)}
            onSelectItem={handleSendItem}
        />
        <Notification notification={notification} onClear={() => setNotification(null)} />
    </>
  );
}
