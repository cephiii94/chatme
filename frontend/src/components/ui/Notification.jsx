import React, { useEffect, useState } from 'react';

const Notification = ({ notification, onClear }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 4000); // Notifikasi akan hilang setelah 4 detik

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleClose = () => {
    setVisible(false);
    // Beri waktu untuk animasi fade-out sebelum menghapus notifikasi
    setTimeout(() => {
      onClear();
    }, 300);
  };

  if (!notification) {
    return null;
  }

  // --- PERUBAHAN DI SINI ---
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500', // Tambahkan warna untuk tipe 'info'
  };

  const icon = {
    success: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    // Tambahkan ikon untuk tipe 'info'
    info: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.25 5.25m.47-5.523a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
  };

  return (
    <div 
      className={`fixed bottom-5 right-5 z-50 flex items-center p-4 rounded-lg shadow-xl text-white transition-all duration-300 ${typeClasses[notification.type] || 'bg-gray-500'} ${visible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
    >
      <div className="flex-shrink-0">
        {icon[notification.type] || icon.info}
      </div>
      <div className="ml-3 text-sm font-medium">
        {notification.message}
      </div>
      <button onClick={handleClose} className="ml-4 -mr-1 p-1 rounded-full hover:bg-white/20 focus:outline-none">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    </div>
  );
};

export default Notification;
