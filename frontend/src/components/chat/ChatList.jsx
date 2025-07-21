import React from 'react';

// Objek khusus untuk mewakili obrolan dengan AI.
// Ini memungkinkan kita untuk menanganinya secara unik di komponen induk.
const aiFriend = { id: 'ai', name: 'PuterAI', avatar: '🤖', lastMessage: 'Tanyakan apa saja kepada saya!', isOnline: true };

const FriendList = ({ friends = [], onSelectFriend, selectedFriendId }) => {
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
            <div className="text-3xl mr-4">{aiFriend.avatar}</div>
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
              <div className="relative">
                <div className="text-3xl mr-4">{friend.avatar}</div>
                {/* Indikator Status Online */}
                <span className={`absolute bottom-0 right-3 block h-3 w-3 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'} ring-2 ring-white`}></span>
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
