import React, { useState } from 'react';
import ChatList from '../components/chat/ChatList.jsx';
import ChatWindow from '../components/chat/ChatWindow.jsx';
import InventoryModal from '../components/chat/InventoryModal.jsx';
import Notification from '../components/ui/notification.jsx';
import { useUser } from '../context/UserContext.jsx';
import { useChat } from '../context/ChatContext.jsx';

const friendsData = [
  { id: 2, name: 'Erlin Karlinda', avatar: '👩‍💻', lastMessage: 'Jangan lupa beli susu ya.', unread: 2, isOnline: true },
  { id: 3, name: 'Vanno', avatar: '👨‍🚀', lastMessage: 'Ayah, main yuk!', unread: 0, isOnline: false },
];

export default function ChatPage() {
  const { consumeItem, addItemToInventory } = useUser(); // Ambil addItemToInventory
  const { messages, sendMessage, claimGiftInMessage } = useChat();
  
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  const handleSendMessage = (newMessageText) => {
      if (!selectedFriend) return;
      const newMessage = { id: Date.now(), sender: 'me', text: newMessageText, type: 'text' };
      sendMessage(selectedFriend.id, newMessage);
  };

  // --- PERUBAHAN 1: Sertakan seluruh objek 'item' saat mengirim ---
  const handleSendItem = (item) => {
    if (!selectedFriend) return;
    const newItemMessage = {
        id: Date.now(),
        sender: 'me',
        type: item.subCategory,
        item: item // Sertakan seluruh objek item di sini
    };
    sendMessage(selectedFriend.id, newItemMessage);
    
    if (item.subCategory === 'hadiah' || item.subCategory === 'adds-on') {
        consumeItem(item.id);
        setNotification({ message: `Anda mengirim ${item.name}!`, type: 'info' });
    }
    setIsInventoryOpen(false);
  };

  // --- PERUBAHAN 2: Panggil addItemToInventory saat menerima hadiah ---
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
        <div className="flex h-screen w-full overflow-hidden bg-gray-100">
            <div className="w-1/3 max-w-sm flex-shrink-0 bg-white border-r">
                <ChatList 
                    friends={friendsData} 
                    onSelectFriend={handleSelectFriend}
                    selectedFriendId={selectedFriend?.id}
                />
            </div>
            <div className="flex-grow">
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
