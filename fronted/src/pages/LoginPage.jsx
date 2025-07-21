import React, { useState, useContext } from 'react';

// --- Placeholder untuk Konteks dan API ---
// Di aplikasi nyata, ini akan diimpor dari file lain.
// const { login } = useContext(AuthContext); // Contoh penggunaan AuthContext
// import { apiLogin, apiRegister } from '../services/api'; 
const apiLogin = async ({ email, password }) => {
  // Simulasi panggilan API
  console.log('Mencoba login dengan:', { email, password });
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi latensi jaringan
  if (email === 'cecep@gmail.com' && password === 'password123') {
    return { token: 'fake-jwt-token-string', user: { email: 'cecep@gmail.com', username: 'Tuan Cecep' } };
  }
  throw new Error('Email atau password salah.');
};

const apiRegister = async ({ username, email, password }) => {
    console.log('Mencoba registrasi dengan:', { username, email, password });
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulasi username atau email sudah ada
    if (email === 'sudahada@gmail.com') {
        throw new Error('Email sudah digunakan.');
    }
    return { token: 'new-fake-jwt-token', user: { email, username } };
};


// --- Komponen Utama LoginPage ---
export default function LoginPage() {
  // State untuk beralih antara mode Login dan Register
  const [isLoginView, setIsLoginView] = useState(true);
  
  // State untuk data formulir, pesan error, dan status loading
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handler untuk memperbarui state saat pengguna mengetik
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler untuk pengiriman formulir
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (isLoginView) {
        // Panggil API login
        const { email, password } = formData;
        response = await apiLogin({ email, password });
        console.log('Login berhasil!', response);
        // Di aplikasi nyata, simpan token (misal di localStorage atau context)
        // localStorage.setItem('token', response.token);
        alert('Login berhasil! Anda akan diarahkan ke halaman chat.');
        // window.location.href = '/chat'; // Navigasi ke halaman chat
      } else {
        // Panggil API register
        const { username, email, password } = formData;
        response = await apiRegister({ username, email, password });
        console.log('Registrasi berhasil!', response);
        alert('Registrasi berhasil! Silakan login dengan akun baru Anda.');
        setIsLoginView(true); // Arahkan ke tampilan login setelah registrasi
      }
    } catch (err) {
      // Tangani error dari API
      setError(err.message || 'Terjadi kesalahan.');
    } finally {
      // Hentikan status loading
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 flex items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-900">
          {isLoginView ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
        </h1>
        <p className="text-center text-blue-700">
          {isLoginView ? 'Silakan masuk ke akun Anda.' : 'Bergabunglah dengan ChatsYok!'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Username (hanya untuk registrasi) */}
          {!isLoginView && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tuan Cecep"
              />
            </div>
          )}

          {/* Input Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Alamat Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="cecephard12@gmail.com"
            />
          </div>

          {/* Input Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Kata Sandi
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          {/* Pesan Error */}
          {error && (
            <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg">
              {error}
            </div>
          )}

          {/* Tombol Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : (isLoginView ? 'Masuk' : 'Daftar')}
            </button>
          </div>
        </form>

        {/* Tombol untuk beralih mode */}
        <div className="text-sm text-center">
          <button
            onClick={() => {
              setIsLoginView(!isLoginView);
              setError('');
              setFormData({ username: '', email: '', password: '' });
            }}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isLoginView ? 'Belum punya akun? Daftar di sini.' : 'Sudah punya akun? Masuk di sini.'}
          </button>
        </div>
      </div>
    </div>
  );
}
