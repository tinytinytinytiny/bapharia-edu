const cacheName = 'my-cache';

const filesToCache = [
	'/fonts/PublicSans[wght].woff2',
	'/fonts/PublicSans-Italic[wght].woff2',
	'/fonts/NotoSansJP-VariableFont_wght.woff2'
];

self.addEventListener('activate', e => self.clients.claim());

self.addEventListener('install', (e) => {
	self.skipWaiting();
	e.waitUntil(
		caches.open(cacheName)
			.then(cache => cache.addAll(filesToCache))
	);
});

self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request).then(response => (response) ? response : fetch(e.request))
	);
});