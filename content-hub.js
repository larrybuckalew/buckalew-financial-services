document.addEventListener('DOMContentLoaded', function() {
    // Content Search Functionality
    const contentSearchInput = document.getElementById('content-search-input');
    const contentSearchBtn = document.getElementById('content-search-btn');

    // Simulated Content Database
    const contentDatabase = [
        {
            title: '2024 Market Outlook',
            category: 'Market Insights',
            type: 'article',
            tags: ['market trends', 'investing', '2024'],
            url: '/insights/2024-market-outlook.html'
        },
        {
            title: 'Ultimate Retirement Planning Guide',
            category: 'Retirement Planning',
            type: 'guide',
            tags: ['retirement', 'financial planning', 'savings'],
            url: '/insights/retirement-planning-guide.html'
        },
        {
            title: 'Investment Strategies for Young Professionals',
            category: 'Investment Strategies',
            type: 'article',
            tags: ['investing', 'young professionals', 'portfolio'],
            url: '/insights/investment-strategies.html'
        }
    ];

    // Search Functionality
    function performContentSearch(query) {
        const searchResults = contentDatabase.filter(content => {
            const searchTerms = query.toLowerCase().split(' ');
            return searchTerms.some(term => 
                content.title.toLowerCase().includes(term) ||
                content.category.toLowerCase().includes(term) ||
                content.tags.some(tag => tag.toLowerCase().includes(term))
            );
        });

        displaySearchResults(searchResults);
    }

    // Display Search Results
    function displaySearchResults(results) {
        const resultsContainer = document.createElement('section');
        resultsContainer.className = 'search-results';
        resultsContainer.innerHTML = '<h2>Search Results</h2>';

        if (results.length === 0) {
            resultsContainer.innerHTML += '<p>No results found. Try a different search term.</p>';
        } else {
            const resultsList = document.createElement('div');
            resultsList.className = 'results-grid';

            results.forEach(result => {
                const resultCard = document.createElement('article');
                resultCard.className = 'result-card';
                resultCard.innerHTML = `
                    <h3>${result.title}</h3>
                    <p>Category: ${result.category}</p>
                    <p>Type: ${result.type}</p>
                    <a href="${result.url}" class="btn">Read More</a>
                `;
                resultsList.appendChild(resultCard);
            });

            resultsContainer.appendChild(resultsList);
        }

        // Remove previous results and add new
        const existingResults = document.querySelector('.search-results');
        if (existingResults) {
            existingResults.remove();
        }
        document.querySelector('main').appendChild(resultsContainer);
    }

    // Newsletter Signup
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        // Simulate newsletter signup
        subscribeToNewsletter(email);
        emailInput.value = '';
    });

    // Newsletter Subscription
    function subscribeToNewsletter(email) {
        // Simulate backend newsletter subscription
        fetch('/api/newsletter-signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            alert('Successfully subscribed to our newsletter!');
        })
        .catch(error => {
            console.error('Newsletter signup error:', error);
            alert('Error subscribing. Please try again.');
        });
    }

    // Event Listeners
    contentSearchBtn.addEventListener('click', () => {
        const searchQuery = contentSearchInput.value.trim();
        if (searchQuery) {
            performContentSearch(searchQuery);
        }
    });

    // Optional: Search on Enter key
    contentSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchQuery = contentSearchInput.value.trim();
            if (searchQuery) {
                performContentSearch(searchQuery);
            }
        }
    });
});