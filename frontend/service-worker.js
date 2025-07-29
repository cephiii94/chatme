self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  clients.claim();
});

self.addEventListener('fetch', event => {
  // Hanya cache request dari http(s), abaikan chrome-extension dan lainnya
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.open('chatsyok-v1').then(cache => 
      cache.match(event.request).then(response => 
        response || fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
      )
    )
  );
});