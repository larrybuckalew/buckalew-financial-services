// SEO Optimization Utility Class

class SEOOptimizer {
    constructor() {
        this.siteConfig = {
            siteName: 'Buckalew Financial Services',
            baseUrl: 'https://buckalewfinancial.com',
            phone: '123-456-7890',
            email: 'info@buckalewfinancial.com',
            address: {
                street: 'Your Street Address',
                city: 'Your City',
                state: 'ST',
                zip: '12345'
            }
        };

        this.metaTemplates = {
            home: {
                title: 'Expert Financial & Insurance Solutions | Buckalew Financial Services',
                description: 'Trusted financial planning, Medicare, and insurance solutions from Buckalew Financial Services. Get expert guidance for your financial future.',
                keywords: 'financial planning, insurance, Medicare, retirement planning, life insurance'
            },
            medicare: {
                title: 'Medicare Insurance Solutions | Buckalew Financial Services',
                description: 'Expert Medicare guidance and insurance solutions. Navigate your options with confidence. Free Medicare consultation available.',
                keywords: 'Medicare, Medicare Advantage, Medicare Supplement, Medicare Part D, insurance'
            },
            lifeInsurance: {
                title: 'Life Insurance Solutions | Buckalew Financial Services',
                description: 'Protect your family's future with comprehensive life insurance solutions. Expert guidance for the right coverage.',
                keywords: 'life insurance, term life, whole life, universal life, family protection'
            }
        };
    }

    generatePageMeta(pageName, customData = {}) {
        const template = this.metaTemplates[pageName] || this.metaTemplates.home;
        const data = { ...template, ...customData };

        return `
            <title>${data.title}</title>
            <meta name="description" content="${data.description}">
            <meta name="keywords" content="${data.keywords}">
            
            <!-- Open Graph Meta Tags -->
            <meta property="og:title" content="${data.title}">
            <meta property="og:description" content="${data.description}">
            <meta property="og:type" content="website">
            <meta property="og:url" content="${this.siteConfig.baseUrl}/${pageName}">
            <meta property="og:site_name" content="${this.siteConfig.siteName}">
            <meta property="og:image" content="${this.siteConfig.baseUrl}/images/${pageName}-og.jpg">
            
            <!-- Twitter Card Meta Tags -->
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="${data.title}">
            <meta name="twitter:description" content="${data.description}">
            <meta name="twitter:image" content="${this.siteConfig.baseUrl}/images/${pageName}-twitter.jpg">
            
            <!-- Canonical URL -->
            <link rel="canonical" href="${this.siteConfig.baseUrl}/${pageName}">
        `;
    }

    generateStructuredData(type, pageSpecificData = {}) {
        const baseData = {
            organization: {
                "@context": "https://schema.org",
                "@type": "FinancialService",
                "name": this.siteConfig.siteName,
                "url": this.siteConfig.baseUrl,
                "telephone": this.siteConfig.phone,
                "email": this.siteConfig.email,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": this.siteConfig.address.street,
                    "addressLocality": this.siteConfig.address.city,
                    "addressRegion": this.siteConfig.address.state,
                    "postalCode": this.siteConfig.address.zip,
                    "addressCountry": "US"
                },
                "priceRange": "$$",
                "openingHours": "Mo-Fr 09:00-17:00"
            },
            localBusiness: {
                "@context": "https://schema.org",
                "@type": "FinancialService",
                "name": this.siteConfig.siteName,
                // Additional local business data
            },
            service: {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Financial Services",
                "provider": {
                    "@type": "FinancialService",
                    "name": this.siteConfig.siteName
                }
            }
        };

        const data = { ...baseData[type], ...pageSpecificData };
        return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    }

    generateSiteMap() {
        const basePages = [
            { url: '/', priority: 1.0, changefreq: 'weekly' },
            { url: '/medicare', priority: 0.9, changefreq: 'weekly' },
            { url: '/life-insurance', priority: 0.9, changefreq: 'weekly' },
            { url: '/retirement-planning', priority: 0.9, changefreq: 'weekly' },
            { url: '/about', priority: 0.8, changefreq: 'monthly' },
            { url: '/contact', priority: 0.8, changefreq: 'monthly' },
            // Add more pages as needed
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
` +
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
` +
            basePages.map(page => `
                <url>
                    <loc>${this.siteConfig.baseUrl}${page.url}</loc>
                    <changefreq>${page.changefreq}</changefreq>
                    <priority>${page.priority}</priority>
                </url>
            `).join('') +
            `</urlset>`;

        return xml;
    }

    generateRobotsTxt() {
        return `
            User-agent: *
            Allow: /
            
            Sitemap: ${this.siteConfig.baseUrl}/sitemap.xml
            
            Disallow: /admin/
            Disallow: /private/
            Disallow: /api/
        `;
    }

    optimizeImages(imagePath) {
        // Image optimization logic would go here
        // This would include resizing, compression, and generating different sizes for responsive images
    }

    generateSEOReport(url) {
        // Implementation for generating SEO analysis reports
    }
}

module.exports = SEOOptimizer;
