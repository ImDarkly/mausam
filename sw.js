if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const o=e=>i(e,t),d={module:{uri:t},exports:l,require:o};s[t]=Promise.all(n.map((e=>d[e]||o(e)))).then((e=>(r(...e),l)))}}define(["./workbox-e1498109"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BcpFq5ZI.js",revision:null},{url:"assets/index-BrX77JZZ.css",revision:null},{url:"assets/index-Cf8HWhYg.js",revision:null},{url:"assets/index-D5lDAjMM.js",revision:null},{url:"index.html",revision:"9aedf71f87474d3d2915775aa9b4edbb"},{url:"registerSW.js",revision:"301207d9c375c49dabe10632443ee8e7"},{url:"assets/favicon.svg",revision:"fb47803a4247dabbc6c072ba20b53850"},{url:"manifest.webmanifest",revision:"894522d1214092e65ac88cc3b9d4720a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
