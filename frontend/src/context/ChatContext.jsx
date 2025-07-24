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
