import { io } from 'socket.io-client';

// Pastikan Anda telah menambahkan socket.io-client ke proyek Anda.
// npm install socket.io-client

const socketService = {
  socket: null,

  /**
   * Menginisialisasi koneksi WebSocket ke server.
   * @param {string} token - Token JWT pengguna untuk otentikasi.
   */
  connect(token) {
    // Hindari koneksi ganda
    if (this.socket && this.socket.connected) {
      console.warn('Socket sudah terhubung.');
      return;
    }

    // Ganti dengan URL server sinyal Anda.
    const SERVER_URL = 'http://localhost:3002'; // Asumsi server sinyal berjalan di port 3002

    // Buat koneksi baru dengan menyertakan token untuk otentikasi
    this.socket = io(SERVER_URL, {
      auth: {
        token,
      },
    });

    this.socket.on('connect', () => {
      console.log('Terhubung ke server sinyal dengan ID socket:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Terputus dari server sinyal.');
    });

    this.socket.on('connect_error', (err) => {
      console.error('Koneksi socket gagal:', err.message);
    });
  },

  /**
   * Mengirimkan event ke server.
   * @param {string} eventName - Nama event yang akan dikirim.
   * @param {any} data - Data yang akan dikirim bersama event.
   */
  emit(eventName, data) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    } else {
      console.error('Socket belum diinisialisasi.');
    }
  },

  /**
   * Mendengarkan event dari server.
   * @param {string} eventName - Nama event yang akan didengarkan.
   * @param {function} callback - Fungsi yang akan dipanggil saat event diterima.
   */
  on(eventName, callback) {
    if (this.socket) {
      this.socket.on(eventName, callback);
    } else {
      console.error('Socket belum diinisialisasi.');
    }
  },

  /**
   * Mengirimkan PeerJS ID ke server untuk dibagikan ke pengguna lain.
   * @param {string} peerId - ID PeerJS yang didapat setelah inisialisasi.
   */
  sendPeerId(peerId) {
    this.emit('register-peer-id', peerId);
  },

  /**
   * Memutus koneksi WebSocket.
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  },
};

export default socketService;
