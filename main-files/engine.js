
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                document.body.style.opacity = '0';
                setTimeout(function() {
                    window.location.href = 'rendering/render.html';
                }, 1000); // Delay of 1 second for fade out
            }, 5000); // Delay of 3 seconds for splash screen
        });
        
        
        document.addEventListener('DOMContentLoaded', () => {
            const offlinePage = '/main-files/offline.html'; // URL della pagina offline

            // Funzione per controllare la connessione
            function checkConnection() {
                if (!navigator.onLine) {
                    window.location.href = offlinePage;
                }
            }

            // Aggiungi ascoltatori di eventi per online/offline
            window.addEventListener('online', () => {
                window.location.href = 'index.html'; // URL della tua pagina principale
            });

            window.addEventListener('offline', checkConnection);

            // Controlla lo stato della connessione al caricamento
            checkConnection();
        });
        
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('ServiceWorker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.log('ServiceWorker registration failed:', error);
                });
            });
        }
  
    
function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}


function preloadScripts(urls) {
    urls.forEach(url => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        document.head.appendChild(script);
    });
}


function preloadStyles(urls) {
    urls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    });
}


function preloadPageResources(pageUrl) {
    fetch(pageUrl)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

         
            const imageUrls = Array.from(doc.images).map(img => img.src);
            preloadImages(imageUrls);

            
            const styleUrls = Array.from(doc.querySelectorAll('link[rel="stylesheet"]')).map(link => link.href);
            preloadStyles(styleUrls);

            
            const scriptUrls = Array.from(doc.querySelectorAll('script[src]')).map(script => script.src);
            preloadScripts(scriptUrls);
        })
        .catch(error => console.error('Errore nel precaricamento delle risorse della pagina:', error));
}


function preloadAllNextPages() {
    const pageUrls = Array.from(document.querySelectorAll('a[href]'))
        .map(a => a.href)
        .filter(href => href.startsWith(window.location.origin));


    const uniquePageUrls = [...new Set(pageUrls)];

     uniquePageUrls.forEach(pageUrl => {
        preloadPageResources(pageUrl);
    });
}


preloadAllNextPages();