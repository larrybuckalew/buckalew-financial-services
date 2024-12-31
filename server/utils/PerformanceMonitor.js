// Performance Monitoring Utility

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoad: [],
            resourceLoad: [],
            userInteractions: [],
            errors: []
        };
    }

    initializeMonitoring() {
        return `
            <script>
            // Performance Monitoring Script
            (function() {
                const performanceData = {
                    pageLoad: {},
                    resources: [],
                    interactions: [],
                    errors: []
                };

                // Monitor page load performance
                window.addEventListener('load', () => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    const paint = performance.getEntriesByType('paint');

                    performanceData.pageLoad = {
                        timestamp: new Date().toISOString(),
                        url: window.location.href,
                        domComplete: navigation.domComplete,
                        loadComplete: navigation.loadEventEnd,
                        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
                        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
                        domInteractive: navigation.domInteractive,
                        resourceCount: performance.getEntriesByType('resource').length
                    };

                    // Send page load data
                    sendMetrics('pageLoad', performanceData.pageLoad);
                });

                // Monitor resource loading
                const resourceObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (entry.initiatorType !== 'xmlhttprequest') {
                            performanceData.resources.push({
                                timestamp: new Date().toISOString(),
                                name: entry.name,
                                type: entry.initiatorType,
                                duration: entry.duration,
                                size: entry.transferSize
                            });
                        }
                    });

                    // Send resource data in batches
                    if (performanceData.resources.length >= 10) {
                        sendMetrics('resources', performanceData.resources);
                        performanceData.resources = [];
                    }
                });

                resourceObserver.observe({ entryTypes: ['resource'] });

                // Monitor Core Web Vitals
                const vitalsObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach(entry => {
                        const metric = {
                            timestamp: new Date().toISOString(),
                            name: entry.name,
                            value: entry.value,
                            rating: entry.rating
                        };

                        sendMetrics('vitals', metric);
                    });
                });

                vitalsObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

                // Monitor user interactions
                const interactionEvents = ['click', 'scroll', 'keypress'];
                interactionEvents.forEach(event => {
                    document.addEventListener(event, () => {
                        performanceData.interactions.push({
                            timestamp: new Date().toISOString(),
                            type: event,
                            path: window.location.pathname
                        });
                    }, { passive: true });
                });

                // Send interaction data periodically
                setInterval(() => {
                    if (performanceData.interactions.length > 0) {
                        sendMetrics('interactions', performanceData.interactions);
                        performanceData.interactions = [];
                    }
                }, 30000);

                // Monitor errors
                window.addEventListener('error', (event) => {
                    const errorData = {
                        timestamp: new Date().toISOString(),
                        message: event.message,
                        filename: event.filename,
                        lineNumber: event.lineno,
                        columnNumber: event.colno,
                        stack: event.error?.stack
                    };

                    performanceData.errors.push(errorData);
                    sendMetrics('errors', errorData);
                });

                // Handle unhandled promise rejections
                window.addEventListener('unhandledrejection', (event) => {
                    const errorData = {
                        timestamp: new Date().toISOString(),
                        type: 'unhandled-promise-rejection',
                        message: event.reason?.message || 'Unknown promise rejection',
                        stack: event.reason?.stack
                    };

                    performanceData.errors.push(errorData);
                    sendMetrics('errors', errorData);
                });

                // Send metrics to server
                function sendMetrics(type, data) {
                    const payload = {
                        type,
                        data,
                        url: window.location.href,
                        userAgent: navigator.userAgent
                    };

                    // Use sendBeacon for better reliability during page unload
                    if (navigator.sendBeacon) {
                        navigator.sendBeacon('/api/metrics', JSON.stringify(payload));
                    } else {
                        fetch('/api/metrics', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(payload),
                            keepalive: true
                        }).catch(console.error);
                    }
                }
            })();
            </script>
        `;
    }

    processMetrics(metricsData) {
        const { type, data } = metricsData;

        switch (type) {
            case 'pageLoad':
                this.processPageLoadMetrics(data);
                break;
            case 'resources':
                this.processResourceMetrics(data);
                break;
            case 'vitals':
                this.processWebVitalsMetrics(data);
                break;
            case 'interactions':
                this.processInteractionMetrics(data);
                break;
            case 'errors':
                this.processErrorMetrics(data);
                break;
        }
    }

    generatePerformanceReport() {
        // Generate comprehensive performance report
        return {
            timestamp: new Date().toISOString(),
            pageLoadMetrics: this.aggregatePageLoadMetrics(),
            resourceMetrics: this.aggregateResourceMetrics(),
            webVitals: this.aggregateWebVitals(),
            userInteractions: this.aggregateInteractions(),
            errorSummary: this.aggregateErrors(),
            recommendations: this.generateRecommendations()
        };
    }

    // Implementation of various processing and aggregation methods...
}

module.exports = PerformanceMonitor;
