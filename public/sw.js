// Service Worker для PWA - Reflection Journal
const CACHE_NAME = 'reflection-journal-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png',
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  // Принудительно активируем новый Service Worker сразу
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Кешируем ресурсы по одному, чтобы не падать при ошибке одного из них
      return Promise.allSettled(
        urlsToCache.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn(`Failed to cache ${url}:`, err);
            // Продолжаем работу даже если один ресурс не закешировался
            return null;
          });
        })
      );
    })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  // Берем контроль над всеми страницами сразу
  event.waitUntil(
    Promise.all([
      // Очищаем старые кеши
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Берем контроль над всеми клиентами
      self.clients.claim()
    ])
  );
});

// Обработка сообщения для принудительной активации
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Перехват запросов (стратегия Network First)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Клонируем ответ для кеша
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      })
      .catch(() => {
        // Если сеть недоступна, используем кеш
        return caches.match(event.request);
      })
  );
});
