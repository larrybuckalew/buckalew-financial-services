document.addEventListener('DOMContentLoaded', function() {
    // Input Elements
    const currentAgeInput = document.getElementById('current-age');
    const retirementAgeInput = document.getElementById('retirement-age');
    const currentIncomeInput = document.getElementById('current-income');
    const currentSavingsInput = document.getElementById('current-savings');
    const monthlyContributionInput = document.getElementById('monthly-contribution');
    const expectedReturnInput = document.getElementById('expected-return');
    const retirementExpensesInput = document.getElementById('retirement-expenses');
    const calculateButton = document.getElementById('calculate-retirement');
    const projectionDetails = document.getElementById('projection-details');
    const retirementProjectionChart = document.getElementById('retirement-projection-chart').getContext('2d');

    // Retirement Calculation Function
    function calculateRetirementProjection() {
        // Collect input values
        const currentAge = parseFloat(currentAgeInput.value);
        const retirementAge = parseFloat(retirementAgeInput.value);
        const currentIncome = parseFloat(currentIncomeInput.value);
        const currentSavings = parseFloat(currentSavingsInput.value);
        const monthlyContribution = parseFloat(monthlyContributionInput.value);
        const expectedReturn = parseFloat(expectedReturnInput.value) / 100;
        const retirementExpenses = parseFloat(retirementExpensesInput.value);

        // Retirement years calculation
        const yearsToRetirement = retirementAge - currentAge;
        const yearsInRetirement = 30; // Typical retirement duration

        // Savings projection
        let currentBalance = currentSavings;
        const yearlyContribution = monthlyContribution * 12;
        const projectedBalances = [currentBalance];

        for (let year = 1; year <= yearsToRetirement; year++) {
            currentBalance = (currentBalance + yearlyContribution) * (1 + expectedReturn);
            projectedBalances.push(currentBalance);
        }

        const finalRetirementBalance = currentBalance;

        // Annual retirement income calculation
        const annualRetirementIncome = finalRetirementBalance * (expectedReturn / 2);

        // Retirement readiness assessment
        const retirementReadinessScore = calculateRetirementReadiness(
            currentIncome, 
            retirementExpenses, 
            annualRetirementIncome
        );

        // Update projection details
        updateProjectionDetails(
            finalRetirementBalance, 
            annualRetirementIncome, 
            retirementReadinessScore
        );

        // Create projection chart
        createRetirementProjectionChart(projectedBalances, yearsToRetirement);
    }

    // Calculate Retirement Readiness Score
    function calculateRetirementReadiness(currentIncome, retirementExpenses, projectedIncome) {
        const replacementRatio = (projectedIncome / currentIncome) * 100;

        if (replacementRatio >= 80) return 'Excellent';
        if (replacementRatio >= 60) return 'Good';
        if (replacementRatio >= 40) return 'Needs Improvement';
        return 'Critical';
    }

    // Update Projection Details
    function updateProjectionDetails(finalBalance, annualIncome, readinessScore) {
        projectionDetails.innerHTML = `
            <div class="projection-metric">
                <h4>Projected Retirement Balance</h4>
                <p>$${finalBalance.toLocaleString()}</p>
            </div>
            <div class="projection-metric">
                <h4>Estimated Annual Retirement Income</h4>
                <p>$${annualIncome.toLocaleString()}</p>
            </div>
            <div class="projection-metric">
                <h4>Retirement Readiness</h4>
                <p class="readiness-${readinessScore.toLowerCase()}">${readinessScore}</p>
            </div>
        `;
    }

    // Create Retirement Projection Chart
    function createRetirementProjectionChart(balances, yearsToRetirement) {
        new Chart(retirementProjectionChart, {
            type: 'line',
            data: {
                labels: Array.from({length: balances.length}, (_, i) => `Year ${i}`),
                datasets: [{
                    label: 'Retirement Savings Projection',
                    data: balances,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    fill: false
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
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Years Until Retirement'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Input Validation
    function validateInputs() {
        const inputs = [
            currentAgeInput, retirementAgeInput, currentIncomeInput,
            currentSavingsInput, monthlyContributionInput,
            expectedReturnInput, retirementExpensesInput
        ];

        return inputs.every(input => input.value && parseFloat(input.value) > 0);
    }

    // Event Listeners
    calculateButton.addEventListener('click', function() {
        if (validateInputs()) {
            calculateRetirementProjection();
        } else {
            alert('Please fill in all fields with valid positive numbers.');
        }
    });

    // Tooltip Explanations
    function addTooltipExplanations() {
        const tooltipData = {
            'current-age': 'Your current age',
            'retirement-age': 'Age at which you plan to retire',
            'current-income': 'Your current annual income',
            'current-savings': 'Total current retirement savings',
            'monthly-contribution': 'Amount you contribute monthly to retirement',
            'expected-return': 'Expected annual investment return',
            'retirement-expenses': 'Estimated annual expenses in retirement'
        };

        Object.entries(tooltipData).forEach(([id, explanation]) => {
            const input = document.getElementById(id);
            input.setAttribute('title', explanation);
        });
    }

    // Initialize
    addTooltipExplanations();
});