const CACHE="chaozhou-pocket-v05-20261002-r5",SHELL=["./", "index.html", "style.css?v=20261002-r5", "app.js?v=20261002-r5", "data.js?v=20261002-r5", "full-text.html", "itinerary.md", "icon.svg?v=20261002-r5", "manifest.webmanifest?v=20261002-r5"];
    self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
    self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('chaozhou-pocket-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
    self.addEventListener('fetch',e=>{
      const u=new URL(e.request.url);
      if(e.request.method!=='GET'||u.origin!==location.origin||!u.href.startsWith(self.registration.scope))return;
      if(e.request.mode==='navigate'){
        e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(async()=>await caches.match(e.request,{ignoreSearch:true})||await caches.match(new URL('index.html',self.registration.scope).href)));return;
      }
      if(u.pathname.endsWith('offline-manifest.json'))return;
      // Large original PNGs are an explicit online option, outside the offline pack.
      if(u.pathname.endsWith('-original.png'))return;
      e.respondWith(caches.open(CACHE).then(c=>c.match(e.request)).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r})));
    });