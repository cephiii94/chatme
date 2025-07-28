// filepath: c:\VSCODE\git\chatsyok\frontend\src\mocks\mockUsers.js
export const currentUser = {
  id: 'u001',
  username: 'Tuan Cecep',
  name: 'Tuan Cecep',
  email: 'cecep@gmail.com',
  avatarId: 'av-01',
  warnaName: 'wn-02',
  level: 5,
  coins: 120,
  isOnline: true,
  friends: ['u002', 'u003', 'u004']
};

export const friends = [
  {
    id: 'u002',
    username: 'arman',
    name: 'Arman',
    avatar: '🧑‍💼',
    warnaName: 'wn-03',
    level: 3,
    coins: 50,
    isOnline: true,
    email: 'arman@mail.com',
    lastMessage: 'Arman mengirim hadiah untukmu!' // <-- tambahkan ini
  },
  {
    id: 'u003',
    username: 'budi',
    name: 'Budi',
    avatar: '👨‍🔧',
    warnaName: 'wn-04',
    level: 2,
    coins: 30,
    isOnline: false,
    email: 'budi@mail.com'
  },
  {
    id: 'u004',
    username: 'chrono',
    name: 'Chrono',
    avatar: '🧑‍🚀',
    warnaName: 'wn-05',
    level: 7,
    coins: 200,
    isOnline: true,
    email: 'chrono@mail.com'
  }
];