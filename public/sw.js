// Minimal service worker to prevent 404 errors
// This is a placeholder service worker that doesn't do anything

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Optional: Add basic fetch handler that just passes through requests
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});

