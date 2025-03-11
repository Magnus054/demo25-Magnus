const cacheID = "sienceV2";
const contentToCache = [
    "/index.html",
    "/app.mjs",
    "/icons/dragon.png",
    "/icons/dragonLarge.png",
    "/css/style.css"
];

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheID);
            console.log("[Service Worker] Caching app shell and content");
            await cache.addAll(contentToCache);
        })()
    );
});

self.addEventListener("fetch", (e) => {
    if (!(e.request.url.startsWith("http:") || e.request.url.startsWith("https:"))) {
        return;
    }

    e.respondWith(
        (async () => {
            const cache = await caches.open(cacheID);
            const cachedResponse = await cache.match(e.request);
            console.log(`[Service Worker] Fetching: ${e.request.url}`);

            if (cachedResponse) {
                return cachedResponse;
            }

            try {
                const networkResponse = await fetch(e.request);
                cache.put(e.request, networkResponse.clone());
                return networkResponse;
            } catch (error) {
                console.error(`[Service Worker] Fetch failed for: ${e.request.url}`, error);
            }
        })()
    );
});
