// Content Marketing Module
class ContentMarketing {
    constructor() {
        this.initializeContentHub();
        this.setupEventListeners();
        this.loadInitialContent();
    }

    initializeContentHub() {
        const contentHub = document.getElementById('content-hub');
        if (!contentHub) return;

        contentHub.innerHTML = `
            <div class="content-navigation">
                <div class="search-bar">
                    <input type="text" id="content-search" placeholder="Search articles, videos, and resources...">
                </div>
                <div class="content-filters">
                    <button class="filter-btn active" data-category="all">All Content</button>
                    <button class="filter-btn" data-category="retirement">Retirement</button>
                    <button class="filter-btn" data-category="insurance">Insurance</button>
                    <button class="filter-btn" data-category="investment">Investment</button>
                    <button class="filter-btn" data-category="medicare">Medicare</button>
                </div>
            </div>

            <div class="content-layout">
                <div class="featured-content">
                    <h2>Featured Content</h2>
                    <div id="featured-carousel"></div>
                </div>

                <div class="latest-content">
                    <h2>Latest Resources</h2>
                    <div id="content-grid"></div>
                </div>

                <div class="content-sidebar">
                    <div class="newsletter-signup">
                        <h3>Stay Informed</h3>
                        <p>Get the latest financial insights delivered to your inbox.</p>
                        <form id="newsletter-form">
                            <input type="email" placeholder="Your email address" required>
                            <button type="submit" class="btn btn-primary">Subscribe</button>
                        </form>
                    </div>

                    <div class="popular-topics">
                        <h3>Popular Topics</h3>
                        <div class="topic-tags">
                            <span class="tag">Retirement Planning</span>
                            <span class="tag">Medicare Basics</span>
                            <span class="tag">Life Insurance</span>
                            <span class="tag">Investment Strategy</span>
                            <span class="tag">Estate Planning</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('content-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterContent(e.target.dataset.category);
            });
        });

        // Newsletter signup
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup(e.target);
            });
        }
    }

    loadInitialContent() {
        // Featured content carousel
        this.loadFeaturedContent();
        // Latest content grid
        this.loadLatestContent();
    }

    loadFeaturedContent() {
        const featuredContent = [
            {
                id: 'f1',
                title: 'Understanding Medicare in 2024',
                description: 'A comprehensive guide to Medicare changes and options.',
                image: '/images/medicare-guide.jpg',
                category: 'medicare',
                type: 'guide'
            },
            {
                id: 'f2',
                title: 'Retirement Planning Essentials',
                description: 'Key strategies for a secure retirement.',
                image: '/images/retirement-planning.jpg',
                category: 'retirement',
                type: 'article'
            },
            // Add more featured content
        ];

        const carousel = document.getElementById('featured-carousel');
        if (!carousel) return;

        carousel.innerHTML = featuredContent.map(content => `
            <div class="featured-item">
                <div class="featured-image">
                    <img src="${content.image}" alt="${content.title}">
                </div>
                <div class="featured-details">
                    <span class="content-type">${content.type}</span>
                    <h3>${content.title}</h3>
                    <p>${content.description}</p>
                    <a href="/content/${content.id}" class="btn btn-secondary">Learn More</a>
                </div>
            </div>
        `).join('');
    }

    loadLatestContent() {
        const latestContent = [
            {
                id: 'l1',
                title: 'Life Insurance: Protecting Your Family's Future',
                description: 'Learn about different types of life insurance and how to choose the right coverage.',
                image: '/images/life-insurance.jpg',
                category: 'insurance',
                type: 'article',
                date: '2024-03-15'
            },
            // Add more content items
        ];

        const contentGrid = document.getElementById('content-grid');
        if (!contentGrid) return;

        contentGrid.innerHTML = latestContent.map(content => this.createContentCard(content)).join('');
    }

    createContentCard(content) {
        return `
            <div class="content-card" data-category="${content.category}">
                <div class="card-image">
                    <img src="${content.image}" alt="${content.title}">
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span class="content-type">${content.type}</span>
                        <span class="content-date">${new Date(content.date).toLocaleDateString()}</span>
                    </div>
                    <h4>${content.title}</h4>
                    <p>${content.description}</p>
                    <a href="/content/${content.id}" class="btn btn-text">Read More →</a>
                </div>
            </div>
        `;
    }

    handleSearch(query) {
        const contentCards = document.querySelectorAll('.content-card');
        query = query.toLowerCase();

        contentCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterContent(category) {
        const contentCards = document.querySelectorAll('.content-card');
        
        contentCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    async handleNewsletterSignup(form) {
        const email = form.querySelector('input[type="email"]').value;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = 'Thank you for subscribing to our newsletter!';
            form.replaceWith(successMessage);
        } catch (error) {
            // Handle error
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-error';
            errorMessage.textContent = 'There was an error subscribing to the newsletter. Please try again.';
            form.insertBefore(errorMessage, form.firstChild);
        }
    }
}

// Initialize Content Marketing
document.addEventListener('DOMContentLoaded', () => {
    new ContentMarketing();
});
