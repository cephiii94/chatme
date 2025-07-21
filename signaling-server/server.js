// Mengimpor PeerServer dari pustaka 'peer'
const { PeerServer } = require('peer');

// Menentukan port untuk server pensinyalan
const PORT = 9000;

// Membuat instance PeerServer
const peerServer = PeerServer({
  port: PORT,
  path: '/chatsyok', // Path kustom untuk server PeerJS Anda
  allow_discovery: true, // Memungkinkan klien untuk mendapatkan daftar ID peer yang terhubung
});

// Event listener saat server berhasil berjalan
peerServer.on('listening', (server) => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(
    `Server pensinyalan PeerJS berjalan di http://${host}:${port}`
  );
});

// Event listener untuk koneksi baru dari klien
peerServer.on('connection', (client) => {
  console.log(`Klien terhubung: ${client.getId()}`);
});

// Event listener saat koneksi klien terputus
peerServer.on('disconnect', (client) => {
  console.log(`Klien terputus: ${client.getId()}`);
});
