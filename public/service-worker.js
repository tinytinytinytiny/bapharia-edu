const VERSION = '1.0.0';
const coreID = VERSION + '_core';
const pageID = VERSION + '_pages';
const cacheIDs = [coreID, pageID];

const filesToCache = [
	'/fonts.css',
	'/fonts/PublicSans[wght].woff2',
	'/fonts/PublicSans-Italic[wght].woff2',
	'/fonts/NotoSansJP-VariableFont_wght.woff2'
];

const trimCache = (key, max) => {
	caches.open(key).then((cache) => {
		cache.keys().then((keys) => {
			if (keys.length <= max) return;
			cache.delete(keys[0]).then(() => trimCache(key, max));
		});
	});
};

self.addEventListener('install', (e) => {
	self.skipWaiting();
	e.waitUntil(
		caches.open(coreID)
			.then(cache =>
				cache
					.addAll(filesToCache)
					.catch((error) => {
						if (error.name === 'QuotaExceededError') {
							trimCache(pageID, 0);
						} else {
							console.error('Error caching all: ' + error.name + ': ' + error.message);
						}
					})
			)
	);
});

self.addEventListener('activate', (e) => {
	e.waitUntil(async function () {
		if (self.registration.navigationPreload) {
			await self.registration.navigationPreload.enable();
		}

		caches.keys().then((keys) =>
			Promise.all(
				keys
					.filter((key) => !cacheIDs.includes(key))
					.map((key) => caches.delete(key))
			)
		).then(() => self.clients.claim());
	});
});

self.addEventListener('fetch', (e) => {
	if (e.request.method !== 'GET') return;

	if (
		e.request.destination === 'document'
		|| e.request.destination === 'style'
		&& !e.request.url.includes('fonts.css')
	) {
		e.respondWith(caches.open(pageID).then((cache) => {
			return fetch(e.request.url).then((response) => {
				cache
					.put(e.request, response.clone())
					.catch((error) => {
						if (error.name === 'QuotaExceededError') {
							trimCache(pageID, 0);
						} else {
							console.error('Error caching: ' + error.name + ': ' + error.message);
						}
					});
				return response;
			}).catch(async function () {
				const cachedResponse = await cache.match(e.request.url);
				if (cachedResponse) return cachedResponse;

				const response = await e.preloadResponse;
				if (response) return response;
			});
		}));
	} else {
		e.respondWith(async function () {
			const cachedResponse = await caches.match(e.request);
			if (cachedResponse) return cachedResponse;

			const response = await e.preloadResponse;
			if (response) return response;

			return fetch(e.request).catch(() => { });
		}());
	}
});