import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AppearanceContext = createContext();

export const useAppearance = () => {
    return useContext(AppearanceContext);
};

// TAMBAHAN BARU: Konfigurasi tema yang lebih lengkap
export const THEME_CONFIG = {
    null: { name: 'Tema Standar', className: '' },
    'tm-01': { name: 'Tema Gelap', className: 'dark' },
    'tm-02': { name: 'Tema Galaxy', className: 'theme-galaxy' },
    'tm-03': { name: 'Tema Soft Blue', className: 'theme-softblue' }, // TEMA BARU
};

// Mapping warna nama berdasarkan id item
export const WARNA_NAMA_MAP = {
    'wn-01': { type: 'class', value: 'rainbow-text' }, // pelangi, handle khusus di komponen
    'wn-02': '#2563eb', // biru
    'wn-03': '#22c55e', // hijau
    'wn-04': { type: 'color', value: '#8b5cf6' },      // Ungu menggunakan style
    
    // TAMBAHAN BARU UNTUK NEON
    'wn-05': { type: 'class', value: 'neon-text' },    // Neon menggunakan className

    null: { type: 'color', value: '' },                // Default
};


// TAMBAHAN BARU: Mapping avatar berdasarkan id item
export const AVATAR_MAP = {
    null: { icon: null, name: 'Standar' }, // akan menggunakan inisial username
    'ava-01': { icon: '👨‍🚀', name: 'Astronot', type: 'emoji' },
    'ava-02': { icon: '🐱', name: 'Kucing', type: 'emoji' },
    'ava-03': { src: '/avatars/avatar.png', name: 'Avatar Kustom', type: 'image' },
    // Contoh untuk avatar dengan gambar asset:
    // 'ava-04': { src: '/avatars/cat.png', name: 'Kucing Lucu', type: 'image' },
    // 'ava-05': { src: '/avatars/dog.gif', name: 'Anjing Bergerak', type: 'image' },
    // Tambahkan avatar lain di sini sesuai dengan item di shop
};

const defaultAppearance = {
    tema: null,
    'warna nama': null,
    'gelembung chat': null,
    avatar: null,
    border: null,
};

export const AppearanceProvider = ({ children }) => {
    const { user } = useAuth();
    const [activeItems, setActiveItems] = useState(defaultAppearance);
    const [isLoading, setIsLoading] = useState(true);

    // Efek untuk memuat pengaturan dari localStorage
    useEffect(() => {
        if (user) {
            try {
                const storedAppearance = localStorage.getItem(`appearance_${user.id}`);
                console.log('Loaded from storage:', storedAppearance);
                
                const initialAppearance = storedAppearance ? JSON.parse(storedAppearance) : defaultAppearance;
                console.log('Setting initial appearance:', initialAppearance);
                
                setActiveItems(initialAppearance);
            } catch (error) {
                console.error("Gagal memuat pengaturan tampilan", error);
                setActiveItems(defaultAppearance);
            } finally {
                setIsLoading(false);
            }
        } else if (!user) {
            setIsLoading(false);
        }
    }, [user]);

    // PERBAIKAN: Efek untuk menerapkan tema berdasarkan konfigurasi
    useEffect(() => {
        if (!isLoading) {
            console.log('Applying theme. Active tema ID:', activeItems.tema);
            
            // Reset semua class tema
            const htmlElement = document.documentElement;
            Object.values(THEME_CONFIG).forEach(theme => {
                if (theme.className) {
                    htmlElement.classList.remove(theme.className);
                }
            });
            
            // Terapkan tema yang aktif
            const currentTheme = THEME_CONFIG[activeItems.tema];
            if (currentTheme && currentTheme.className) {
                console.log('Adding theme class:', currentTheme.className);
                htmlElement.classList.add(currentTheme.className);
            }
            
            // Simpan ke localStorage jika ada pengguna
            if (user) {
                console.log('Saving to localStorage:', activeItems);
                localStorage.setItem(`appearance_${user.id}`, JSON.stringify(activeItems));
            }
        }
    }, [activeItems, isLoading, user]);

    const setAppearance = (subCategory, itemId) => {
        console.log('setAppearance called:', subCategory, itemId);
        
        setActiveItems(prev => {
            const newItems = {
                ...prev,
                [subCategory]: itemId
            };
            console.log('New activeItems will be:', newItems);
            return newItems;
        });
    };
    
    const resetAppearanceData = () => {
        if (user) {
            localStorage.removeItem(`appearance_${user.id}`);
            
            // Reset semua class tema
            const htmlElement = document.documentElement;
            Object.values(THEME_CONFIG).forEach(theme => {
                if (theme.className) {
                    htmlElement.classList.remove(theme.className);
                }
            });
            
            setActiveItems(defaultAppearance);
        }
    };

    const value = {
        activeItems,
        isLoading,
        setAppearance,
        resetAppearanceData,
        THEME_CONFIG, // Export untuk digunakan komponen lain
    };

    return (
        <AppearanceContext.Provider value={value}>
            {children}
        </AppearanceContext.Provider>
    );
};