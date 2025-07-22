import React, { useEffect, useRef } from 'react';
import MessageInput from './MessageInput.jsx';

const ChatWindow = ({ friend, messages = [], onSendMessage, onSendFile }) => {
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

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex items-center p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="text-3xl mr-4">{friend.avatar}</div>
        <h2 className="text-xl font-bold text-gray-800">{friend.name}</h2>
      </div>

      <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => {
            // Jika pesan adalah file
            if (msg.type === 'file') {
              return (
                <div key={index} className={`flex items-end ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl flex items-center space-x-3 ${msg.sender === 'me' ? 'bg-green-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 flex-shrink-0"><path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a.375.375 0 01-.375-.375V6.75A3.75 3.75 0 009 3H5.625zM12.75 12.75a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12.75z" clipRule="evenodd" /><path d="M14.25 6.75a2.25 2.25 0 00-2.25-2.25H5.625a.375.375 0 00-.375.375v17.25c0 .207.168.375.375.375h12.75a.375.375 0 00.375-.375V12.75a2.25 2.25 0 00-2.25-2.25h-1.875a.375.375 0 01-.375-.375V6.75z" /></svg>
                    <div>
                      <p className="font-bold truncate">{msg.fileName}</p>
                      <p className="text-sm">{msg.fileSize}</p>
                    </div>
                    {/* Tampilkan tombol download hanya jika file diterima (bukan dikirim oleh 'me') */}
                    {msg.sender !== 'me' && (
                      <a
                        href={msg.fileURL}
                        download={msg.fileName}
                        className="p-2 rounded-full hover:bg-gray-200"
                        aria-label="Unduh file"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600">
                          <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              );
            }
            // Jika pesan adalah teks
            return (
              <div key={index} className={`flex items-end ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'me' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border'}`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <MessageInput 
        onSendMessage={onSendMessage} 
        onSendFile={onSendFile}
        friendName={friend.name} 
      />
    </div>
  );
};

export default ChatWindow;
