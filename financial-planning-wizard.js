document.addEventListener('DOMContentLoaded', function() {
    // Wizard Navigation Elements
    const wizard = document.getElementById('financial-wizard');
    const steps = wizard.querySelectorAll('.step');
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');
    const submitButton = document.getElementById('submit-plan');
    const riskDescription = document.getElementById('risk-description');
    const planSummary = document.getElementById('plan-summary');

    let currentStep = 0;

    // Validation Functions
    const stepValidations = [
        // Step 1: Personal Information
        () => {
            const age = document.querySelector('input[name="age"]').value;
            const income = document.querySelector('input[name="income"]').value;
            return age && income && parseInt(age) > 0 && parseInt(income) > 0;
        },
        // Step 2: Financial Goals
        () => {
            const selectedGoals = document.querySelectorAll('input[name="goals"]:checked');
            const goalAmount = document.querySelector('input[name="primary-goal-amount"]').value;
            const goalTimeframe = document.querySelector('input[name="goal-timeframe"]').value;
            return selectedGoals.length > 0 && goalAmount && goalTimeframe;
        },
        // Step 3: Current Financial Situation
        () => {
            const savings = document.querySelector('input[name="current-savings"]').value;
            const expenses = document.querySelector('input[name="monthly-expenses"]').value;
            const debts = document.querySelector('input[name="existing-debts"]').value;
            return savings !== '' && expenses !== '' && debts !== '';
        },
        // Step 4: Risk Tolerance
        () => {
            const riskTolerance = document.querySelector('input[name="risk-tolerance"]:checked');
            return riskTolerance !== null;
        },
        // Step 5: Summary (always valid)
        () => true
    ];

    // Step Navigation
    function navigateStep(direction) {
        // Validate current step before moving
        if (direction === 'next' && !stepValidations[currentStep]()) {
            alert('Please complete all required fields before proceeding.');
            return;
        }

        // Update steps
        steps[currentStep].classList.remove('active');

        if (direction === 'next') {
            currentStep = Math.min(currentStep + 1, steps.length - 1);
        } else {
            currentStep = Math.max(currentStep - 1, 0);
        }

        steps[currentStep].classList.add('active');

        // Update navigation buttons
        updateNavigationButtons();

        // Special handling for last step
        if (currentStep === steps.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'block';
        } else {
            nextButton.style.display = 'block';
            submitButton.style.display = 'none';
        }

        // Update risk description if on risk step
        if (currentStep === 3) {
            updateRiskDescription();
        }
    }

    // Update Navigation Buttons
    function updateNavigationButtons() {
        prevButton.disabled = currentStep === 0;
        nextButton.disabled = currentStep === steps.length - 1;
    }

    // Risk Tolerance Description
    const riskDescriptions = {
        'conservative': 'Conservative investors prioritize capital preservation. Typically recommended for those near retirement or with low risk tolerance.',
        'moderate': 'Moderate investors seek a balance between growth and stability. A mix of growth and conservative investments.',
        'aggressive': 'Aggressive investors seek maximum growth, willing to accept higher volatility for potentially higher returns.'
    };

    // Update Risk Description
    function updateRiskDescription() {
        const riskTolerance = document.querySelector('input[name="risk-tolerance"]:checked');
        if (riskTolerance) {
            riskDescription.textContent = riskDescriptions[riskTolerance.value];
        }
    }

    // Generate Financial Plan
    function generateFinancialPlan() {
        // Collect form data
        const formData = {
            age: document.querySelector('input[name="age"]').value,
            income: document.querySelector('input[name="income"]').value,
            maritalStatus: document.querySelector('select[name="marital-status"]').value,
            goals: Array.from(document.querySelectorAll('input[name="goals"]:checked')).map(el => el.value),
            primaryGoalAmount: document.querySelector('input[name="primary-goal-amount"]').value,
            goalTimeframe: document.querySelector('input[name="goal-timeframe"]').value,
            currentSavings: document.querySelector('input[name="current-savings"]').value,
            monthlyExpenses: document.querySelector('input[name="monthly-expenses"]').value,
            existingDebts: document.querySelector('input[name="existing-debts"]').value,
            riskTolerance: document.querySelector('input[name="risk-tolerance"]:checked').value
        };

        // Basic financial plan generation logic
        const plan = {
            monthlyInvestment: calculateMonthlyInvestment(formData),
            recommendedAssetAllocation: getAssetAllocation(formData.riskTolerance),
            goalTrackingStrategy: generateGoalTrackingStrategy(formData),
            riskMitigationStrategy: generateRiskMitigationStrategy(formData)
        };

        // Save plan to localStorage
        localStorage.setItem('financialPlan', JSON.stringify(plan));

        displayPlanSummary(plan);

        // Optional: Send plan to backend or email
        sendPlanToAdvisor(formData, plan);
    }

    // Send Plan to Advisor
    function sendPlanToAdvisor(formData, plan) {
        fetch('/api/financial-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                personalInfo: formData,
                planDetails: plan
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Plan submitted successfully');
            // Optional: Show success message to user
        })
        .catch(error => {
            console.error('Error submitting plan:', error);
        });
    }

    // Detailed calculations (previous implementations remain the same)
    function calculateMonthlyInvestment(formData) { /* ... */ }
    function getAssetAllocation(riskTolerance) { /* ... */ }
    function generateGoalTrackingStrategy(formData) { /* ... */ }
    function generateRiskMitigationStrategy(formData) { /* ... */ }

    // Display Plan Summary
    function displayPlanSummary(plan) {
        planSummary.innerHTML = `
            <h3>Your Personalized Financial Plan</h3>
            <div class="plan-details">
                <div class="plan-section">
                    <h4>Monthly Investment</h4>
                    <p>$${plan.monthlyInvestment} recommended monthly investment</p>
                </div>
                <div class="plan-section">
                    <h4>Asset Allocation</h4>
                    <p>Stocks: ${plan.recommendedAssetAllocation.stocks}%</p>
                    <p>Bonds: ${plan.recommendedAssetAllocation.bonds}%</p>
                    <p>Cash: ${plan.recommendedAssetAllocation.cash}%</p>
                </div>
                <div class="plan-section">
                    <h4>Goal Tracking Strategies</h4>
                    <ul>
                        ${plan.goalTrackingStrategy.map(strategy => `<li>${strategy}</li>`).join('')}
                    </ul>
                </div>
                <div class="plan-section">
                    <h4>Risk Mitigation</h4>
                    <ul>
                        ${plan.riskMitigationStrategy.map(strategy => `<li>${strategy}</li>`).join('')}
                    </ul>
                </div>
                <div class="action-buttons">
                    <button id="download-plan" class="btn">Download Plan</button>
                    <button id="schedule-consultation" class="btn">Schedule Consultation</button>
                </div>
            </div>
        `;

        // Add event listeners to new buttons
        document.getElementById('download-plan').addEventListener('click', downloadFinancialPlan);
        document.getElementById('schedule-consultation').addEventListener('click', scheduleConsultation);
    }

    // Download Financial Plan
    function downloadFinancialPlan() {
        const plan = JSON.parse(localStorage.getItem('financialPlan'));
        if (plan) {
            const planText = JSON.stringify(plan, null, 2);
            const blob = new Blob([planText], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'financial-plan.json';
            a.click();
            URL.revokeObjectURL(url);
        }
    }

    // Schedule Consultation
    function scheduleConsultation() {
        window.location.href = '/contact.html';
    }

    // Event Listeners
    prevButton.addEventListener('click', () => navigateStep('prev'));
    nextButton.addEventListener('click', () => navigateStep('next'));
    submitButton.addEventListener('click', generateFinancialPlan);

    // Risk Tolerance Radio Buttons
    const riskToleranceInputs = document.querySelectorAll('input[name="risk-tolerance"]');
    riskToleranceInputs.forEach(input => {
        input.addEventListener('change', updateRiskDescription);
    });

    // Initialize
    updateNavigationButtons();
});
