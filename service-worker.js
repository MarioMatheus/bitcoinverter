var cacheName = 'bitcoinverter-v1-c1';
var filesToCache = [
  '/',
  '/pages/home.js',
  '/pages/list.js',
  '/main.js',
  '/index.html'
];

// On service worker install, cache the app shell
self.addEventListener('install', e => {
  console.log('ServiceWorker Install');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});


// On service worker activate, remove old cache if exists
self.addEventListener('activate', e => {
  console.log('ServiceWorker Activate');
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if(key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );

  // Make the service worker control immediately the pages
  return self.clients.claim();
});


// If the resources isn't in the cache, it is requested from the network.
self.addEventListener('fetch', e => {
  console.log('ServiceWorker fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
