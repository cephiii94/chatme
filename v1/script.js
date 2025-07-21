        // Game State
        let gameState = {
            gold: 100,
            currentAvatar: 0,
            inventory: [0],
            peer: null,
            conn: null,
            isConnected: false,
            peerId: null
        };

        // Avatar data
        const avatars = [
            { id: 0, name: 'Default', price: 0, svg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%2364b5f6'/%3E%3Ccircle cx='50' cy='35' r='15' fill='white'/%3E%3Cpath d='M20 85 Q50 65 80 85' fill='white'/%3E%3C/svg%3E" },
            { id: 1, name: 'Warrior', price: 50, svg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23f44336'/%3E%3Ccircle cx='40' cy='35' r='3' fill='white'/%3E%3Ccircle cx='60' cy='35' r='3' fill='white'/%3E%3Cpath d='M35 60 L50 65 L65 60' stroke='white' stroke-width='2' fill='none'/%3E%3Crect x='45' y='15' width='10' height='15' fill='%23ffeb3b'/%3E%3C/svg%3E" },
            { id: 2, name: 'Mage', price: 75, svg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%239c27b0'/%3E%3Ccircle cx='40' cy='35' r='3' fill='white'/%3E%3Ccircle cx='60' cy='35' r='3' fill='white'/%3E%3Cpath d='M40 60 Q50 70 60 60' stroke='white' stroke-width='2' fill='none'/%3E%3Cpolygon points='50,10 45,25 55,25' fill='%23ffeb3b'/%3E%3C/svg%3E" },
            { id: 3, name: 'Robot', price: 100, svg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect x='15' y='25' width='70' height='60' rx='10' fill='%23607d8b'/%3E%3Ccircle cx='35' cy='45' r='5' fill='%2300bcd4'/%3E%3Ccircle cx='65' cy='45' r='5' fill='%2300bcd4'/%3E%3Crect x='40' y='60' width='20' height='8' rx='4' fill='%2300bcd4'/%3E%3Crect x='45' y='15' width='10' height='15' fill='%23ffeb3b'/%3E%3C/svg%3E" },
            { id: 4, name: 'Princess', price: 120, svg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23e91e63'/%3E%3Ccircle cx='40' cy='40' r='3' fill='white'/%3E%3Ccircle cx='60' cy='40' r='3' fill='white'/%3E%3Cpath d='M40 60 Q50 70 60 60' stroke='white' stroke-width='2' fill='none'/%3E%3Cpolygon points='50,5 40,20 60,20' fill='%23ffeb3b'/%3E%3Ccircle cx='50' cy='15' r='3' fill='%23ff1744'/%3E%3C/svg%3E" }
        ];

        // Quiz questions
        const quizQuestions = [
            { question: "Apa kepanjangan dari HTML?", options: ["Hypertext Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hypertext Machine Language"], correct: 0, reward: 20 },
            { question: "Bahasa pemrograman mana yang sering digunakan untuk AI?", options: ["HTML", "Python", "CSS", "SQL"], correct: 1, reward: 25 },
            { question: "Apa itu CSS?", options: ["Computer Style System", "Cascading Style Sheets", "Creative Style System", "Code Style Sheets"], correct: 1, reward: 15 },
            { question: "Siapa pendiri Facebook?", options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Elon Musk"], correct: 2, reward: 30 }
        ];

        // Initialize PeerJS
        function initializePeer() {
            try {
                gameState.peer = new Peer();
                gameState.peer.on('open', id => {
                    gameState.peerId = id;
                    console.log('My peer ID is: ' + id);
                    updateConnectionStatus('Siap connect. ID: ' + id);
                });
                gameState.peer.on('connection', conn => {
                    gameState.conn = conn;
                    setupConnection();
                });
                gameState.peer.on('error', err => {
                    console.log('PeerJS Error:', err);
                    updateConnectionStatus('Error PeerJS: ' + err.type);
                });
            } catch (error) {
                console.log('PeerJS tidak tersedia:', error);
                updateConnectionStatus('PeerJS tidak tersedia - Mode AI Lokal');
            }
        }

        function setupConnection() {
            gameState.conn.on('open', () => {
                gameState.isConnected = true;
                updateConnectionStatus('Connected dengan peer!');
                addMessage('ai', 'Koneksi peer berhasil! Sekarang Anda terhubung.');
            });
            gameState.conn.on('data', data => {
                if (data.type === 'message') {
                    addMessage('ai', data.content);
                }
            });
            gameState.conn.on('close', () => {
                gameState.isConnected = false;
                updateConnectionStatus('Koneksi terputus');
                addMessage('ai', 'Koneksi peer terputus. Kembali ke mode AI lokal.');
            });
        }

        function connectToPeer() {
            const remotePeerId = prompt('Masukkan Peer ID yang ingin dihubungi:');
            if (remotePeerId && gameState.peer) {
                try {
                    gameState.conn = gameState.peer.connect(remotePeerId);
                    setupConnection();
                } catch (error) {
                    alert('Gagal menghubungkan ke peer: ' + error.message);
                }
            }
        }

        function toggleConnection() {
            if (!gameState.peer) {
                initializePeer();
            } else if (!gameState.isConnected) {
                connectToPeer();
            } else {
                if (gameState.conn) gameState.conn.close();
                gameState.isConnected = false;
                updateConnectionStatus('Disconnected');
            }
        }

        function updateConnectionStatus(status) {
            const statusElement = document.getElementById('connectionStatus');
            statusElement.textContent = 'Status: ' + status;
            statusElement.className = 'connection-status ' + (gameState.isConnected ? 'connected' : 'disconnected');
        }

        // Chat functionality
        function addMessage(sender, content) {
            const chatArea = document.getElementById('chatArea');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            const avatarSrc = sender === 'ai' 
                ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23ff7043'/%3E%3Ccircle cx='35' cy='40' r='5' fill='white'/%3E%3Ccircle cx='65' cy='40' r='5' fill='white'/%3E%3Cpath d='M30 60 Q50 75 70 60' stroke='white' stroke-width='3' fill='none'/%3E%3C/svg%3E"
                : avatars[gameState.currentAvatar].svg;
            messageDiv.innerHTML = `<img class="message-avatar" src="${avatarSrc}" alt="${sender}"><div class="message-content">${content}</div>`;
            chatArea.appendChild(messageDiv);
            chatArea.scrollTop = chatArea.scrollHeight;
            if (sender === 'user') awardGold(5);
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            if (message) {
                addMessage('user', message);
                input.value = '';
                if (gameState.isConnected && gameState.conn) {
                    gameState.conn.send({ type: 'message', content: message });
                } else {
                    setTimeout(() => {
                        const responses = ["Itu menarik!", "Bagaimana pendapat Anda?", "Terima kasih sudah berbagi!", "Saya senang bisa berbincang.", "Ide bagus!", "Anda mendapat +5 gold! 💰"];
                        addMessage('ai', responses[Math.floor(Math.random() * responses.length)]);
                    }, 1000 + Math.random() * 1000);
                }
            }
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') sendMessage();
        }

        // Game mechanics
        function awardGold(amount) {
            gameState.gold += amount;
            updateGoldDisplay();
            const goldElement = document.getElementById('goldAmount');
            goldElement.parentElement.classList.add('gold-earned');
            setTimeout(() => goldElement.parentElement.classList.remove('gold-earned'), 1000);
        }

        function updateGoldDisplay() {
            document.getElementById('goldAmount').textContent = gameState.gold;
        }

        function updateAvatar() {
            document.getElementById('userAvatar').src = avatars[gameState.currentAvatar].svg;
        }

        // Shop, Inventory, Quiz functionality
        function openShop() {
            const modal = document.getElementById('shopModal');
            const shopGrid = document.getElementById('shopGrid');
            shopGrid.innerHTML = '';
            avatars.forEach(avatar => {
                if (!gameState.inventory.includes(avatar.id)) {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'item-card';
                    itemDiv.innerHTML = `<img class="item-avatar" src="${avatar.svg}" alt="${avatar.name}"><b>${avatar.name}</b><div class="item-price">💰 ${avatar.price}</div>`;
                    itemDiv.onclick = () => buyAvatar(avatar.id);
                    shopGrid.appendChild(itemDiv);
                }
            });
            if (shopGrid.innerHTML === '') shopGrid.innerHTML = '<p style="text-align:center; grid-column:1/-1;">Semua avatar sudah dimiliki! 🎉</p>';
            modal.style.display = 'flex';
        }

        function buyAvatar(avatarId) {
            const avatar = avatars.find(a => a.id === avatarId);
            if (gameState.gold >= avatar.price) {
                gameState.gold -= avatar.price;
                gameState.inventory.push(avatarId);
                updateGoldDisplay();
                addMessage('ai', `Selamat! Anda berhasil membeli avatar ${avatar.name}!`);
                closeModal('shopModal');
            } else {
                addMessage('ai', `Gold tidak cukup untuk membeli ${avatar.name}.`);
            }
        }

        function openInventory() {
            const modal = document.getElementById('inventoryModal');
            const inventoryGrid = document.getElementById('inventoryGrid');
            inventoryGrid.innerHTML = '';
            gameState.inventory.forEach(avatarId => {
                const avatar = avatars.find(a => a.id === avatarId);
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item-card';
                itemDiv.style.border = gameState.currentAvatar === avatarId ? '3px solid #4caf50' : '1px solid #ddd';
                itemDiv.innerHTML = `<img class="item-avatar" src="${avatar.svg}" alt="${avatar.name}"><b>${avatar.name}</b><div style="color:#4caf50;">${gameState.currentAvatar === avatarId ? 'Aktif' : 'Pakai'}</div>`;
                itemDiv.onclick = () => useAvatar(avatarId);
                inventoryGrid.appendChild(itemDiv);
            });
            modal.style.display = 'flex';
        }

        function useAvatar(avatarId) {
            gameState.currentAvatar = avatarId;
            updateAvatar();
            closeModal('inventoryModal');
            addMessage('ai', `Avatar ${avatars[avatarId].name} sekarang aktif!`);
        }

        function openQuiz() {
            const modal = document.getElementById('quizModal');
            const quizContent = document.getElementById('quizContent');
            const q = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
            quizContent.innerHTML = `<div class="quiz-question"><h3>${q.question}</h3><div class="quiz-options">${q.options.map((opt, i) => `<div class="quiz-option" onclick="answerQuiz(${i}, ${q.correct}, ${q.reward})">${opt}</div>`).join('')}</div><div style="text-align:center;color:#666;margin-top:15px;">Hadiah: 💰 ${q.reward}</div></div>`;
            modal.style.display = 'flex';
        }

        function answerQuiz(selectedIndex, correctIndex, reward) {
            const quizContent = document.getElementById('quizContent');
            const isCorrect = selectedIndex === correctIndex;
            quizContent.innerHTML = `<div class="quiz-result"><h3>${isCorrect ? '🎉 Benar!' : '❌ Salah!'}</h3><p>${isCorrect ? `Anda mendapat ${reward} gold!` : 'Coba lagi!'}</p><button class="send-btn" onclick="closeModal('quizModal')">Tutup</button></div>`;
            if (isCorrect) {
                awardGold(reward);
                addMessage('ai', `Hebat! Jawaban benar dan Anda mendapat ${reward} gold!`);
            } else {
                addMessage('ai', 'Sayang sekali, jawaban kurang tepat.');
            }
        }
        
        // Menu Controls
        function toggleProfileMenu() {
            document.getElementById('profileMenu').classList.toggle('hidden');
        }

        // PENAMBAHAN: Fungsi untuk toggle menu kanan (more menu)
        function toggleMoreMenu() {
            document.getElementById('moreMenu').classList.toggle('hidden');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // PERUBAHAN: Event listener untuk menutup semua menu/modal
        window.addEventListener('click', function(event) {
            // Menutup modal
            document.querySelectorAll('.modal').forEach(modal => {
                if (event.target == modal) modal.style.display = 'none';
            });

            // Menutup menu profil
            const profileMenu = document.getElementById('profileMenu');
            if (!profileMenu.classList.contains('hidden') && !event.target.closest('.user-info')) {
                profileMenu.classList.add('hidden');
            }
            
            // Menutup menu kanan (more menu)
            const moreMenu = document.getElementById('moreMenu');
            if (!moreMenu.classList.contains('hidden') && !event.target.closest('.more-menu-container')) {
                moreMenu.classList.add('hidden');
            }
        });

        // Initialize game
        function initGame() {
            updateGoldDisplay();
            updateAvatar();
            setTimeout(initializePeer, 1000);
            setTimeout(() => addMessage('ai', 'Selamat datang di AI Chatbot Game! 🎮'), 500);
        }

        document.addEventListener('DOMContentLoaded', initGame);
