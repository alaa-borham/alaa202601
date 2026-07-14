// عامل الخدمة LEVEL7 — استراتيجية «الشبكة أولاً»:
// عند توفر الموقع يُحمَّل دائماً أحدث إصدار (مثل اللايف)،
// وإن تعطل الموقع يعمل التطبيق من آخر نسخة محفوظة على الجهاز.
const CACHE = 'alaa2026-v3';
const LEGACY = ['level7-v1','level7-v2','level7-v3']; // أسماء قديمة مشتركة تُنظّف مرة واحدة

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => (k.startsWith('alaa2026-') && k !== CACHE) || LEGACY.includes(k)).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  // نخزن ملفات موقعنا فقط — طلبات Firebase تمر مباشرة دون تدخل
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
