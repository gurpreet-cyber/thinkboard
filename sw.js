/* Thinkboard service worker: the whole app is cached so it runs offline.
   Bump CACHE when you change any file so installed copies pick up the update. */
const CACHE = 'thinkboard-v8';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './fonts/hanken-grotesk-latin-wght-normal.woff2',
  './icons/favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // YouTube, web previews and anything else on another site go straight to the network.
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((hit) => hit || fetch(req))
    );
    // refresh the cached page in the background for next time
    event.waitUntil(
      fetch('./index.html', { cache: 'no-cache' })
        .then((res) => res.ok ? caches.open(CACHE).then((c) => c.put('./index.html', res)) : null)
        .catch(() => null)
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((hit) => {
      const refresh = fetch(req).then((res) => {
        if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
        return res;
      });
      return hit || refresh;
    })
  );
});
