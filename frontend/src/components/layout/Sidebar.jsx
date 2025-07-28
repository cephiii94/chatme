import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useUser } from '../../context/UserContext.jsx';
import { useChat } from '../../context/ChatContext.jsx';
import { useAppearance, WARNA_NAMA_MAP } from '../../context/AppearanceContext.jsx';
import Modal from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';
import Avatar from '../ui/Avatar.jsx';
import UserProfilePreview from '../ui/UserProfilePreview.jsx';

const navItems = [
  { href: "/chat", label: "Chat", icon: '💬' },
  { href: "/friends", label: "Teman", icon: '👥' },
  { href: "/shop", label: "Toko", icon: '🛍️' },
  { href: "/inventory", label: "Inventaris", icon: '🎒' },
  { href: "/achievements", label: "Pencapaian", icon: '🏆' },
];

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { logout } = useAuth();
    const { profile, resetUserData } = useUser();
    const { resetChatData } = useChat();
    const { resetAppearanceData, activeItems } = useAppearance();

    if (!profile) {
        return <div className="w-20 h-screen bg-white shadow-lg dark:bg-gray-900"></div>;
    }

    const handleResetClick = () => {
        resetUserData();
        resetChatData();
        resetAppearanceData();
        window.location.reload();
    };

    // Fungsi bantuan untuk merender nama pengguna dengan gaya yang benar
    const renderUsername = () => {
        const styleInfo = WARNA_NAMA_MAP[activeItems['warna nama']] || WARNA_NAMA_MAP[null];
        
        if (styleInfo && styleInfo.type === 'class') {
            return <p className={`text-sm font-semibold truncate ${styleInfo.value}`}>{profile.username}</p>;
        }
        
        return <p className="text-sm font-semibold truncate" style={{ color: styleInfo ? styleInfo.value : undefined }}>{profile.username}</p>;
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
                    <UserProfilePreview
                        user={{
                            username: profile.username,
                            email: profile.email,
                            level: profile.level,
                            coins: profile.coins,
                            avatarId: activeItems.avatar,
                            warnaName: activeItems['warna nama']
                        }}
                        showLevel={true}
                        showCoins={true}
                        showEmail={true}
                        showActions={false}
                        showUserActions={true}
                        onLogout={logout}
                        onResetData={handleResetClick}
                        className="flex items-center w-full"
                    >
                        <Avatar
                            username={profile.username}
                            avatarId={activeItems.avatar}
                            size="md"
                        />
                        {isExpanded && (
                            <div className="ml-3 overflow-hidden">
                                {/* Panggil fungsi render di sini */}
                                {renderUsername()}
                                <p className="text-xs text-gray-500 dark:text-gray-400">Level {profile.level || 1}</p>
                            </div>
                        )}
                    </UserProfilePreview>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
