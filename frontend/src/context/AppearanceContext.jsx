import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AppearanceContext = createContext();

export const useAppearance = () => {
    return useContext(AppearanceContext);
};

// Definisikan ID untuk tema gelap kita
const DARK_THEME_ID = 20;

const defaultAppearance = {
    theme: null,
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
                const initialAppearance = storedAppearance ? JSON.parse(storedAppearance) : defaultAppearance;
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

    // Efek untuk menerapkan tema dan menyimpan ke localStorage
    useEffect(() => {
        if (!isLoading) {
            // Terapkan class 'dark' ke elemen <html>
            if (activeItems.theme === DARK_THEME_ID) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            // Simpan ke localStorage jika ada pengguna
            if (user) {
                localStorage.setItem(`appearance_${user.id}`, JSON.stringify(activeItems));
            }
        }
    }, [activeItems, isLoading, user]);

    const setAppearance = (subCategory, itemId) => {
        setActiveItems(prev => ({
            ...prev,
            [subCategory]: itemId
        }));
    };
    
    const resetAppearanceData = () => {
        if (user) {
            localStorage.removeItem(`appearance_${user.id}`);
            document.documentElement.classList.remove('dark');
            setActiveItems(defaultAppearance);
        }
    };

    const value = {
        activeItems,
        isLoading,
        setAppearance,
        resetAppearanceData,
    };

    return (
        <AppearanceContext.Provider value={value}>
            {children}
        </AppearanceContext.Provider>
    );
};
