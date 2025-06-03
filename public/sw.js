
const CACHE_NAME = 'gpo-nexus-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from GPO Nexus',
    icon: '/placeholder.svg',
    badge: '/placeholder.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: '/placeholder.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/placeholder.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('GPO Nexus', options)
  );
});
