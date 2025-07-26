import React from 'react';
import Avatar from '../ui/Avatar';
import UserProfilePreview from '../ui/UserProfilePreview';
import { useAuth } from '../../context/AuthContext.jsx';
import { useUser } from '../../context/UserContext.jsx';

// Objek khusus untuk mewakili obrolan dengan AI.
// Ini memungkinkan kita untuk menanganinya secara unik di komponen induk.
const aiFriend = { id: 'ai', name: 'PuterAI', avatar: '🤖', lastMessage: 'Tanyakan apa saja kepada saya!', isOnline: true };

const FriendList = ({ friends = [], onSelectFriend, selectedFriendId }) => {
  const { user: authUser } = useAuth();
  const { profile, resetUserData } = useUser();
  const { logout } = useAuth();

  // Use current user's profile for all previews
  const currentUserProfile = profile || authUser;
  return (
    <div className="bg-blue-50 border-r border-blue-200 flex flex-col h-full">
      {/* Header komponen */}
      <div className="p-4 border-b border-blue-200">
        <h2 className="text-xl font-bold text-blue-900">Chats</h2>
      </div>

      {/* Daftar yang dapat di-scroll */}
      <div className="flex-grow overflow-y-auto">
        <ul>
          {/* Tombol Khusus untuk Chat dengan AI */}
          <li
            onClick={() => onSelectFriend(aiFriend)}
            className={`flex items-center p-4 cursor-pointer hover:bg-blue-100 ${selectedFriendId === aiFriend.id ? 'bg-blue-200' : ''}`}
          >
            <div className="mr-4">
              <UserProfilePreview
                user={aiFriend}
                showLevel={true}
                showCoins={false}
                showEmail={false}
                showActions={false}
                showUserActions={false}
              >
                <Avatar
                  username={aiFriend.name}
                  size="lg"
                />
              </UserProfilePreview>
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-blue-800">{aiFriend.name}</p>
            </div>
          </li>

          {/* Garis Pemisah Visual */}
          <hr className="border-blue-200 mx-4" />

          {/* Daftar Teman dari Props */}
          {friends.map((friend) => (
            <li
              key={friend.id}
              onClick={() => onSelectFriend(friend)}
              className={`flex items-center p-4 cursor-pointer hover:bg-blue-100 ${selectedFriendId === friend.id ? 'bg-blue-200' : ''}`}
            >
              <div className="relative mr-4">
                <UserProfilePreview
                  user={friend}
                  showLevel={true}
                  showCoins={false}
                  showEmail={false}
                  showActions={true}
                  showUserActions={false}
                  onStartChat={(selectedFriend) => onSelectFriend(selectedFriend)}
                >
                  <Avatar
                    username={friend.name}
                    size="lg"
                  />
                </UserProfilePreview>
                {/* Indikator Status Online */}
                <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'} ring-2 ring-white`}></span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-blue-800">{friend.name}</p>
                <p className="text-sm text-gray-600 truncate">{friend.lastMessage}</p>
              </div>
              {friend.unread > 0 && (
                <div className="bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {friend.unread}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendList;
