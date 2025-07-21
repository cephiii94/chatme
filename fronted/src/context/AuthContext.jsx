import React, { createContext, useState, useEffect, useContext } from 'react';

// Placeholder untuk API service
// Di aplikasi nyata, ini akan memanggil backend Anda.
const api = {
  login: async (email, password) => {
    console.log("API Login:", { email, password });
    if (email === 'cecep@gmail.com' && password === 'password123') {
      const token = 'fake-jwt-token-for-cecep';
      localStorage.setItem('token', token);
      return { token, user: { id: '123', email: 'cecep@gmail.com', username: 'Tuan Cecep' } };
    }
    throw new Error('Kredensial salah');
  },
  register: async (username, email, password) => {
    console.log("API Register:", { username, email, password });
    const token = `fake-jwt-for-${username}`;
    localStorage.setItem('token', token);
    return { token, user: { id: '456', email, username } };
  },
  getProfile: async (token) => {
      if(token){
          // Simulasi pengambilan profil berdasarkan token
          return { id: '123', email: 'cecep@gmail.com', username: 'Tuan Cecep', coins: 1337 };
      }
      throw new Error("Token tidak valid");
  }
};

// 1. Membuat Context
const AuthContext = createContext();

// Hook kustom untuk menggunakan AuthContext dengan mudah
export const useAuth = () => {
  return useContext(AuthContext);
};

// 2. Membuat Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Efek untuk memeriksa token saat aplikasi pertama kali dimuat
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          // Di aplikasi nyata, Anda akan memverifikasi token dengan endpoint backend
          const profile = await api.getProfile(token);
          setUser(profile);
        } catch (error) {
          // Token tidak valid atau kedaluwarsa
          console.error("Sesi tidak valid, silakan login kembali.", error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, [token]);

  // Fungsi untuk login
  const login = async (email, password) => {
    const { token, user } = await api.login(email, password);
    setToken(token);
    setUser(user);
    return { token, user };
  };

  // Fungsi untuk register
  const register = async (username, email, password) => {
    const { token, user } = await api.register(username, email, password);
    // Biasanya setelah register, pengguna langsung login
    setToken(token);
    setUser(user);
    return { token, user };
  };

  // Fungsi untuk logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Nilai yang akan disediakan oleh context
  const value = {
    user,
    token,
    isAuthenticated: !!user, // true jika user tidak null
    isLoading,
    login,
    register,
    logout,
  };

  // Render children hanya setelah selesai loading awal
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
