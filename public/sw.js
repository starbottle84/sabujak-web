const CACHE_NAME = 'sabujakk-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/icons/maskable-512.svg',
];

// 설치: 정적 파일 캐시
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// 활성화: 이전 캐시 삭제
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 요청 처리
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Supabase API 요청 → Network First (실시간 데이터 우선)
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
    return;
  }

  // 외부 CDN (폰트, 광고) → Network Only
  if (!url.hostname.includes(self.location.hostname) && !url.hostname.includes('localhost')) {
    event.respondWith(fetch(request).catch(() => new Response('', { status: 408 })));
    return;
  }

  // 정적 파일 → Cache First, 없으면 Network
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    }).catch(() => {
      // 오프라인이고 캐시도 없을 때 → index.html 반환 (SPA 라우팅)
      if (request.mode === 'navigate') {
        return caches.match('/index.html');
      }
      return new Response('', { status: 408 });
    })
  );
});
