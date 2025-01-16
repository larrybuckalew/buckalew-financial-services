// Blog Post Controller with SEO Optimization

const ContentOptimizer = require('../utils/ContentOptimizer');
const ImageOptimizer = require('../utils/ImageOptimizer');

class BlogController {
    constructor() {
        this.contentOptimizer = new ContentOptimizer();
        this.imageOptimizer = new ImageOptimizer();
    }

    async createPost(req, res) {
        try {
            const {
                title,
                content,
                metaTitle,
                metaDescription,
                category,
                slug,
                status,
                focusKeyword
            } = req.body;

            // Optimize content for SEO
            const optimizedContent = await this.optimizeContent({
                title,
                content,
                metaTitle,
                metaDescription,
                category,
                focusKeyword
            });

            // Handle featured image if present
            let featuredImage = null;
            if (req.files && req.files.featuredImage) {
                featuredImage = await this.handleFeaturedImage(req.files.featuredImage);
            }

            // Create blog post database entry
            const post = await this.createBlogPost({
                ...optimizedContent,
                slug,
                status,
                featuredImage,
                author: req.user.id
            });

            // Generate and update sitemap
            await this.updateSitemap();

            return res.status(201).json({
                success: true,
                data: post,
                seoAnalysis: optimizedContent.seoAnalysis
            });

        } catch (error) {
            console.error('Error creating blog post:', error);
            return res.status(500).json({
                success: false,
                error: 'Error creating blog post'
            });
        }
    }

    async optimizeContent({
        title,
        content,
        metaTitle,
        metaDescription,
        category,
        focusKeyword
    }) {
        // Optimize content using ContentOptimizer
        const optimizationResult = await this.contentOptimizer.optimizeContent(
            content,
            category
        );

        // Generate schema markup
        const schemaMarkup = this.generateSchemaMarkup({
            title,
            metaDescription,
            category
        });

        // Enhance content with SEO elements
        const enhancedContent = this.enhanceContent(
            optimizationResult.content,
            schemaMarkup
        );

        return {
            title,
            content: enhancedContent,
            metaTitle: metaTitle || title,
            metaDescription,
            schemaMarkup,
            seoAnalysis: optimizationResult.analysis
        };
    }

    async handleFeaturedImage(image) {
        // Optimize image for web
        const optimizedImage = await this.imageOptimizer.optimizeImage(image, {
            sizes: {
                thumbnail: 300,
                medium: 600,
                large: 1200,
                og: 1200
            },
            formats: ['webp', 'jpg']
        });

        return {
            ...optimizedImage,
            alt: image.originalname.replace(/\.[^/.]+$/, ''), // Use filename as alt text
            caption: ''
        };
    }

    generateSchemaMarkup({ title, metaDescription, category }) {
        return {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': title,
            'description': metaDescription,
            'author': {
                '@type': 'Organization',
                'name': 'Buckalew Financial Services'
            },
            'publisher': {
                '@type': 'Organization',
                'name': 'Buckalew Financial Services',
                'logo': {
                    '@type': 'ImageObject',
                    'url': 'https://buckalewfinancial.com/logo.png'
                }
            },
            'datePublished': new Date().toISOString(),
            'dateModified': new Date().toISOString(),
            'mainEntityOfPage': {
                '@type': 'WebPage'
            },
            'keywords': this.getKeywordsForCategory(category)
        };
    }

    getKeywordsForCategory(category) {
        const keywordMap = {
            medicare: [
                'Medicare insurance',
                'Medicare coverage',
                'Medicare plans',
                'Medicare enrollment',
                'Medicare benefits'
            ],
            'life-insurance': [
                'life insurance',
                'term life insurance',
                'whole life insurance',
                'life insurance coverage',
                'life insurance benefits'
            ],
            retirement: [
                'retirement planning',
                'retirement benefits',
                'retirement savings',
                'retirement strategy',
                'retirement income'
            ]
        };

        return keywordMap[category] || [];
    }

    enhanceContent(content, schemaMarkup) {
        // Add schema markup
        const enhancedContent = `
            ${content}
            <script type="application/ld+json">
                ${JSON.stringify(schemaMarkup)}
            </script>
        `;

        return enhancedContent;
    }

    async updateSitemap() {
        // Implementation of sitemap update logic
    }

    async createBlogPost(postData) {
        // Implementation of database creation logic
    }
}

module.exports = new BlogController();