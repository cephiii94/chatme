import React, { useState, useRef } from 'react';

const MessageInput = ({ onSendMessage, onSendFile, onOpenInventory, friendName = 'seseorang' }) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && onSendMessage) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onSendFile) {
      onSendFile(file);
    }
    e.target.value = null; 
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {/* --- PERUBAHAN DI SINI --- */}
        {/* Tombol Buka Inventaris */}
        <button
          type="button"
          onClick={onOpenInventory}
          className="p-3 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
          aria-label="Buka inventaris"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.763.746-1.856 1.707l-1.29 12.031A3 3 0 005.375 24h13.25a3 3 0 002.992-3.512l-1.29-12.03A1.875 1.875 0 0018.487 7.5H16.5V6A4.5 4.5 0 0012 1.5A4.5 4.5 0 007.5 6zm-3 1.5h15l-1.21 11.25a1.5 1.5 0 01-1.496 1.25H5.205a1.5 1.5 0 01-1.496-1.25L2.5 7.5zm8.25-3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Tombol Lampirkan File */}
        <button
          type="button"
          onClick={handleAttachClick}
          className="p-3 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
          aria-label="Lampirkan file"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.5 10.5a.75.75 0 001.06 1.06l10.5-10.5a.75.75 0 011.06 0l3.182 3.182a.75.75 0 010 1.06l-10.5 10.5a2.25 2.25 0 01-3.182 0l-3.182-3.182a2.25 2.25 0 010-3.182l10.5-10.5a.75.75 0 00-1.06-1.06l-10.5 10.5a3.75 3.75 0 000 5.303l3.182 3.182a3.75 3.75 0 005.303 0l10.5-10.5a2.25 2.25 0 000-3.182l-3.182-3.182z" clipRule="evenodd" />
          </svg>
        </button>

        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder={`Ketik pesan untuk ${friendName}...`}
          className="flex-grow w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="off"
        />
        
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          disabled={!message.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
