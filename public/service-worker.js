const VERSION = '0.0.15';
const coreCacheName = VERSION + '_core';
const imagesCacheName = VERSION + '_images';
const pagesCacheName = VERSION + '_pages';
const definedCacheNames = [coreCacheName, imagesCacheName, pagesCacheName];

const limits = {
	pages: 20,
	images: 60
};

const filesToCache = [
	'/favicon.svg',
	'/fonts.css',
	'/fonts/WorkSans-VariableFont_wght.woff2',
	'/fonts/WorkSans-Italic-VariableFont_wght.woff2',
	'/fonts/NotoSansJP-VariableFont_wght.woff2',
	'/offline'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(coreCacheName).then((cache) => {
			cache.addAll(filesToCache)
				.then(() => self.skipWaiting())
		})
	);
});

/**
 * Deletes caches that don't match the current version.
 * 
 * @async
 * @function deleteOldCaches
 * @return {Promise<Array>} An array of caches.delete() Promises for each old cache
 */
async function deleteOldCaches() {
	/** @type {string[]} */
	const cacheNames = await caches.keys();
	return cacheNames.map((cacheName) => {
		if (!definedCacheNames.includes(cacheName)) {
			return caches.delete(cacheName);
		}
	});
}

// delete old caches upon activation
self.addEventListener('activate', (event) => {
	event.waitUntil(async function () {
		if (self.registration.navigationPreload) {
			await self.registration.navigationPreload.enable();
		}
		Promise.all(await deleteOldCaches()).then(() => clients.claim());
	}());
});

self.addEventListener('fetch', (event) => {
	const { preloadResponse, request } = event;

	// Ignore non-GET requests
	if (request.method !== 'GET') return;

	// IMAGES: network first, cache fallback
	if (
		!request.url.match(/(favicon\.svg)$/)
		&& request.url.match(/\.(jpe?g|png|gif|svg|webp|avif)$/)
		|| request.url.match(/\.(jpe?g|png|gif|svg|webp|avif)\/m\//)
	) {
		event.respondWith(async function() {
			const responsePreloaded = await preloadResponse;
			if (responsePreloaded) return responsePreloaded;

			return fetch(request).then((responseFromFetch) => {
				const copy = responseFromFetch.clone();
				trimCache(imagesCacheName, limits.images);
				caches.open(imagesCacheName)
					.then((imagesCache) => imagesCache.put(request, copy));
				return responseFromFetch;
			}).catch(async () => {
				const responseFromCache = await caches.match(request);
				if (responseFromCache) return responseFromCache;
			})
		}()); // end respondWith
		return;
	}

	// PAGES: network first, cache fallback
	if (
		request.headers.get('Accept').includes('text/html')
		&& !request.url.match(/\/(offline)$/)
	) {
		event.respondWith(async function() {
			return fetch(request).then((responseFromFetch) => {
				const copy = responseFromFetch.clone();
				trimCache(pagesCacheName, limits.pages);
				caches.open(pagesCacheName)
					.then((pagesCache) => pagesCache.put(request, copy));
				return responseFromFetch;
			}).catch(async () => {
				const responseFromCache = await caches.match(request);
				if (responseFromCache) return responseFromCache;

				const responsePreloaded = await preloadResponse;
				if (responsePreloaded) return responsePreloaded;

				return caches.match('offline.html');
			})
		}()); // end respondWith
		return;
	}

	// CSS/JS: cache first, network fallback
	if (
		request.headers.get('Accept').includes('text/css')
		|| request.headers.get('Accept').includes('application/javascript')
		|| request.url.match(/\.js$/)
	) {
		event.respondWith(async function() {
			const responseFromCache = await caches.match(request);
			if (responseFromCache) return responseFromCache;

			const responsePreloaded = await preloadResponse;
			if (responsePreloaded) return responsePreloaded;

			return fetch(request).then((responseFromFetch) => {
				const copy = responseFromFetch.clone();
				caches.open(coreCacheName)
					.then((coreCache) => coreCache.put(request, copy));
				return responseFromFetch;
			});
		}()); // end respondWith
		return;
	}

	// EVERYTHING ELSE: look for cached copy, else fetch from network
	event.respondWith(async function () {
		/* look for a matching file that has been cached.
		match() searches all caches when used on the caches
		object, so no need to specify cache name */
		const responseFromCache = await caches.match(event.request);

		/* match() does not reject if a match is not found.
		it always resolves and returns null if there is no match */
		if (responseFromCache) return responseFromCache;

		// use preloaded response if it's there
		const responsePreloaded = await preloadResponse;
		if (responsePreloaded) return responsePreloaded;

		return fetch(request);
	}());
});

self.addEventListener('message', (event) => {
	if (event.data !== 'cleanup') return;
	trimCache(pagesCacheName, limits.pages);
	trimCache(imagesCacheName, limits.images);
});

function trimCache(cacheName, max) {
	caches.open(cacheName).then((cache) => {
		cache.keys().then((items) => {
			if (items.length > max) {
				cache.delete(items[0]).then(() => trimCache(cacheName, max));
			}
		});
	});
}