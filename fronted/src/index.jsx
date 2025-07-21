import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css'; // Anda bisa membuat file ini untuk styling global

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
