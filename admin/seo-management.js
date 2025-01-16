// SEO Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const keywordTracker = {
        init() {
            this.bindEvents();
            this.loadKeywords();
        },

        bindEvents() {
            document.getElementById('addKeyword').addEventListener('click', () => this.showAddKeywordModal());
            document.getElementById('runSEOAudit').addEventListener('click', () => this.runFullAudit());
            document.getElementById('bulkOptimize').addEventListener('click', () => this.bulkOptimize());
        },

        async loadKeywords() {
            try {
                const response = await fetch('/api/seo/keywords');
                const keywords = await response.json();
                this.updateKeywordList(keywords);
            } catch (error) {
                console.error('Error loading keywords:', error);
            }
        },

        updateKeywordList(keywords) {
            const list = document.querySelector('.keyword-list');
            list.innerHTML = keywords.map(keyword => `
                <div class="keyword-item" data-id="${keyword.id}">
                    <div class="keyword-info">
                        <span class="keyword-text">${keyword.term}</span>
                        <span class="keyword-position ${this.getPositionClass(keyword.position)}">
                            Rank: ${keyword.position}
                        </span>
                    </div>
                    <div class="keyword-trend">
                        ${this.getTrendIndicator(keyword.trend)}
                    </div>
                    <div class="keyword-actions">
                        <button class="btn-track" onclick="keywordTracker.trackKeyword(${keyword.id})">
                            Update Position
                        </button>
                        <button class="btn-delete" onclick="keywordTracker.deleteKeyword(${keyword.id})">
                            Remove
                        </button>
                    </div>
                </div>
            `).join('');
        },

        getPositionClass(position) {
            if (position <= 3) return 'excellent';
            if (position <= 10) return 'good';
            if (position <= 30) return 'fair';
            return 'poor';
        },

        getTrendIndicator(trend) {
            const indicators = {
                up: '↑',
                down: '↓',
                stable: '→'
            };
            return `<span class="trend-${trend}">${indicators[trend]}</span>`;
        },

        async trackKeyword(keywordId) {
            try {
                const response = await fetch(`/api/seo/track-keyword/${keywordId}`, {
                    method: 'POST'
                });
                const result = await response.json();
                this.updateKeywordPosition(keywordId, result.position, result.trend);
            } catch (error) {
                console.error('Error tracking keyword:', error);
            }
        },

        async deleteKeyword(keywordId) {
            if (confirm('Are you sure you want to stop tracking this keyword?')) {
                try {
                    await fetch(`/api/seo/keywords/${keywordId}`, {
                        method: 'DELETE'
                    });
                    document.querySelector(`[data-id="${keywordId}"]`).remove();
                } catch (error) {
                    console.error('Error deleting keyword:', error);
                }
            }
        },

        async runFullAudit() {
            const auditResults = document.querySelector('.audit-results');
            auditResults.innerHTML = '<div class="loading">Running full site audit...</div>';

            try {
                const response = await fetch('/api/seo/full-audit', {
                    method: 'POST'
                });
                const results = await response.json();
                this.displayAuditResults(results);
            } catch (error) {
                console.error('Error running audit:', error);
                auditResults.innerHTML = '<div class="error">Error running audit. Please try again.</div>';
            }
        },

        displayAuditResults(results) {
            const auditResults = document.querySelector('.audit-results');
            auditResults.innerHTML = `
                <div class="audit-summary">
                    <h3>Site Audit Results</h3>
                    <div class="audit-score">
                        <div class="score-circle">
                            ${this.generateScoreCircle(results.score)}
                        </div>
                        <div class="score-breakdown">
                            <div class="score-item">
                                <span>Technical SEO:</span>
                                <div class="progress-bar">
                                    <div class="progress" style="width: ${results.technicalScore}%"></div>
                                </div>
                            </div>
                            <div class="score-item">
                                <span>Content Quality:</span>
                                <div class="progress-bar">
                                    <div class="progress" style="width: ${results.contentScore}%"></div>
                                </div>
                            </div>
                            <div class="score-item">
                                <span>Mobile Optimization:</span>
                                <div class="progress-bar">
                                    <div class="progress" style="width: ${results.mobileScore}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="audit-issues">
                    ${this.generateIssuesList(results.issues)}
                </div>
            `;
        },

        generateScoreCircle(score) {
            const radius = 90;
            const circumference = 2 * Math.PI * radius;
            const progress = (score / 100) * circumference;
            const dashArray = `${progress} ${circumference}`;
            
            return `
                <svg viewBox="0 0 200 200" class="score-svg">
                    <circle
                        cx="100"
                        cy="100"
                        r="${radius}"
                        fill="none"
                        stroke="#eee"
                        stroke-width="10"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r="${radius}"
                        fill="none"
                        stroke="${this.getScoreColor(score)}"
                        stroke-width="10"
                        stroke-dasharray="${dashArray}"
                        transform="rotate(-90 100 100)"
                    />
                    <text
                        x="100"
                        y="100"
                        text-anchor="middle"
                        dominant-baseline="middle"
                        font-size="36"
                    >
                        ${score}
                    </text>
                </svg>
            `;
        },

        getScoreColor(score) {
            if (score >= 90) return '#4CAF50';
            if (score >= 70) return '#8BC34A';
            if (score >= 50) return '#FFC107';
            return '#F44336';
        },

        generateIssuesList(issues) {
            return `
                <h3>Issues to Address</h3>
                <div class="issues-list">
                    ${issues.map(issue => `
                        <div class="issue-card ${issue.severity}">
                            <h4>${issue.title}</h4>
                            <p>${issue.description}</p>
                            <div class="issue-actions">
                                <button onclick="keywordTracker.showIssueFix(${issue.id})">
                                    How to Fix
                                </button>
                                <span class="severity-badge">${issue.severity}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        showIssueFix(issueId) {
            // Implementation for showing issue fix instructions
        },

        async bulkOptimize() {
            // Implementation for bulk optimization
        }
    };

    // Initialize keyword tracker
    keywordTracker.init();
});
