import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  // Jangan render apapun jika modal tidak terbuka
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop semi-transparan yang menutupi seluruh layar
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Menutup modal saat backdrop diklik
    >
      {/* Konten Modal */}
      <div 
        className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-xl"
        onClick={e => e.stopPropagation()} // Mencegah penutupan modal saat kontennya diklik
      >
        {/* Header Modal */}
        <div className="flex items-start justify-between pb-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
            aria-label="Close modal"
          >
            {/* Ikon 'X' untuk menutup */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        
        {/* Body Modal */}
        <div className="pt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
