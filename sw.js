/* Shell only. No API response, form payload or financial mutation is cached. */
importScripts('/assets/pwa/shell.js');
const PREFIX = 'gissino-shell-';
const CACHE = PREFIX + self.GISSINO_SHELL.version;
const PATHS = new Set(self.GISSINO_SHELL.paths);
const STAMP = '/__gissino-shell-stamp__';
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll([...PATHS]);
    await cache.put(STAMP, new Response(new Date().toISOString()));
    // Waiting is intentional. A tab must explicitly ask to activate the update.
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type === 'ACTIVATE_UPDATE') event.waitUntil(self.skipWaiting());
  if (event.data?.type === 'GET_SHELL_STATUS') event.waitUntil((async () => {
    const stamp = await (await caches.open(CACHE)).match(STAMP);
    event.source?.postMessage({ type: 'SHELL_STATUS', cachedAt: stamp ? await stamp.text() : null });
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate' && (url.pathname === '/' || url.pathname === '/index.html')) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      try {
        const response = await fetch(request, { signal: controller.signal });
        if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) throw new Error('Shell unavailable');
        await cache.put('/index.html', response.clone());
        await cache.put(STAMP, new Response(new Date().toISOString()));
        return response;
      } catch { return await cache.match('/index.html') || Response.error(); }
      finally { clearTimeout(timeout); }
    })());
  } else if (PATHS.has(url.pathname) && !url.search) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(url.pathname);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') await cache.put(url.pathname, response.clone());
      return response;
    })());
  }
});
