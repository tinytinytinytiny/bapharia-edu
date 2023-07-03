const cacheName = 'my-cache';

const filesToCache = [
	'/fonts/PublicSans[wght].woff2',
	'/fonts/PublicSans-Italic[wght].woff2',
	'/fonts/NotoSansJP-VariableFont_wght.woff2'
];

self.addEventListener('activate', e => {
	e.waitUntil(async function () {
		if (self.registration.navigationPreload) {
			await self.registration.navigationPreload.enable();
		}
	})
});

self.addEventListener('install', (e) => {
	self.skipWaiting();
	e.waitUntil(
		caches.open(cacheName)
			.then(cache => cache.addAll(filesToCache))
	);
});

self.addEventListener('fetch', (e) => {
	e.respondWith(async function () {
		const cachedResponse = await caches.match(e.request);
		if (cachedResponse) return cachedResponse;

		const response = await e.preloadResponse;
		if (response) return response;

		return fetch(e.request);
	}());
});