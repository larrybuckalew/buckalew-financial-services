// Advanced Security Measures
(function() {
    // Browser Security Checks
    function performSecurityChecks() {
        // Check for HTTPS
        if (location.protocol !== 'https:') {
            console.warn('Secure connection required. Redirecting to HTTPS.');
            location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }

        // Check for modern browser support
        const unsupportedBrowsers = {
            IE: 11,
            Safari: 12,
            Edge: 18,
            Firefox: 60,
            Chrome: 70
        };

        function checkBrowserSupport() {
            const userAgent = window.navigator.userAgent;
            const browserName = getBrowserName(userAgent);
            const browserVersion = getBrowserVersion(userAgent);

            if (browserName && unsupportedBrowsers[browserName] && browserVersion < unsupportedBrowsers[browserName]) {
                displayBrowserWarning(browserName);
            }
        }

        function getBrowserName(userAgent) {
            if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) return 'IE';
            if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
            if (userAgent.includes('Edge')) return 'Edge';
            if (userAgent.includes('Firefox')) return 'Firefox';
            if (userAgent.includes('Chrome')) return 'Chrome';
            return null;
        }

        function getBrowserVersion(userAgent) {
            const browserName = getBrowserName(userAgent);
            const versionMatch = {
                'IE': /MSIE ([0-9.]+)/.exec(userAgent),
                'Safari': /Version\/([0-9.]+)/.exec(userAgent),
                'Edge': /Edge\/([0-9.]+)/.exec(userAgent),
                'Firefox': /Firefox\/([0-9.]+)/.exec(userAgent),
                'Chrome': /Chrome\/([0-9.]+)/.exec(userAgent)
            };

            return versionMatch[browserName] ? parseFloat(versionMatch[browserName][1]) : 0;
        }

        function displayBrowserWarning(browserName) {
            const warningBanner = document.createElement('div');
            warningBanner.className = 'browser-warning';
            warningBanner.innerHTML = `
                <p>⚠️ Your ${browserName} browser may not support all features. Please upgrade for optimal security and performance.</p>
                <button onclick="this.parentElement.remove()">Dismiss</button>
            `;
            document.body.insertBefore(warningBanner, document.body.firstChild);
        }

        checkBrowserSupport();
    }

    // Session Management and Security
    function initSessionSecurity() {
        // Implement session timeout
        const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
        let sessionStart = Date.now();

        function checkSessionTimeout() {
            const currentTime = Date.now();
            if (currentTime - sessionStart > SESSION_TIMEOUT) {
                logout();
            }
        }

        function resetSessionTimer() {
            sessionStart = Date.now();
        }

        function logout() {
            // Implement logout logic
            alert('Session expired. Please log in again.');
            window.location.href = '/logout';
        }

        // Reset timer on user activity
        ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
            window.addEventListener(event, resetSessionTimer);
        });

        // Check session periodically
        setInterval(checkSessionTimeout, 60000);
    }

    // Data Protection Tracking
    function initDataProtectionTracking() {
        // Track and log potential data access attempts
        function logDataAccess(eventType) {
            const accessLog = {
                timestamp: new Date().toISOString(),
                eventType: eventType,
                userAgent: navigator.userAgent,
                pageUrl: window.location.href
            };

            // Send log to backend (mock implementation)
            try {
                fetch('/api/security-log', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(accessLog)
                });
            } catch (error) {
                console.error('Security logging failed', error);
            }
        }

        // Log copy/paste events
        document.addEventListener('copy', () => logDataAccess('data_copy'));
        document.addEventListener('cut', () => logDataAccess('data_cut'));
    }

    // Initialize Security Modules
    function initSecurityModules() {
        performSecurityChecks();
        initSessionSecurity();
        initDataProtectionTracking();
    }

    // Run security modules when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSecurityModules);
    } else {
        initSecurityModules();
    }
})();