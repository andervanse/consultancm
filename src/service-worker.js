var CACHE_NAME = 'consultancm-cache-v1.0.0';
var urlsToCache = [
  'index.html',
  'favicon.ico',
  '/vendors/mdl/dialog-polyfill.min.js',
  '/vendors/mdl/material.min.js',
  '/vendors/mdl/material.min.css',
  '/css/app.css',
  '/scripts/app.bundle.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache.map(function(urlToPrefetch) {
                  return new Request(urlToPrefetch, { mode: 'no-cors' });
                  })).then(function() {
                     console.log('All resources have been fetched and cached.')
                  })  
      })
  );
});

self.addEventListener('fetch', function(event) {

    if ( event.request.url.match( '^.*(\/blog\/).*$' ) ) {
        return false;
    }
    
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          return fetch(event.request).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });

  self.addEventListener('activate', function(event) {

    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
              return caches.delete(cacheName);
          })
        );
      })
    );
  });
