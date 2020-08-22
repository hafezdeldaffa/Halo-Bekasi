const CACHE_NAME = "halobekasi-v1.03";
let urlsToCache = [
    '/',
    '/nav.html',
    '/index.html',
    '/pages/geografis.html',
    '/pages/home.html',
    '/pages/sejarah.html',
    '/pages/wisata.html',
    '/css/materialize.min.css',
    '/js/materialize.min.js',
    '/js/nav.js',
    '/manifest.json',
    '/assets/image/icon-512x512.png',
    '/assets/image/icon-bekasi.png',
    '/assets/image/curug-parigi.png',
    '/assets/image/geografis-bks.jpg',
    '/assets/image/geografis.png',
    '/assets/image/pantai-mekar.jpg',
    '/assets/image/sejarah.jpg',
    '/assets/image/taman-buaya.jpg',
    '/assets/image/icon-192x192.png'
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request, {
            chacheName: CACHE_NAME
        })
        .then((response) => {
            if (response) {
                console.log('Service Worker gunakan aset dari chache: ', response.url)
                return response
            }

            console.log(
                'Service Worker: Memuat aset dari server', event.request.url
            )
            return fetch(event.request)
        })
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName != CACHE_NAME) {
                        console.log(`Service Worker: cache ${cacheName} dihapus`)
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})