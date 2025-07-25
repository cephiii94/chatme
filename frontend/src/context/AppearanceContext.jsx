import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AppearanceContext = createContext();

export const useAppearance = () => {
    return useContext(AppearanceContext);
};

// TAMBAHAN BARU: Konfigurasi tema yang lebih lengkap
const THEME_CONFIG = {
    null: { name: 'Tema Standar', className: '' },
    20: { name: 'Tema Gelap', className: 'dark' },
    1: { name: 'Tema Galaxy', className: 'theme-galaxy' },
    21: { name: 'Tema Soft Blue', className: 'theme-softblue' }, // TEMA BARU
};

// Mapping warna nama berdasarkan id item
export const WARNA_NAMA_MAP = {
    'wn-01': 'rainbow', // pelangi, handle khusus di komponen
    'wn-02': '#2563eb', // biru
    'wn-03': '#22c55e', // hijau
    null: '',     // default
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