// Blog Editor with Real-time SEO Analysis

document.addEventListener('DOMContentLoaded', function() {
    // Initialize TinyMCE Editor
    tinymce.init({
        selector: '#postContent',
        plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | image | help',
        height: 600,
        setup: function(editor) {
            editor.on('Change', function() {
                runSEOAnalysis();
            });
        }
    });

    // Initialize SEO Analysis
    const seoAnalyzer = {
        analyzeContent() {
            const content = tinymce.get('postContent').getContent();
            const title = document.getElementById('postTitle').value;
            const metaTitle = document.getElementById('metaTitle').value;
            const metaDescription = document.getElementById('metaDescription').value;
            const focusKeyword = document.getElementById('focusKeyword').value;

            const analysis = {
                score: 0,
                improvements: [],
                passed: []
            };

            // Check title length
            if (title.length < 30 || title.length > 60) {
                analysis.improvements.push({
                    type: 'title',
                    message: 'Title length should be between 30-60 characters',
                    priority: 'high'
                });
            } else {
                analysis.passed.push('Title length is optimal');
                analysis.score += 10;
            }

            // Check meta description
            if (metaDescription.length < 120 || metaDescription.length > 160) {
                analysis.improvements.push({
                    type: 'meta',
                    message: 'Meta description should be between 120-160 characters',
                    priority: 'high'
                });
            } else {
                analysis.passed.push('Meta description length is optimal');
                analysis.score += 10;
            }

            // Check keyword usage
            if (focusKeyword) {
                const keywordAnalysis = this.analyzeKeywordUsage(content, title, metaTitle, metaDescription, focusKeyword);
                analysis.improvements = [...analysis.improvements, ...keywordAnalysis.improvements];
                analysis.passed = [...analysis.passed, ...keywordAnalysis.passed];
                analysis.score += keywordAnalysis.score;
            }

            // Check content structure
            const structureAnalysis = this.analyzeStructure(content);
            analysis.improvements = [...analysis.improvements, ...structureAnalysis.improvements];
            analysis.passed = [...analysis.passed, ...structureAnalysis.passed];
            analysis.score += structureAnalysis.score;

            return analysis;
        },

        analyzeKeywordUsage(content, title, metaTitle, metaDescription, keyword) {
            const analysis = {
                improvements: [],
                passed: [],
                score: 0
            };

            // Check keyword in title
            if (title.toLowerCase().includes(keyword.toLowerCase())) {
                analysis.passed.push('Keyword found in title');
                analysis.score += 10;
            } else {
                analysis.improvements.push({
                    type: 'keyword',
                    message: 'Include focus keyword in title',
                    priority: 'high'
                });
            }

            // Check keyword density
            const contentText = content.replace(/<[^>]+>/g, '');
            const wordCount = contentText.split(/\s+/).length;
            const keywordCount = (contentText.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
            const density = (keywordCount / wordCount) * 100;

            if (density < 0.5) {
                analysis.improvements.push({
                    type: 'keyword',
                    message: 'Increase keyword usage (current density too low)',
                    priority: 'medium'
                });
            } else if (density > 2.5) {
                analysis.improvements.push({
                    type: 'keyword',
                    message: 'Reduce keyword usage (possible keyword stuffing)',
                    priority: 'high'
                });
            } else {
                analysis.passed.push('Keyword density is optimal');
                analysis.score += 10;
            }

            return analysis;
        },

        analyzeStructure(content) {
            const analysis = {
                improvements: [],
                passed: [],
                score: 0
            };

            // Check headings structure
            const h1Count = (content.match(/<h1[^>]*>/g) || []).length;
            const h2Count = (content.match(/<h2[^>]*>/g) || []).length;
            const h3Count = (content.match(/<h3[^>]*>/g) || []).length;

            if (h1Count !== 1) {
                analysis.improvements.push({
                    type: 'structure',
                    message: 'Use exactly one H1 heading',
                    priority: 'high'
                });
            } else {
                analysis.passed.push('H1 heading usage is correct');
                analysis.score += 10;
            }

            if (h2Count === 0) {
                analysis.improvements.push({
                    type: 'structure',
                    message: 'Add H2 headings to structure your content',
                    priority: 'medium'
                });
            } else {
                analysis.passed.push('Content contains H2 headings');
                analysis.score += 5;
            }

            // Check paragraph length
            const paragraphs = content.match(/<p>[^<]+<\/p>/g) || [];
            const longParagraphs = paragraphs.filter(p => p.length > 300);

            if (longParagraphs.length > 0) {
                analysis.improvements.push({
                    type: 'readability',
                    message: `${longParagraphs.length} paragraphs are too long. Consider breaking them up.`,
                    priority: 'medium'
                });
            } else if (paragraphs.length > 0) {
                analysis.passed.push('Paragraph lengths are good');
                analysis.score += 5;
            }

            return analysis;
        }
    };

    // Function to run SEO analysis and update UI
    function runSEOAnalysis() {
        const analysis = seoAnalyzer.analyzeContent();
        updateSEOScoreDisplay(analysis.score);
        updateSEOAnalysisDisplay(analysis);
    }

    // Update SEO score circle
    function updateSEOScoreDisplay(score) {
        const circle = document.querySelector('.score-circle path:last-child');
        const scoreText = document.querySelector('.score');
        const circumference = 2 * Math.PI * 15.9155;
        const offset = ((100 - score) / 100) * circumference;

        circle.style.strokeDasharray = `${circumference - offset} ${offset}`;
        scoreText.textContent = Math.round(score);

        // Update color based on score
        if (score >= 80) {
            circle.style.stroke = '#4CAF50';
        } else if (score >= 60) {
            circle.style.stroke = '#FFC107';
        } else {
            circle.style.stroke = '#F44336';
        }
    }

    // Update SEO analysis display
    function updateSEOAnalysisDisplay(analysis) {
        const analysisContainer = document.getElementById('seoAnalysis');
        const tipsContainer = document.getElementById('optimizationTips');

        // Clear existing content
        analysisContainer.innerHTML = '';
        tipsContainer.innerHTML = '';

        // Add improvements
        if (analysis.improvements.length > 0) {
            const improvementsList = document.createElement('ul');
            improvementsList.className = 'improvements-list';

            analysis.improvements.forEach(improvement => {
                const li = document.createElement('li');
                li.className = `improvement ${improvement.priority}`;
                li.innerHTML = `
                    <span class="indicator"></span>
                    <span class="message">${improvement.message}</span>
                `;
                improvementsList.appendChild(li);
            });

            analysisContainer.appendChild(improvementsList);
        }

        // Add passed checks
        if (analysis.passed.length > 0) {
            const passedList = document.createElement('ul');
            passedList.className = 'passed-list';

            analysis.passed.forEach(passed => {
                const li = document.createElement('li');
                li.className = 'passed';
                li.innerHTML = `
                    <span class="indicator">✓</span>
                    <span class="message">${passed}</span>
                `;
                passedList.appendChild(li);
            });

            analysisContainer.appendChild(passedList);
        }
    }

    // Event listeners for real-time analysis
    document.getElementById('postTitle').addEventListener('input', runSEOAnalysis);
    document.getElementById('metaTitle').addEventListener('input', runSEOAnalysis);
    document.getElementById('metaDescription').addEventListener('input', runSEOAnalysis);
    document.getElementById('focusKeyword').addEventListener('input', runSEOAnalysis);

    // Character count updates
    function updateCharCount(input, limit) {
        const count = input.value.length;
        const counter = input.nextElementSibling.querySelector('span');
        counter.textContent = count;
        counter.className = count > limit ? 'over-limit' : '';
    }

    document.getElementById('metaTitle').addEventListener('input', function() {
        updateCharCount(this, 60);
    });

    document.getElementById('metaDescription').addEventListener('input', function() {
        updateCharCount(this, 160);
    });

    // Auto-generate slug from title
    document.getElementById('postTitle').addEventListener('input', function() {
        const slug = this.value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        document.getElementById('postSlug').value = slug;
    });
});
