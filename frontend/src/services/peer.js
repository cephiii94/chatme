// Pastikan Anda telah menambahkan PeerJS ke proyek Anda, misalnya melalui tag <script> di HTML.
// <script src="https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js"></script>

const peerService = {
  peer: null,
  conn: null,
  myPeerId: null,

  // --- Callback Functions ---
  // Fungsi-fungsi ini akan dipanggil dari luar modul untuk menangani event.
  onPeerInitialized: (id) => console.log('PeerJS diinisialisasi dengan ID:', id),
  onConnectionOpen: (conn) => console.log('Koneksi P2P terbuka dengan:', conn.peer),
  onDataReceived: (data) => console.log('Menerima data:', data),
  onConnectionClosed: () => console.log('Koneksi P2P ditutup.'),
  onError: (err) => console.error('PeerJS Error:', err),

  /**
   * Menginisialisasi instance PeerJS.
   * @param {function} onInit - Callback yang dipanggil dengan ID peer setelah berhasil.
   */
  initialize(onInit) {
    // Hindari inisialisasi ganda
    if (this.peer) {
      console.warn('PeerJS sudah diinisialisasi.');
      return;
    }
    
    // Buat instance Peer baru. ID akan dibuat secara otomatis oleh server PeerJS.
    this.peer = new Peer();

    // Event listener saat instance Peer berhasil terhubung ke server PeerJS
    this.peer.on('open', (id) => {
      this.myPeerId = id;
      this.onPeerInitialized(id); // Panggil callback eksternal
      if (onInit) onInit(id);
    });

    // Event listener untuk koneksi yang masuk dari peer lain
    this.peer.on('connection', (newConn) => {
      console.log('Koneksi masuk dari:', newConn.peer);
      this.conn = newConn;
      this.setupConnectionEventListeners(newConn);
    });

    // Event listener untuk error
    this.peer.on('error', (err) => {
      this.onError(err);
    });
  },

  /**
   * Menghubungkan ke peer lain menggunakan ID mereka.
   * @param {string} targetPeerId - ID dari peer yang ingin dihubungi.
   */
  connect(targetPeerId) {
    if (!this.peer) {
      this.onError({ type: 'not-initialized', message: 'PeerJS belum diinisialisasi.' });
      return;
    }
    if (this.conn) {
        console.warn(`Sudah terhubung dengan ${this.conn.peer}. Menutup koneksi lama.`);
        this.conn.close();
    }

    console.log(`Mencoba terhubung ke peer: ${targetPeerId}`);
    const newConn = this.peer.connect(targetPeerId);
    this.conn = newConn;
    this.setupConnectionEventListeners(newConn);
  },
  
  /**
   * Mengatur semua event listener untuk sebuah koneksi.
   * @param {DataConnection} connectionObject - Objek koneksi dari PeerJS.
   */
  setupConnectionEventListeners(connectionObject) {
    connectionObject.on('open', () => {
      this.onConnectionOpen(connectionObject);
    });

    connectionObject.on('data', (data) => {
      this.onDataReceived(data);
    });

    connectionObject.on('close', () => {
      this.onConnectionClosed();
      this.conn = null;
    });
    
    connectionObject.on('error', (err) => {
        this.onError(err);
    });
  },

  /**
   * Mengirim pesan ke peer yang terhubung.
   * @param {any} data - Data yang ingin dikirim (bisa berupa string, objek, dll).
   */
  sendMessage(data) {
    if (this.conn && this.conn.open) {
      this.conn.send(data);
    } else {
      this.onError({ type: 'not-connected', message: 'Tidak ada koneksi P2P yang aktif.' });
    }
  },

  /**
   * Menutup koneksi yang sedang aktif.
   */
  disconnect() {
    if (this.conn) {
      this.conn.close();
    }
  },
  
  /**
   * Menghancurkan instance PeerJS.
   */
  destroy() {
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
      this.conn = null;
      this.myPeerId = null;
    }
  }
};

export default peerService;
