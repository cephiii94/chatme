import React, { useState } from 'react';
import ChatList from '../components/chat/ChatList.jsx';
import ChatWindow from '../components/chat/ChatWindow.jsx';
import InventoryModal from '../components/chat/InventoryModal.jsx';

// Data Simulasi
const friendsData = [
  { id: 2, name: 'Erlin Karlinda', avatar: '👩‍💻', lastMessage: 'Jangan lupa beli susu ya.', unread: 2, isOnline: true },
  { id: 3, name: 'Vanno', avatar: '👶', lastMessage: 'Ayah, main yuk!', unread: 0, isOnline: false },
];

const messagesData = {
    'ai': [{ sender: 'ai', text: 'Halo Tuan Cecep! Ada yang bisa saya bantu hari ini?', type: 'text' }],
    2: [{ sender: 'other', text: 'Jangan lupa beli susu ya.', type: 'text'}, {sender: 'me', text: 'Oke, siap!', type: 'text'}],
    3: [{ sender: 'other', text: 'Ayah, main yuk!', type: 'text'}],
}

export default function ChatPage() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setMessages(messagesData[friend.id] || []);
  };

  const handleSendMessage = (newMessageText) => {
      const newMessage = { sender: 'me', text: newMessageText, type: 'text' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
  }

  const handleSendFile = (file) => {
    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    const newFileMessage = {
        sender: 'me', type: 'file', fileName: file.name, fileSize: formatBytes(file.size),
        fileURL: URL.createObjectURL(file), fileObject: file
    };
    setMessages(prevMessages => [...prevMessages, newFileMessage]);
  };

  const handleSendItem = (item) => {
    console.log("Mengirim item:", item);
    const newItemMessage = {
        sender: 'me',
        type: 'item',
        itemName: item.name,
        itemIcon: item.icon
    };
    setMessages(prevMessages => [...prevMessages, newItemMessage]);
    setIsInventoryOpen(false);
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
                />
            </div>
        </div>
        
        <InventoryModal 
            isOpen={isInventoryOpen}
            onClose={() => setIsInventoryOpen(false)}
            onSelectItem={handleSendItem}
        />
    </>
  );
}
