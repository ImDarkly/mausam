if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/mausam/sw.js', { scope: '/mausam/' })})}