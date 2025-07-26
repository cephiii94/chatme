import React from 'react';
import { AVATAR_MAP } from '../../context/AppearanceContext.jsx';

const Avatar = ({ 
    username, 
    avatarId = null, 
    size = 'md', 
    className = '',
    showRing = true 
}) => {
    const avatarConfig = AVATAR_MAP[avatarId] || AVATAR_MAP[null];
    const hasCustomAvatar = avatarId && avatarConfig;
    
    // Size mapping
    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl',
        '2xl': 'w-24 h-24 text-4xl'
    };
    
    const ringClasses = showRing ? 'ring-2 ring-offset-1 ring-blue-200 dark:ring-blue-500' : '';
    
    return (
        <div 
            className={`
                ${sizeClasses[size]} 
                rounded-full 
                bg-blue-100 
                dark:bg-blue-900 
                flex 
                items-center 
                justify-center 
                font-bold 
                text-blue-600 
                dark:text-blue-300 
                flex-shrink-0 
                ${ringClasses}
                ${className}
                overflow-hidden
            `}
        >
            {hasCustomAvatar && avatarConfig.type === 'image' ? (
                // Tampilkan gambar asset
                <img 
                    src={avatarConfig.src} 
                    alt={avatarConfig.name}
                    className="w-full h-full object-cover"
                />
            ) : hasCustomAvatar && avatarConfig.icon ? (
                // Tampilkan emoji
                <span className="text-2xl">{avatarConfig.icon}</span>
            ) : (
                // Tampilkan inisial username
                <span>{username?.charAt(0).toUpperCase() || '?'}</span>
            )}
        </div>
    );
};

export default Avatar; 