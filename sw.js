if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),c={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-f3e6b16a"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-6Ks6kMgb.js",revision:null},{url:"assets/index-ooluPpd8.js",revision:null},{url:"assets/index-RmqOwegm.css",revision:null},{url:"index.html",revision:"e8c8ef27c58851aa5438be043efdbc2e"},{url:"registerSW.js",revision:"301207d9c375c49dabe10632443ee8e7"},{url:"assets/favicon.svg",revision:"1821c958bbe5e0a6a4563025af907760"},{url:"manifest.webmanifest",revision:"894522d1214092e65ac88cc3b9d4720a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
