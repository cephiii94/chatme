import React, { useEffect, useRef } from 'react';
import MessageInput from './MessageInput'; // Impor komponen baru

const ChatWindow = ({ friend, messages = [], onSendMessage }) => {
  const messagesEndRef = useRef(null);

  // Fungsi untuk otomatis scroll ke pesan terakhir
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Jalankan scrollToBottom setiap kali ada pesan baru
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Tampilan jika tidak ada teman yang dipilih
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
      {/* Header Jendela Chat */}
      <div className="flex items-center p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="text-3xl mr-4">{friend.avatar}</div>
        <h2 className="text-xl font-bold text-gray-800">{friend.name}</h2>
      </div>

      {/* Area Pesan yang Dapat Digulir */}
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.sender === 'me'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none border'
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {/* Elemen kosong untuk referensi scroll */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Footer dengan Input Pesan (menggunakan komponen baru) */}
      <MessageInput onSendMessage={onSendMessage} friendName={friend.name} />
    </div>
  );
};

export default ChatWindow;
