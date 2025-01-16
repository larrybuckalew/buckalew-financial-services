document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const predictionForm = document.getElementById('ml-prediction-form');
    const predictionResults = document.getElementById('prediction-summary');
    const predictionChart = document.getElementById('prediction-chart').getContext('2d');

    // Machine Learning Prediction Function
    function generateAIFinancialInsights(formData) {
        // Simulate ML prediction logic
        const portfolioTypes = formData.portfolioType;
        const riskTolerance = formData.riskTolerance;
        const annualIncome = formData.annualIncome;
        const currentSavings = formData.currentSavings;

        // Prediction algorithms
        const investmentGrowthProjection = calculateInvestmentProjection(
            currentSavings, 
            annualIncome, 
            portfolioTypes, 
            riskTolerance
        );

        const riskAssessment = calculateRiskProfile(
            annualIncome, 
            currentSavings, 
            portfolioTypes, 
            riskTolerance
        );

        // Display Prediction Results
        displayPredictionResults(investmentGrowthProjection, riskAssessment);

        // Create Visualization
        createPredictionChart(investmentGrowthProjection);
    }

    // Investment Growth Projection
    function calculateInvestmentProjection(currentSavings, annualIncome, portfolioTypes, riskTolerance) {
        const baseGrowthRates = {
            'conservative': 0.04,
            'moderate': 0.07,
            'aggressive': 0.10
        };

        const portfolioMultipliers = {
            'stocks': 1.2,
            'bonds': 0.8,
            'real-estate': 1.1,
            'crypto': 1.5
        };

        // Calculate portfolio growth rate
        let growthRate = baseGrowthRates[riskTolerance];
        portfolioTypes.forEach(type => {
            growthRate *= portfolioMultipliers[type];
        });

        // Projection calculation
        const projectionYears = 10;
        const projectedBalances = [currentSavings];
        const yearlyContribution = annualIncome * 0.15; // Assuming 15% yearly contribution

        for (let year = 1; year <= projectionYears; year++) {
            const lastBalance = projectedBalances[projectedBalances.length - 1];
            const newBalance = (lastBalance + yearlyContribution) * (1 + growthRate);
            projectedBalances.push(newBalance);
        }

        return {
            projectedBalances,
            growthRate: growthRate * 100,
            yearlyContribution
        };
    }

    // Risk Profile Calculation
    function calculateRiskProfile(annualIncome, currentSavings, portfolioTypes, riskTolerance) {
        const riskFactors = {
            incomeStability: annualIncome / 50000,
            savingsRatio: currentSavings / annualIncome,
            portfolioDiversity: portfolioTypes.length,
            riskToleranceMultiplier: {
                'conservative': 0.5,
                'moderate': 0.75,
                'aggressive': 1
            }[riskTolerance]
        };

        const riskScore = (
            riskFactors.incomeStability * 30 +
            riskFactors.savingsRatio * 25 +
            riskFactors.portfolioDiversity * 20 +
            riskFactors.riskToleranceMultiplier * 25
        );

        return {
            riskScore,
            riskCategory: getRiskCategory(riskScore),
            recommendations: generateRiskRecommendations(riskScore)
        };
    }

    // Risk Categorization
    function getRiskCategory(riskScore) {
        if (riskScore < 40) return 'Low Risk';
        if (riskScore < 70) return 'Moderate Risk';
        return 'High Risk';
    }

    // Risk Recommendations
    function generateRiskRecommendations(riskScore) {
        const recommendations = {
            'Low Risk': [
                'Focus on capital preservation',
                'Allocate more to bonds and stable investments',
                'Maintain emergency fund'
            ],
            'Moderate Risk': [
                'Balanced portfolio allocation',
                'Diversify across asset classes',
                'Regular portfolio rebalancing'
            ],
            'High Risk': [
                'Explore growth-oriented investments',
                'Consider higher-risk asset classes',
                'Be prepared for market volatility'
            ]
        };

        return recommendations[getRiskCategory(riskScore)];
    }

    // Display Prediction Results
    function displayPredictionResults(investmentProjection, riskAssessment) {
        predictionResults.innerHTML = `
            <div class="projection-summary">
                <h3>Investment Projection</h3>
                <p>Projected Growth Rate: ${investmentProjection.growthRate.toFixed(2)}%</p>
                <p>Estimated Final Balance: $${investmentProjection.projectedBalances[10].toLocaleString()}</p>
            </div>
            <div class="risk-assessment">
                <h3>Risk Profile</h3>
                <p>Risk Category: ${riskAssessment.riskCategory}</p>
                <p>Risk Score: ${riskAssessment.riskScore.toFixed(2)}</p>
                <h4>Recommendations:</h4>
                <ul>
                    ${riskAssessment.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Create Prediction Visualization
    function createPredictionChart(investmentProjection) {
        new Chart(predictionChart, {
            type: 'line',
            data: {
                labels: Array.from({length: 11}, (_, i) => `Year ${i}`),
                datasets: [{
                    label: 'Investment Projection',
                    data: investmentProjection.projectedBalances,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Portfolio Value ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Form Submission
    predictionForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            annualIncome: parseFloat(document.getElementById('annual-income').value),
            currentSavings: parseFloat(document.getElementById('current-savings').value),
            portfolioType: Array.from(document.getElementById('portfolio-type').selectedOptions).map(opt => opt.value),
            riskTolerance: document.getElementById('risk-tolerance').value
        };

        generateAIFinancialInsights(formData);
    });
});