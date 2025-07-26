import React, { useState, useRef, useEffect } from 'react';
import Avatar from '../ui/Avatar';
import UserProfilePreview from '../ui/UserProfilePreview.jsx';
import MessageInput from './MessageInput.jsx';
import Button from '../ui/Button.jsx';

const ChatWindow = ({ friend, messages = [], onSendMessage, onSendFile, onOpenInventory, onAcceptGift, onPlaySound }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
  
  const renderMessage = (msg) => {
    const isSenderMe = msg.sender === 'me';
    
    switch (msg.type) {
      case 'hadiah':
        // Pastikan msg.item ada sebelum dirender
        if (!msg.item) return null; 
        return (
          <div key={msg.id} className={`flex items-end ${isSenderMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-4 rounded-2xl text-center ${isSenderMe ? 'bg-yellow-100' : 'bg-purple-100 border border-purple-200'}`}>
              <div className="text-5xl mb-2">{msg.item.icon || '🎁'}</div>
              <p className="text-sm font-semibold text-gray-800">
                {isSenderMe ? `Anda mengirim ${msg.item.name}!` : `${friend.name} mengirimmu ${msg.item.name}!`}
              </p>
              {!isSenderMe && (
                <Button 
                  variant={msg.claimed ? "secondary" : "primary"}
                  onClick={() => !msg.claimed && onAcceptGift(msg.id)}
                  disabled={msg.claimed}
                  className="mt-2 text-xs py-1 px-3"
                >
                  {msg.claimed ? 'Diterima' : 'Terima Hadiah'}
                </Button>
              )}
            </div>
          </div>
        );
      
      // ... (kasus lain seperti stiker, imoji, suara, teks tidak berubah)
      case 'stiker':
      case 'imoji':
        return (
          <div key={msg.id} className={`flex items-end ${isSenderMe ? 'justify-end' : 'justify-start'}`}>
            <div className="text-6xl">{msg.item?.icon || '❓'}</div>
          </div>
        );
      
      case 'suara':
        return (
           <div key={msg.id} className={`flex items-end ${isSenderMe ? 'justify-end' : 'justify-start'}`}>
             <div className={`max-w-xs p-3 rounded-2xl flex items-center space-x-3 ${isSenderMe ? 'bg-blue-500 text-white' : 'bg-white border'}`}>
               <button onClick={() => onPlaySound(msg)} className="p-2 rounded-full hover:bg-white/20">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.722-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
               </button>
               <div className="text-left">
                 <p className="font-semibold">{msg.item?.name || 'Efek Suara'}</p>
                 <p className="text-xs opacity-70">Efek Suara</p>
               </div>
             </div>
           </div>
        );

      default: // 'text'
        return (
          <div key={msg.id} className={`flex items-end ${isSenderMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isSenderMe ? 'bg-blue-500 text-white' : 'bg-white border'}`}>
              <p>{msg.text}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="flex items-center p-4 bg-white border-b border-gray-200 shadow-sm">
        <UserProfilePreview
          user={{
            name: friend.name,
            level: friend.level || 1,
            isOnline: friend.isOnline,
            avatarId: friend.avatarId
          }}
          showLevel={true}
          showActions={false}
          className="mr-4"
        >
          <Avatar
            username={friend.name}
            size="lg"
          />
        </UserProfilePreview>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{friend.name}</h2>
          {friend.isOnline !== undefined && (
            <div className="flex items-center mt-1">
              <span className={`h-2 w-2 rounded-full mr-1.5 ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span className={`text-xs ${friend.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                {friend.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map(renderMessage)}
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      <MessageInput 
        onSendMessage={onSendMessage} 
        onSendFile={onSendFile}
        onOpenInventory={onOpenInventory}
        friendName={friend.name} 
      />
    </div>
  );
};

export default ChatWindow;
