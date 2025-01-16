// Content Optimization Utility

class ContentOptimizer {
    constructor() {
        this.industryKeywords = {
            medicare: [
                'Medicare Advantage',
                'Medicare Supplement',
                'Part D coverage',
                'Medicare enrollment',
                'Medicare benefits',
                'Medicare eligibility'
            ],
            lifeInsurance: [
                'term life insurance',
                'whole life insurance',
                'universal life',
                'life insurance benefits',
                'life insurance coverage',
                'policy options'
            ],
            retirement: [
                'retirement planning',
                '401(k) rollover',
                'retirement savings',
                'retirement strategy',
                'retirement income',
                'pension planning'
            ]
        };

        this.contentGuidelines = {
            titleLength: { min: 30, max: 60 },
            metaDescriptionLength: { min: 120, max: 160 },
            paragraphLength: { max: 300 },
            readabilityLevel: 'grade8',
            headingFrequency: { every: 300 },
            imageFrequency: { every: 500 }
        };
    }

    analyzeContent(content, category) {
        const analysis = {
            readability: this.checkReadability(content),
            seoScore: this.calculateSEOScore(content, category),
            keywordUsage: this.analyzeKeywordUsage(content, category),
            structure: this.analyzeStructure(content),
            improvements: []
        };

        // Generate improvement suggestions
        analysis.improvements = this.generateImprovements(analysis);

        return analysis;
    }

    checkReadability(content) {
        const sentences = this.splitIntoSentences(content);
        const words = content.split(/\s+/);
        
        return {
            sentenceCount: sentences.length,
            wordCount: words.length,
            averageWordsPerSentence: words.length / sentences.length,
            complexWords: this.countComplexWords(words),
            readabilityScore: this.calculateFleschKincaid(sentences, words)
        };
    }

    calculateSEOScore(content, category) {
        let score = 100;
        const relevantKeywords = this.industryKeywords[category] || [];
        const keywordDensity = this.calculateKeywordDensity(content, relevantKeywords);

        // Check keyword density
        if (keywordDensity < 1) score -= 10;
        if (keywordDensity > 4) score -= 15;

        // Check heading structure
        if (!content.includes('<h1>')) score -= 10;
        if (!content.match(/<h2>/g)) score -= 5;

        // Check meta elements
        if (!content.includes('<meta name="description"')) score -= 15;
        if (!content.includes('<title>')) score -= 15;

        // Check image alt tags
        const images = content.match(/<img[^>]+>/g) || [];
        const imagesWithoutAlt = images.filter(img => !img.includes('alt="'));
        if (imagesWithoutAlt.length > 0) score -= (imagesWithoutAlt.length * 5);

        return score;
    }

    analyzeKeywordUsage(content, category) {
        const keywords = this.industryKeywords[category] || [];
        const analysis = {};

        keywords.forEach(keyword => {
            const regex = new RegExp(keyword, 'gi');
            const count = (content.match(regex) || []).length;
            const density = (count * keyword.split(' ').length / content.split(' ').length) * 100;

            analysis[keyword] = {
                count,
                density: density.toFixed(2),
                optimal: density >= 0.5 && density <= 2.5
            };
        });

        return analysis;
    }

    analyzeStructure(content) {
        return {
            paragraphs: this.analyzeParagraphs(content),
            headings: this.analyzeHeadings(content),
            images: this.analyzeImages(content),
            links: this.analyzeLinks(content)
        };
    }

    analyzeParagraphs(content) {
        const paragraphs = content.match(/<p>[^<]+<\/p>/g) || [];
        return {
            count: paragraphs.length,
            lengthDistribution: paragraphs.map(p => p.length),
            tooLong: paragraphs.filter(p => p.length > this.contentGuidelines.paragraphLength.max).length
        };
    }

    analyzeHeadings(content) {
        const headings = {
            h1: (content.match(/<h1[^>]*>[^<]+<\/h1>/g) || []).length,
            h2: (content.match(/<h2[^>]*>[^<]+<\/h2>/g) || []).length,
            h3: (content.match(/<h3[^>]*>[^<]+<\/h3>/g) || []).length
        };

        return {
            ...headings,
            structure: this.validateHeadingStructure(content),
            frequency: this.calculateHeadingFrequency(content)
        };
    }

    generateImprovements(analysis) {
        const improvements = [];

        // Readability improvements
        if (analysis.readability.averageWordsPerSentence > 20) {
            improvements.push({
                type: 'readability',
                severity: 'medium',
                message: 'Consider breaking down some longer sentences for better readability.',
                details: `Average words per sentence: ${analysis.readability.averageWordsPerSentence.toFixed(1)}`
            });
        }

        // SEO improvements
        if (analysis.seoScore < 80) {
            improvements.push({
                type: 'seo',
                severity: 'high',
                message: 'Several SEO elements need improvement.',
                details: this.generateSEORecommendations(analysis)
            });
        }

        // Structure improvements
        const structure = analysis.structure;
        if (structure.headings.h1 !== 1) {
            improvements.push({
                type: 'structure',
                severity: 'high',
                message: 'Each page should have exactly one H1 heading.',
                details: `Current H1 count: ${structure.headings.h1}`
            });
        }

        return improvements;
    }

    optimizeContent(content, category) {
        // Analyze current content
        const analysis = this.analyzeContent(content, category);

        // Apply optimizations
        let optimizedContent = content;

        // Optimize meta description
        optimizedContent = this.optimizeMetaDescription(optimizedContent, category);

        // Optimize headings
        optimizedContent = this.optimizeHeadings(optimizedContent);

        // Optimize images
        optimizedContent = this.optimizeImages(optimizedContent);

        // Add schema markup
        optimizedContent = this.addSchemaMarkup(optimizedContent, category);

        return {
            content: optimizedContent,
            analysis: this.analyzeContent(optimizedContent, category),
            improvements: analysis.improvements
        };
    }

    // Utility methods for content optimization
    splitIntoSentences(text) {
        return text.split(/[.!?]+/).filter(Boolean);
    }

    calculateFleschKincaid(sentences, words) {
        // Implementation of Flesch-Kincaid readability score
    }

    countComplexWords(words) {
        // Count words with more than 3 syllables
    }

    calculateKeywordDensity(content, keywords) {
        // Calculate keyword density implementation
    }
}

module.exports = ContentOptimizer;
