import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, title, children, hideHeader = false }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm md:max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all duration-300 ease-out animate-scaleIn"
        onClick={e => e.stopPropagation()}
      >
        {!hideHeader && (
          <div className="flex items-start justify-between p-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-colors"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
        )}
        
        {/* PENTING: Menambahkan max-h dan overflow-y-auto ke body modal */}
        {/* max-h-[80vh] akan membatasi tinggi modal hingga 80% dari tinggi viewport */}
        {/* overflow-y-auto akan membuat konten bisa di-scroll jika melebihi tinggi tersebut */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
