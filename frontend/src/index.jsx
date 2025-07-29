import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Pastikan baris ini ada dan tidak ada kesalahan ketik.
// Baris ini memuat file CSS yang berisi semua aturan Tailwind.
import './index.css';

// 1. Dapatkan elemen root dari HTML Anda
const rootElement = document.getElementById('root');

// 2. Buat root React
const root = ReactDOM.createRoot(rootElement);

// 3. Render aplikasi Anda di dalam StrictMode untuk pemeriksaan tambahan
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Daftarkan service worker untuk PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
