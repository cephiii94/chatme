import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Buat Context
const ChatContext = createContext();

// 2. Buat Hook kustom untuk kemudahan penggunaan
export const useChat = () => {
    return useContext(ChatContext);
};

// --- PERUBAHAN DI SINI: Memperbarui struktur data awal ---
// Data awal untuk simulasi, sekarang menggunakan struktur objek 'item'
const initialMessagesData = {
    2: [
        { id: 2, sender: 'other', text: 'Jangan lupa beli susu ya.', type: 'text'}, 
        { id: 3, sender: 'me', text: 'Oke, siap!', type: 'text'},
        { 
            id: 4, 
            sender: 'other', 
            type: 'hadiah', 
            claimed: false,
            // Pesan hadiah sekarang berisi seluruh objek item
            item: { id: 10, name: 'Hadiah "Mawar"', price: 50, icon: '🌹', category: 'sosial', subCategory: 'hadiah' }
        },
    ],
    3: [
        { id: 5, sender: 'other', text: 'Ayah, main yuk!', type: 'text'},
        // Menambahkan contoh hadiah baru dari Vanno
        { 
            id: 6, 
            sender: 'other', 
            type: 'hadiah', 
            claimed: false,
            item: { id: 18, name: 'Hadiah "Kopi"', price: 25, icon: '☕', category: 'sosial', subCategory: 'hadiah' } 
        }
    ],
    // --- Menambahkan chat untuk Arman (ID 7) ---
    7: [
        { id: 701, sender: 'other', text: 'Hai, apa kabar?', type: 'text' },
        { id: 702, sender: 'me', text: 'Baik, kamu?', type: 'text' },
        { 
            id: 703, 
            sender: 'other', 
            type: 'hadiah', 
            claimed: false,
            item: { id: 7001, name: 'Hadiah "Buku"', price: 100, icon: '📚', category: 'pendidikan', subCategory: 'hadiah' } 
        },
        { id: 704, sender: 'other', text: 'Semoga suka hadiahnya!', type: 'text' },
    ],
    // --- Menambahkan chat untuk Bycycle (ID 8) ---
    8: [
        { id: 801, sender: 'other', text: 'Sudah siap untuk bersepeda besok?', type: 'text' },
        { id: 802, sender: 'me', text: 'Tentu! Aku sudah siap.', type: 'text' },
        { 
            id: 803, 
            sender: 'other', 
            type: 'hadiah', 
            claimed: false,
            item: { id: 8001, name: 'Hadiah "Botol Minum"', price: 30, icon: '🥤', category: 'olahraga', subCategory: 'hadiah' } 
        },
    ],
    // --- Menambahkan chat untuk Crombo (ID 9) ---
    9: [
        { id: 901, sender: 'other', text: 'PuterAI telah melakukan pembaruan!', type: 'text' },
        { id: 902, sender: 'me', text: 'Wah, keren!', type: 'text' },
        { 
            id: 903, 
            sender: 'other', 
            type: 'hadiah', 
            claimed: false,
            item: { id: 9001, name: 'Hadiah "Chip Komputer"', price: 200, icon: '💻', category: 'teknologi', subCategory: 'hadiah' } 
        },
        { id: 904, sender: 'other', text: 'Ini hadiah dari PuterAI untukmu.', type: 'text' },
    ],
};

// 3. Buat Provider Component
export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState(() => {
        try {
            const storedMessages = localStorage.getItem('chat_messages');
            return storedMessages ? JSON.parse(storedMessages) : initialMessagesData;
        } catch (error) {
            console.error("Gagal memuat pesan dari localStorage", error);
            return initialMessagesData;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('chat_messages', JSON.stringify(messages));
        } catch (error) {
            console.error("Gagal menyimpan pesan ke localStorage", error);
        }
    }, [messages]);

    const sendMessage = (friendId, messageObject) => {
        setMessages(prev => ({
            ...prev,
            [friendId]: [...(prev[friendId] || []), messageObject]
        }));
    };

    const claimGiftInMessage = (friendId, messageId) => {
        setMessages(prev => {
            const currentMessages = prev[friendId] || [];
            const updatedMessages = currentMessages.map(msg => {
                if (msg.id === messageId) {
                    return { ...msg, claimed: true };
                }
                return msg;
            });
            return { ...prev, [friendId]: updatedMessages };
        });
    };
    
    const resetChatData = () => {
        localStorage.removeItem('chat_messages');
    };

    const value = {
        messages,
        sendMessage,
        claimGiftInMessage,
        resetChatData,
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};
