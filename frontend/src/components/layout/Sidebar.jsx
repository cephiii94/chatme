// frontend/src/components/layout/Sidebar.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useUser } from '../../context/UserContext.jsx';
import { useChat } from '../../context/ChatContext.jsx';
import { useAppearance, WARNA_NAMA_MAP } from '../../context/AppearanceContext.jsx';
import Modal from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';
import Avatar from '../ui/Avatar.jsx';
import UserProfilePreview from '../ui/UserProfilePreview.jsx';

// Menggunakan lucide-react untuk ikon
import { MessageSquare, Users, ShoppingBag, Award, Package, Home } from 'lucide-react';

const navItems = [
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/friends", label: "Teman", icon: Users },
  { href: "/shop", label: "Toko", icon: ShoppingBag },
  { href: "/inventory", label: "Inventaris", icon: Package },
  { href: "/achievements", label: "Pencapaian", icon: Award },
];

// Menerima prop showMobileNavbar
const Sidebar = ({ showMobileNavbar }) => {
    const { logout } = useAuth();
    const { profile, resetUserData } = useUser();
    const { resetChatData } = useChat();
    const { resetAppearanceData, activeItems } = useAppearance();

    // Tentukan warna ikon berdasarkan tema aktif
    const iconColorClass = (activeItems.tema === 'tm-01' || activeItems.tema === 'tm-02') ? 'text-white' : 'text-gray-800 dark:text-gray-100';
    const dynamicIconColor = activeItems.tema === 'tm-03' ? 'text-blue-800' : iconColorClass;

    if (!profile) {
        return <div className="w-16 h-screen theme-bg-secondary shadow-lg dark:bg-gray-900"></div>;
    }

    const handleResetClick = () => {
        resetUserData();
        resetChatData();
        resetAppearanceData();
        window.location.reload();
    };

    const renderUsername = () => {
        const styleInfo = WARNA_NAMA_MAP[activeItems['warna nama']] || WARNA_NAMA_MAP[null];
        
        if (styleInfo && styleInfo.type === 'class') {
            return <p className={`text-sm font-semibold truncate ${styleInfo.value}`}>{profile.username}</p>;
        }
        
        return <p className="text-sm font-semibold truncate" style={{ color: styleInfo ? styleInfo.value : undefined }}>{profile.username}</p>;
    };

    return (
        <>
            {/* Sidebar tetap (fixed) dengan lebar w-16 di layar besar */}
            <aside
                className={`hidden md:flex flex-col h-screen theme-bg-secondary shadow-lg z-20 dark:border-r dark:border-gray-700 w-16 fixed top-0 left-0`}
            >
                <div className="flex items-center justify-center h-20 border-b flex-shrink-0 dark:border-gray-700">
                    <Home className={`text-3xl ${dynamicIconColor}`} />
                </div>
                <nav className="flex-grow pt-4">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a href={item.href} className="group relative flex items-center justify-center h-12 px-2 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-300 rounded-lg mx-1">
                                    <item.icon className={`w-6 h-6 flex-shrink-0 ${dynamicIconColor}`} />
                                    <span className="absolute left-full ml-3 px-3 py-1 bg-gray-700 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                                        {item.label}
                                    </span>
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
                        className="flex items-center justify-center w-full"
                    >
                        <Avatar
                            username={profile.username}
                            avatarId={activeItems.avatar}
                            size="md"
                        />
                    </UserProfilePreview>
                </div>
            </aside>

            {/* Navbar bawah untuk layar kecil (di bawah md) */}
            {/* PENTING: Menambahkan kelas 'hidden' secara kondisional berdasarkan showMobileNavbar */}
            <nav className={`md:hidden fixed bottom-0 left-0 w-full theme-bg-secondary text-white p-2 shadow-lg rounded-t-lg z-50 ${showMobileNavbar ? '' : 'hidden'}`}>
                <ul className="flex justify-around items-center">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} className="flex flex-col items-center p-2 text-xs hover:bg-gray-700 rounded-lg transition-colors duration-200">
                                <item.icon className={`h-5 w-5 mb-1 ${dynamicIconColor}`} />
                                <span className="theme-text-primary">{item.label}</span>
                            </a>
                        </li>
                    ))}
                    <li>
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
                            className="flex flex-col items-center p-2 text-xs"
                        >
                            <Avatar
                                username={profile.username}
                                avatarId={activeItems.avatar}
                                size="sm"
                            />
                            <span className="theme-text-primary mt-1">Profil</span>
                        </UserProfilePreview>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;
