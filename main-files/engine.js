
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
  
    
