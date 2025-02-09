//if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),d={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-C9rwmKi1.css",revision:null},{url:"assets/index-DePo3SB0.js",revision:null},{url:"index.html",revision:"f04cd9d117c689fded326e92359fad3f"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"logo_preto.png",revision:"24f3a6d672886b5c0676e777b064c934"},{url:"manifest.webmanifest",revision:"53ac56a4759d1d728f889c5472e01bb4"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map


//código substituto do gpt

self.addEventListener("install", (event) => {
  self.skipWaiting(); // Força a ativação imediata
});

self.addEventListener("activate", (event) => {
  clients.claim(); // Garante que o SW tome controle imediato
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request)); // Sempre busca do servidor
});
