import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';

// Placeholder untuk user API service
const userApi = {
    fetchProfile: async (userId) => {
        console.log(`Fetching profile for user: ${userId}`);
        // Simulasi pengambilan data detail dari "database"
        return {
            id: userId,
            username: 'Tuan Cecep',
            email: 'cecephard12@gmail.com',
            coins: 1337,
            level: 5,
            friends: [{id: 2, name: 'Erlin Karlinda'}, {id: 3, name: 'Vanno'}],
            achievements: ['Pesan Pertama', 'Pembelian Pertama'],
            // Inventaris awal/default dari server
            inventory: [
                { id: 1, name: 'Tema Chat "Dasar"', icon: '📄', type: 'tema' },
            ],
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
    const { user: authUser, isAuthenticated } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserProfile = async () => {
            if (isAuthenticated && authUser) {
                setLoading(true);
                try {
                    // 1. Ambil data profil dasar dari API
                    const userProfile = await userApi.fetchProfile(authUser.id);

                    // --- PERUBAHAN DI SINI: Menggabungkan dengan data localStorage ---
                    // 2. Cek apakah ada data inventaris di localStorage
                    const savedInventory = JSON.parse(localStorage.getItem(`inventory_${authUser.id}`));

                    if (savedInventory) {
                        // 3. Gabungkan inventaris dari API dengan yang dari localStorage
                        // Ini untuk memastikan item yang dibeli tidak hilang saat refresh
                        const combinedInventory = [...userProfile.inventory];
                        savedInventory.forEach(savedItem => {
                            if (!combinedInventory.find(item => item.id === savedItem.id)) {
                                combinedInventory.push(savedItem);
                            }
                        });
                        userProfile.inventory = combinedInventory;
                    }
                    // --- AKHIR PERUBAHAN ---

                    setProfile(userProfile);
                } catch (error) {
                    console.error("Gagal memuat profil pengguna:", error);
                    setProfile(null);
                } finally {
                    setLoading(false);
                }
            } else {
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

    // Fungsi untuk menambahkan item baru ke inventaris
    const addItemToInventory = (newItem) => {
        if (profile) {
            // Cek duplikat sebelum menambahkan
            if (profile.inventory.find(item => item.id === newItem.id)) {
                console.log("Item sudah ada di inventaris.");
                return;
            }

            const updatedInventory = [...profile.inventory, newItem];

            // --- PERUBAHAN DI SINI: Menyimpan ke localStorage ---
            // 1. Simpan inventaris yang sudah diupdate ke localStorage
            // Kita gunakan userId agar data spesifik untuk setiap pengguna
            localStorage.setItem(`inventory_${profile.id}`, JSON.stringify(updatedInventory));
            // --- AKHIR PERUBAHAN ---

            // 2. Update state React
            setProfile(prevProfile => ({
                ...prevProfile,
                inventory: updatedInventory
            }));
        }
    };

    const value = {
        profile,
        loading,
        updateCoins,
        addItemToInventory
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider> 
    );
};
