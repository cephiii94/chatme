import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useUser } from '../../context/UserContext.jsx';
import { useChat } from '../../context/ChatContext.jsx';
import { useAppearance } from '../../context/AppearanceContext.jsx';
import Modal from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';

const navItems = [
  { href: "/chat", label: "Chat", icon: '💬' },
  { href: "/friends", label: "Teman", icon: '👥' },
  { href: "/shop", label: "Toko", icon: '🛍️' },
  { href: "/inventory", label: "Inventaris", icon: '🎁' },
  { href: "/achievements", label: "Pencapaian", icon: '🏆' },
];

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const { logout } = useAuth();
    const { profile, resetUserData } = useUser();
    const { resetChatData } = useChat();
    const { resetAppearanceData } = useAppearance();

    if (!profile) {
        return <div className="w-20 h-screen bg-white shadow-lg dark:bg-gray-900"></div>;
    }

    const handleResetClick = () => {
        const isConfirmed = window.confirm(
            "Apakah Anda yakin ingin mereset data trial? Semua data akan hilang."
        );
        if (isConfirmed) {
            resetUserData();
            resetChatData();
            resetAppearanceData();
            window.location.reload();
        }
    };

    return (
        <>
            <aside
                className={`h-screen bg-white shadow-lg flex flex-col z-20 transition-all duration-300 ease-in-out dark:bg-gray-800 dark:border-r dark:border-gray-700 ${isExpanded ? 'w-64' : 'w-20'}`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                <div className="flex items-center justify-center h-20 border-b flex-shrink-0 dark:border-gray-700">
                    <span className={`text-3xl transition-transform duration-300`}>
                        💬
                    </span>
                    {isExpanded && <span className="text-xl font-bold ml-2 text-blue-600 dark:text-blue-400">ChatsYok</span>}
                </div>
                <nav className="flex-grow pt-4">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a href={item.href} className="flex items-center h-12 px-6 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-300">
                                    <span className="text-2xl w-6 h-6 flex items-center justify-center">{item.icon}</span>
                                    <span className={`ml-4 whitespace-nowrap transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t flex-shrink-0 dark:border-gray-700">
                    <div 
                        className="flex items-center cursor-pointer"
                        onClick={() => setIsProfileModalOpen(true)}
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600 dark:text-blue-300 flex-shrink-0 ring-2 ring-offset-1 ring-blue-200 dark:ring-blue-500">
                            {profile.username.charAt(0).toUpperCase()}
                        </div>
                        {isExpanded && (
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{profile.username}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Level {profile.level || 1}</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* --- KONTEN MODAL YANG DIPERBAIKI --- */}
            <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} title="Profil Pengguna">
                <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600 dark:text-blue-300 text-4xl mx-auto mb-4 ring-4 ring-offset-2 ring-blue-400 dark:ring-blue-600">
                        {profile.username.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-bold dark:text-gray-100">{profile.username}</h2>
                    <p className="text-sm font-bold text-blue-500 dark:text-blue-400 mb-2">Level {profile.level || 1}</p>
                    <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
                    <div className="mt-4 bg-yellow-100 text-yellow-800 text-lg font-semibold py-2 px-4 rounded-full inline-block">
                        {profile.coins} Koin 💰
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t dark:border-gray-600">
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2">Untuk keperluan trial & development</p>
                    <Button 
                        variant="warning" 
                        onClick={handleResetClick}
                        className="w-full !bg-yellow-500 hover:!bg-yellow-600 text-white"
                    >
                        Reset Data Trial
                    </Button>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <Button variant="danger" onClick={() => { setIsProfileModalOpen(false); logout(); }}>Keluar</Button>
                    <Button variant="secondary" onClick={() => setIsProfileModalOpen(false)}>Tutup</Button>
                </div>
            </Modal>
        </>
    );
};

export default Sidebar;
