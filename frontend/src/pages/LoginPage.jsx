import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; // Impor useAuth

export default function LoginPage() {
  // Gunakan fungsi login dan register langsung dari AuthContext
  const { login, register } = useAuth(); 

  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLoginView) {
        const { email, password } = formData;
        // Panggil fungsi login dari context.
        // Jika berhasil, context akan diperbarui dan App.jsx akan otomatis
        // menampilkan halaman chat tanpa perlu navigasi manual.
        await login(email, password);
      } else {
        const { username, email, password } = formData;
        await register(username, email, password);
        alert('Registrasi berhasil! Silakan login dengan akun baru Anda.');
        setIsLoginView(true);
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan.');
    } finally {
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
          {error && (
            <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg">
              {error}
            </div>
          )}
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
