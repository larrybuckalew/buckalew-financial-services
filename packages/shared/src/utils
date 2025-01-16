class PerformanceMonitoring {
  constructor() {
    this.metrics = {};
  }

  measurePageLoad(pageName) {
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    const paintEntries = performance.getEntriesByType('paint');

    this.metrics[pageName] = {
      loadTime: navigationEntry.loadEventEnd - navigationEntry.startTime,
      firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime,
      firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime,
      domInteractive: navigationEntry.domInteractive - navigationEntry.startTime,
      timestamp: new Date().toISOString()
    };

    // Report metrics
    analytics.trackEvent('Page Performance', {
      pageName,
      ...this.metrics[pageName]
    });
  }

  measureApiCall(endpoint, startTime) {
    const duration = Date.now() - startTime;
    
    analytics.trackEvent('API Performance', {
      endpoint,
      duration,
      timestamp: new Date().toISOString()
    });
  }

  monitorResourceLoading() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
          analytics.trackEvent('Resource Performance', {
            name: entry.name,
            duration: entry.duration,
            type: entry.initiatorType,
            timestamp: new Date().toISOString()
          });
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  getLargestContentfulPaint() {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      analytics.trackEvent('LCP Performance', {
        value: lastEntry.startTime,
        element: lastEntry.element?.tagName,
        timestamp: new Date().toISOString()
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }
}

export const performanceMonitoring = new PerformanceMonitoring();