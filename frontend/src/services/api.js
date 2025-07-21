import axios from 'axios';

// Membuat instance axios dengan konfigurasi dasar
const apiClient = axios.create({
  // Ganti dengan URL backend Anda yang sebenarnya.
  // Jika frontend dan backend berjalan di domain yang sama, Anda bisa menggunakan path relatif.
  baseURL: 'http://localhost:3001/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Interceptor untuk Menambahkan Token JWT ---
// Interceptor ini akan berjalan sebelum setiap permintaan dikirim.
apiClient.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Jika token ada, tambahkan ke header Authorization
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Lakukan sesuatu dengan error permintaan
    return Promise.reject(error);
  }
);

// --- Kumpulan Fungsi API ---

// == Rute Otentikasi ==
export const login = (email, password) => {
  return apiClient.post('/auth/login', { email, password });
};

export const register = (username, email, password) => {
  return apiClient.post('/auth/register', { username, email, password });
};

// == Rute Pengguna ==
export const getProfile = () => {
  return apiClient.get('/users/me');
};

export const getFriends = () => {
  // return apiClient.get('/users/friends'); // Uncomment saat backend siap
  console.log('Fungsi getFriends() dipanggil, tetapi API belum diimplementasikan.');
  return Promise.resolve({ data: [] }); // Mengembalikan data simulasi
};

// == Rute Toko ==
export const getShopItems = () => {
  return apiClient.get('/shop/items');
};

export const buyItem = (itemId) => {
  return apiClient.post(`/shop/buy/${itemId}`);
};

// == Rute Chat ==
export const chatWithAI = (message) => {
  return apiClient.post('/chat/ai', { message });
};

export const logP2PMessage = () => {
  return apiClient.post('/chat/log-p2p');
};

// Ekspor default untuk kemudahan impor
export default apiClient;
