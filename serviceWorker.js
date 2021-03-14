const CACHE_NAME = "v1_cache_contador_app_vue"
const urlsToCache = [
    "./", //Cachea todo lo que encuentre de la app
    "./img/iconBalls16.png",
    "./img/iconBalls32.png",
    "./img/iconBalls64.png",
    "./img/iconBalls128.png",
    "./img/iconBalls256.png",
    "./img/iconBalls512.png",
    "./img/iconBalls1024.png",
    "https://unpkg.com/vue@next",
    "./js/main.js",
    "./js/mountApp.js",
    "./css/style.css",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
];

self.addEventListener("install", e => {
    e.waitUntil( //Escucha y ejecuta lo que se cachea
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache)
            .then(() => self.skipWaiting()) 
            .catch( err => console.log(err))
        )
    )
})

self.addEventListener("activate", e => {
    const cacheWhitelist = [CACHE_NAME]
    
    e.waitUntil(
        caches.keys()
        .then(
            cachesNames => {
                return Promise.all(
                    cachesNames.map(
                        cacheName => {
                            if(cacheWhitelist.indexOf(cacheName) === -1){
                                return caches.delete(cacheName)
                            }
                        }
                    )
                )
            }
        )
        .then(() => self.ClientRectList.claim())
    )
})

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res){
                return res
            }
            
            return fetch(e.request);
        })
    )
})