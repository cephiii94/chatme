import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AppearanceContext = createContext();

export const useAppearance = () => {
    return useContext(AppearanceContext);
};

// Definisikan ID untuk tema gelap kita
const DARK_THEME_ID = 20;

const defaultAppearance = {
    tema: null,  // PERBAIKAN: Gunakan "tema" bukan "theme"
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

    // Efek untuk menerapkan tema dan menyimpan ke localStorage
    useEffect(() => {
        if (!isLoading) {
            console.log('Applying theme. Active tema ID:', activeItems.tema);
            
            // Terapkan class 'dark' ke elemen <html>
            if (activeItems.tema === DARK_THEME_ID) {
                console.log('Adding dark class...');
                document.documentElement.classList.add('dark');
            } else {
                console.log('Removing dark class...');
                document.documentElement.classList.remove('dark');
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