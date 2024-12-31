// Continuing the SEO Auditor class

async checkImages() {
    const imageIssues = [];

    for (const page of this.pages) {
        try {
            const response = await axios.get(page.url);
            const $ = cheerio.load(response.data);

            $('img').each((_, element) => {
                const img = $(element);
                const src = img.attr('src');
                const alt = img.attr('alt');
                const srcset = img.attr('srcset');
                const loading = img.attr('loading');

                // Check for essential attributes
                if (!alt) {
                    imageIssues.push({
                        url: page.url,
                        issue: 'Missing alt text',
                        severity: 'high',
                        details: `Image: ${src}`
                    });
                }

                // Check for responsive images
                if (!srcset && !img.parent('picture').length) {
                    imageIssues.push({
                        url: page.url,
                        issue: 'Not using responsive images',
                        severity: 'medium',
                        details: `Image: ${src}`
                    });
                }

                // Check for lazy loading
                if (!loading) {
                    imageIssues.push({
                        url: page.url,
                        issue: 'Missing lazy loading',
                        severity: 'medium',
                        details: `Image: ${src}`
                    });
                }

                // Check image format
                if (src.match(/\.jpg$|\.png$/i) && !img.parent('picture').find('source[type="image/webp"]').length) {
                    imageIssues.push({
                        url: page.url,
                        issue: 'No WebP alternative',
                        severity: 'low',
                        details: `Image: ${src}`
                    });
                }
            });
        } catch (error) {
            console.error(`Error checking images for ${page.url}:`, error.message);
        }
    }

    return {
        category: 'Images',
        issues: imageIssues
    };
}

async checkPerformance() {
    const performanceIssues = [];

    for (const page of this.pages) {
        try {
            // Check page size
            const response = await axios.get(page.url);
            const pageSize = response.headers['content-length'];
            if (pageSize > 5000000) { // 5MB
                performanceIssues.push({
                    url: page.url,
                    issue: 'Page size too large',
                    severity: 'high',
                    details: `Size: ${Math.round(pageSize / 1024 / 1024)}MB`
                });
            }

            const $ = cheerio.load(response.data);

            // Check for render-blocking resources
            $('link[rel="stylesheet"]').each((_, element) => {
                const media = $(element).attr('media');
                if (!media || media === 'all') {
                    performanceIssues.push({
                        url: page.url,
                        issue: 'Render-blocking CSS',
                        severity: 'medium',
                        details: `Resource: ${$(element).attr('href')}`
                    });
                }
            });

            // Check for unoptimized scripts
            $('script').each((_, element) => {
                const async = $(element).attr('async');
                const defer = $(element).attr('defer');
                const src = $(element).attr('src');

                if (src && !async && !defer) {
                    performanceIssues.push({
                        url: page.url,
                        issue: 'Blocking script',
                        severity: 'medium',
                        details: `Script: ${src}`
                    });
                }
            });

            // Check for browser caching headers
            const cacheControl = response.headers['cache-control'];
            if (!cacheControl || cacheControl.includes('no-cache') || cacheControl.includes('no-store')) {
                performanceIssues.push({
                    url: page.url,
                    issue: 'No browser caching',
                    severity: 'medium'
                });
            }

        } catch (error) {
            console.error(`Error checking performance for ${page.url}:`, error.message);
        }
    }

    return {
        category: 'Performance',
        issues: performanceIssues
    };
}

async checkMobileResponsiveness() {
    const mobileIssues = [];

    for (const page of this.pages) {
        try {
            const response = await axios.get(page.url);
            const $ = cheerio.load(response.data);

            // Check viewport meta tag
            const viewport = $('meta[name="viewport"]').attr('content');
            if (!viewport) {
                mobileIssues.push({
                    url: page.url,
                    issue: 'Missing viewport meta tag',
                    severity: 'high'
                });
            }

            // Check for fixed-width elements
            $('*').each((_, element) => {
                const style = $(element).attr('style');
                if (style && style.includes('width:') && style.includes('px')) {
                    mobileIssues.push({
                        url: page.url,
                        issue: 'Fixed-width element',
                        severity: 'medium',
                        details: `Element: ${element.tagName}`
                    });
                }
            });

        } catch (error) {
            console.error(`Error checking mobile responsiveness for ${page.url}:`, error.message);
        }
    }

    return {
        category: 'Mobile Responsiveness',
        issues: mobileIssues
    };
}

async generateSEOReport() {
    const results = await this.runFullAudit();
    return {
        timestamp: new Date().toISOString(),
        overallScore: this.calculateOverallScore(results),
        categorizedIssues: results,
        recommendations: this.generateRecommendations(results),
        metrics: await this.gatherMetrics()
    };
}

calculateOverallScore(results) {
    // Implementation of score calculation based on issues severity
}

generateRecommendations(results) {
    // Generate actionable recommendations based on found issues
}

async gatherMetrics() {
    // Gather important SEO metrics
}
}

module.exports = SEOAuditor;