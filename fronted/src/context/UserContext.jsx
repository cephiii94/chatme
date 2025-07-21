import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Bergantung pada AuthContext

// Placeholder untuk user API service
const userApi = {
    fetchProfile: async (userId) => {
        console.log(`Fetching profile for user: ${userId}`);
        // Simulasi pengambilan data detail
        return {
            id: userId,
            username: 'Tuan Cecep',
            email: 'cecep@gmail.com',
            coins: 1337,
            friends: [{id: 2, name: 'Erlin Karlinda'}, {id: 3, name: 'Vanno'}],
            achievements: ['Pesan Pertama', 'Pembelian Pertama'],
        };
    }
};

// 1. Membuat Context
const UserContext = createContext();

// Hook kustom untuk menggunakan UserContext
export const useUser = () => {
    return useContext(UserContext);
};

// 2. Membuat Provider Component
export const UserProvider = ({ children }) => {
    const { user: authUser, isAuthenticated } = useAuth(); // Dapatkan user dasar dari AuthContext
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserProfile = async () => {
            if (isAuthenticated && authUser) {
                setLoading(true);
                try {
                    const userProfile = await userApi.fetchProfile(authUser.id);
                    setProfile(userProfile);
                } catch (error) {
                    console.error("Gagal memuat profil pengguna:", error);
                    setProfile(null);
                } finally {
                    setLoading(false);
                }
            } else {
                // Jika tidak terautentikasi, pastikan profil kosong
                setProfile(null);
                setLoading(false);
            }
        };

        loadUserProfile();
    }, [isAuthenticated, authUser]);

    // Fungsi untuk memperbarui koin secara lokal
    const updateCoins = (newAmount) => {
        if (profile) {
            setProfile(prevProfile => ({ ...prevProfile, coins: newAmount }));
        }
    };

    const value = {
        profile,
        loading,
        updateCoins
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
