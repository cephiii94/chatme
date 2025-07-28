// frontend/src/pages/ChatPage.jsx
import React, { useState, useEffect } from 'react';
import ChatList from '../components/chat/ChatList.jsx';
import ChatWindow from '../components/chat/ChatWindow.jsx';
import InventoryModal from '../components/chat/InventoryModal.jsx';
import Notification from '../components/ui/Notification.jsx';
import { useUser } from '../context/UserContext.jsx';
import { useChat } from '../context/ChatContext.jsx';

// Data simulasi untuk daftar teman, harus sesuai dengan FriendList.jsx
const friendsData = [
  { id: 2, name: 'Erlin Karlinda', avatar: '👩‍💻', lastMessage: 'Jangan lupa beli susu ya.', unread: 2, isOnline: true },
  { id: 3, name: 'Vanno', avatar: '👨‍🚀', lastMessage: 'Ayah, main yuk!', unread: 0, isOnline: false },
  // Menambahkan teman baru: Arman, Bycycle, dan Crombo
  { id: 7, name: 'Arman', avatar: '👨‍🎤', lastMessage: 'Semoga suka hadiahnya!', unread: 0, isOnline: true },
  { id: 8, name: 'Bycycle', avatar: '🚴‍♂️', lastMessage: 'Tentu! Aku sudah siap.', unread: 0, isOnline: false },
  { id: 9, name: 'Crombo', avatar: '🤖', lastMessage: 'Ini hadiah dari PuterAI untukmu.', unread: 0, isOnline: true },
];

export default function ChatPage() {
  const { consumeItem, addItemToInventory } = useUser(); // Ambil addItemToInventory
  const { messages, sendMessage, claimGiftInMessage } = useChat();
  
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  // State baru untuk mengontrol tampilan di layar kecil
  const [showChatWindow, setShowChatWindow] = useState(false); 

  // Efek untuk mendeteksi ukuran layar dan mengatur tampilan awal
  useEffect(() => {
    const handleResize = () => {
      // Jika layar lebih besar dari 'md' breakpoint (768px), selalu tampilkan keduanya
      if (window.innerWidth >= 768) {
        setShowChatWindow(true); // Di desktop, chat window selalu terlihat
      } else {
        // Di mobile, sembunyikan chat window jika tidak ada teman yang dipilih
        setShowChatWindow(!!selectedFriend);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Panggil saat komponen dimuat

    return () => window.removeEventListener('resize', handleResize);
  }, [selectedFriend]); // Bergantung pada selectedFriend untuk memperbarui tampilan

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    // Di layar kecil, saat teman dipilih, tampilkan ChatWindow
    if (window.innerWidth < 768) {
      setShowChatWindow(true);
    }
  };

  const handleSendMessage = (newMessageText) => {
      if (!selectedFriend) return;
      const newMessage = { id: Date.now(), sender: 'me', text: newMessageText, type: 'text' };
      sendMessage(selectedFriend.id, newMessage);
  };

  // Sertakan seluruh objek 'item' saat mengirim
  const handleSendItem = (item) => {
    if (!selectedFriend) return;
    const newItemMessage = {
        id: Date.now(),
        sender: 'me',
        type: item.subCategory, // Menggunakan subCategory sebagai tipe pesan
        item: item // Sertakan seluruh objek item di sini
    };
    sendMessage(selectedFriend.id, newItemMessage);
    
    if (item.subCategory === 'hadiah' || item.subCategory === 'adds-on') {
        consumeItem(item.id);
        setNotification({ message: `Anda mengirim ${item.name}!`, type: 'info' });
    }
    setIsInventoryOpen(false);
  };

  // Panggil addItemToInventory saat menerima hadiah
  const handleAcceptGift = (messageId) => {
    if (!selectedFriend) return;
    
    const currentMessages = messages[selectedFriend.id] || [];
    const messageToClaim = currentMessages.find(msg => msg.id === messageId);

    if (messageToClaim && messageToClaim.item) {
        // Tambahkan item ke inventaris pengguna
        addItemToInventory(messageToClaim.item);
        
        // Tandai pesan sebagai sudah diklaim
        claimGiftInMessage(selectedFriend.id, messageId);
        
        // Beri notifikasi
        setNotification({ message: `Anda menerima ${messageToClaim.item.name}!`, type: 'success' });
    }
  };

  const handlePlaySound = (soundMessage) => {
    setNotification({ message: `Memutar suara: ${soundMessage.item?.name || 'Efek Suara'}`, type: 'info' });
  };

  return (
    <>
        <div className="flex h-screen w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
            {/* ChatList akan ditampilkan penuh di layar kecil jika ChatWindow tidak aktif,
                dan akan menjadi 1/3 lebar di layar besar */}
            <div className={`${showChatWindow && window.innerWidth < 768 ? 'hidden' : 'w-full md:w-1/3'} max-w-sm flex-shrink-0 bg-white border-r dark:bg-gray-800 dark:border-gray-700`}>
                <ChatList 
                    friends={friendsData} 
                    onSelectFriend={handleSelectFriend}
                    selectedFriendId={selectedFriend?.id}
                />
            </div>
            {/* ChatWindow akan ditampilkan penuh di layar kecil jika aktif,
                dan akan mengisi sisa ruang di layar besar */}
            <div className={`${!selectedFriend || (window.innerWidth < 768 && !showChatWindow) ? 'hidden' : 'flex-grow'}`}>
                <ChatWindow 
                    friend={selectedFriend} 
                    messages={messages[selectedFriend?.id] || []}
                    onSendMessage={handleSendMessage}
                    onSendFile={() => {}}
                    onOpenInventory={() => setIsInventoryOpen(true)}
                    onAcceptGift={handleAcceptGift}
                    onPlaySound={handlePlaySound}
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
