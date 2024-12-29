// Performance Optimization Techniques
(function() {
    // Lazy Loading for Images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(image => imageObserver.observe(image));
    }

    // Preload Critical Resources
    function preloadCriticalResources() {
        const criticalResources = [
            { rel: 'preload', href: 'style.css', as: 'style' },
            { rel: 'preload', href: 'script.js', as: 'script' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            Object.keys(resource).forEach(attr => {
                link.setAttribute(attr, resource[attr]);
            });
            document.head.appendChild(link);
        });
    }

    // Debounce Function for Performance
    function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Optimize Scroll and Resize Events
    function optimizeEvents() {
        const scrollHandler = debounce(() => {
            // Scroll optimization logic
            const scrollProgress = document.querySelector('.scroll-progress');
            if (scrollProgress) {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                scrollProgress.style.width = `${scrolled}%`;
            }
        });

        const resizeHandler = debounce(() => {
            // Responsive design adjustments
            const navbar = document.querySelector('.navbar');
            if (window.innerWidth < 768) {
                navbar.classList.add('mobile-view');
            } else {
                navbar.classList.remove('mobile-view');
            }
        });

        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('resize', resizeHandler);
    }

    // Performance Monitoring
    function initPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                
                // Log performance metrics
                console.log({
                    loadTime: loadTime,
                    timeToInteractive: timing.domInteractive - timing.navigationStart,
                    domComplete: timing.domComplete - timing.navigationStart
                });

                // Send performance data to analytics (placeholder)
                if (window.analytics) {
                    window.analytics.track('Page Load Performance', {
                        loadTime: loadTime
                    });
                }
            });
        }
    }

    // Service Worker Registration (if supported)
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        }
    }

    // Initialize All Performance Optimizations
    function init() {
        lazyLoadImages();
        preloadCriticalResources();
        optimizeEvents();
        initPerformanceMonitoring();
        registerServiceWorker();

        // Add a performance mark
        if (window.performance && window.performance.mark) {
            window.performance.mark('performance-init-complete');
        }
    }

    // Run optimizations when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
