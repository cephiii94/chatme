import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, friendName = 'seseorang' }) => {
  const [message, setMessage] = useState('');

  // Handler untuk memperbarui state saat pengguna mengetik
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Handler untuk mengirim pesan
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim pesan hanya jika tidak kosong dan fungsi onSendMessage tersedia
    if (message.trim() && onSendMessage) {
      onSendMessage(message);
      setMessage(''); // Kosongkan input setelah mengirim
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
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
          {/* Ikon Kirim (SVG) */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
