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

// Menerima prop setIsChatWindowActiveMobile dari App.jsx
export default function ChatPage({ setIsChatWindowActiveMobile }) {
  const { consumeItem, addItemToInventory } = useUser();
  const { messages, sendMessage, claimGiftInMessage } = useChat();
  
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showChatWindow, setShowChatWindow] = useState(false); 

  // Efek untuk mendeteksi ukuran layar dan mengatur tampilan ChatWindow serta memberi tahu App.jsx
  useEffect(() => {
    const handleVisibilityLogic = () => {
      if (window.innerWidth >= 768) {
        setShowChatWindow(true); // Di desktop, chat window selalu terlihat
        setIsChatWindowActiveMobile(false); // Pastikan App tahu ini bukan mode mobile chat window
      } else {
        // Di mobile, tampilkan ChatWindow hanya jika teman dipilih
        setShowChatWindow(!!selectedFriend);
        // Memberi tahu App.jsx apakah ChatWindow aktif di mobile
        setIsChatWindowActiveMobile(!!selectedFriend); 
      }
    };

    window.addEventListener('resize', handleVisibilityLogic);
    handleVisibilityLogic(); // Panggil sekali saat mount dan saat selectedFriend berubah

    return () => window.removeEventListener('resize', handleVisibilityLogic);
  }, [selectedFriend, setIsChatWindowActiveMobile]); // Bergantung pada selectedFriend dan setIsChatWindowActiveMobile

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    // Saat teman dipilih, langsung aktifkan ChatWindow di mobile
    if (window.innerWidth < 768) {
      setShowChatWindow(true);
      setIsChatWindowActiveMobile(true); // Memberi tahu App.jsx untuk menyembunyikan navbar
    }
  };

  // Fungsi untuk kembali ke ChatList (hanya relevan di mobile)
  const handleBackToChatList = () => {
    setSelectedFriend(null); // Hapus teman yang dipilih
    setShowChatWindow(false); // Sembunyikan ChatWindow
    setIsChatWindowActiveMobile(false); // Beri tahu App.jsx untuk menampilkan navbar lagi
  };

  const handleSendMessage = (newMessageText) => {
      if (!selectedFriend) return;
      const newMessage = { id: Date.now(), sender: 'me', text: newMessageText, type: 'text' };
      sendMessage(selectedFriend.id, newMessage);
  };

  const handleSendItem = (item) => {
    if (!selectedFriend) return;
    const newItemMessage = {
        id: Date.now(),
        sender: 'me',
        type: item.subCategory,
        item: item
    };
    sendMessage(selectedFriend.id, newItemMessage);
    
    if (item.subCategory === 'hadiah' || item.subCategory === 'adds-on') {
        consumeItem(item.id);
        setNotification({ message: `Anda mengirim ${item.name}!`, type: 'info' });
    }
    setIsInventoryOpen(false);
  };

  const handleAcceptGift = (messageId) => {
    if (!selectedFriend) return;
    
    const currentMessages = messages[selectedFriend.id] || [];
    const messageToClaim = currentMessages.find(msg => msg.id === messageId);

    if (messageToClaim && messageToClaim.item) {
        addItemToInventory(messageToClaim.item);
        claimGiftInMessage(selectedFriend.id, messageId);
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
                    onBackToChatList={handleBackToChatList}
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
