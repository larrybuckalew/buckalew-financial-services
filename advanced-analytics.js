document.addEventListener('DOMContentLoaded', function() {
    // Simulated Financial Data
    const financialData = {
        portfolioValue: 250000,
        assetAllocation: {
            stocks: 60,
            bonds: 25,
            realEstate: 10,
            cash: 5
        },
        investmentPerformance: [
            { year: 2020, return: 8.5 },
            { year: 2021, return: 12.3 },
            { year: 2022, return: -3.2 },
            { year: 2023, return: 9.7 }
        ],
        marketComparison: {
            portfolio: [8.5, 12.3, -3.2, 9.7],
            benchmark: [7.2, 10.1, -2.5, 8.9]
        }
    };

    // Update Portfolio Value
    function updatePortfolioValue() {
        const portfolioValueElement = document.getElementById('total-portfolio-value');
        portfolioValueElement.textContent = `$${financialData.portfolioValue.toLocaleString()}`;
    }

    // Asset Allocation Chart
    function createAssetAllocationChart() {
        const ctx = document.getElementById('asset-allocation-chart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(financialData.assetAllocation),
                datasets: [{
                    data: Object.values(financialData.assetAllocation),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Asset Allocation'
                }
            }
        });
    }

    // Investment Performance Chart
    function createInvestmentPerformanceChart() {
        const ctx = document.getElementById('investment-performance-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: financialData.investmentPerformance.map(item => item.year),
                datasets: [{
                    label: 'Annual Return (%)',
                    data: financialData.investmentPerformance.map(item => item.return),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Return %'
                        }
                    }
                }
            }
        });
    }

    // Risk Score Visualization
    function updateRiskScore() {
        const riskScoreGauge = document.getElementById('risk-score-gauge');
        const riskScoreDescription = document.getElementById('risk-score-description');
        
        // Simulated risk calculation
        const riskScore = 60; // 0-100 scale
        const riskLevel = riskScore < 30 ? 'Low' : 
                         riskScore < 70 ? 'Moderate' : 'High';

        riskScoreGauge.style.setProperty('--risk-score', `${riskScore}%`);
        riskScoreDescription.textContent = `${riskLevel} Risk`;
    }

    // Diversification Analysis Chart
    function createDiversificationChart() {
        const ctx = document.getElementById('diversification-chart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash', 'International'],
                datasets: [{
                    label: 'Diversification',
                    data: [60, 25, 10, 5, 0],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)'
                }]
            },
            options: {
                responsive: true,
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // Market Comparison Chart
    function createMarketComparisonChart() {
        const ctx = document.getElementById('market-comparison-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: [2020, 2021, 2022, 2023],
                datasets: [
                    {
                        label: 'Your Portfolio',
                        data: financialData.marketComparison.portfolio,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: 'Market Benchmark',
                        data: financialData.marketComparison.benchmark,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Portfolio vs Market Performance'
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Annual Return %'
                        }
                    }
                }
            }
        });
    }

    // Initialize All Charts and Metrics
    function initializeAnalytics() {
        updatePortfolioValue();
        createAssetAllocationChart();
        createInvestmentPerformanceChart();
        updateRiskScore();
        createDiversificationChart();
        createMarketComparisonChart();
    }

    // Run Analytics
    initializeAnalytics();
});