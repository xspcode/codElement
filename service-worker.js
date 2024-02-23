const CACHE_NAME = 'v1';
const URLS_TO_CACHE = [
    '/',
    'index.html',
    'main.js',
    'icon/path.png',
    // Ajoutez d'autres chemins de fichiers que vous voulez mettre en cache
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Your files were cached');
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});