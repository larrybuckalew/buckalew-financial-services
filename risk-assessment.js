document.addEventListener('DOMContentLoaded', function() {
    const riskAssessmentForm = document.getElementById('risk-assessment-form');
    const riskAssessmentResult = document.getElementById('risk-assessment-result');

    riskAssessmentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const age = parseInt(document.getElementById('age').value);
        const income = parseFloat(document.getElementById('income').value);
        const investmentGoal = document.getElementById('investment-goal').value;
        const investmentHorizon = document.getElementById('investment-horizon').value;
        const portfolioDrop = document.querySelector('input[name="portfolio-drop"]:checked').value;
        const investmentConcern = document.querySelector('input[name="investment-concern"]:checked').value;

        // Risk calculation algorithm
        function calculateRiskScore() {
            let riskScore = 0;

            // Age factor
            if (age < 30) riskScore += 10;
            else if (age < 45) riskScore += 5;
            else riskScore += 2;

            // Income factor
            if (income > 100000) riskScore += 10;
            else if (income > 50000) riskScore += 5;
            else riskScore += 2;

            // Investment goal factor
            switch(investmentGoal) {
                case 'wealth-growth': riskScore += 10; break;
                case 'retirement': riskScore += 5; break;
                default: riskScore += 2;
            }

            // Investment horizon factor
            switch(investmentHorizon) {
                case 'long': riskScore += 10; break;
                case 'medium': riskScore += 5; break;
                default: riskScore += 2;
            }

            // Risk tolerance factors
            switch(portfolioDrop) {
                case 'aggressive': riskScore += 10; break;
                case 'moderate': riskScore += 5; break;
                default: riskScore += 2;
            }

            switch(investmentConcern) {
                case 'growth': riskScore += 10; break;
                case 'balance': riskScore += 5; break;
                default: riskScore += 2;
            }

            return riskScore;
        }

        const riskScore = calculateRiskScore();

        // Risk profile determination
        let riskProfile = '';
        let investmentRecommendation = '';
        let riskDescription = '';

        if (riskScore < 20) {
            riskProfile = 'Conservative';
            investmentRecommendation = 'Low-risk bonds, fixed deposits, and stable value funds';
            riskDescription = 'You prioritize capital preservation and are risk-averse.';
        } else if (riskScore < 40) {
            riskProfile = 'Moderate';
            investmentRecommendation = 'Balanced mix of stocks and bonds, dividend-paying stocks';
            riskDescription = 'You seek steady growth with controlled risk exposure.';
        } else {
            riskProfile = 'Aggressive';
            investmentRecommendation = 'Growth stocks, emerging markets, high-yield investments';
            riskDescription = 'You are comfortable with higher risk for potential higher returns.';
        }

        // Display results
        riskAssessmentResult.innerHTML = `
            <h2>Your Financial Risk Profile</h2>
            <div class="profile-details">
                <p><strong>Risk Profile:</strong> ${riskProfile}</p>
                <p><strong>Risk Description:</strong> ${riskDescription}</p>
                <h3>Investment Recommendations</h3>
                <p>${investmentRecommendation}</p>
                <div class="risk-disclaimer">
                    <p>Disclaimer: This is a simplified risk assessment. Consult a financial advisor for personalized advice.</p>
                    <a href="/contact.html" class="btn">Schedule Consultation</a>
                </div>
            </div>
        `;

        // Optional: Send anonymized data to backend for insights
        try {
            fetch('/api/risk-assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    riskProfile,
                    riskScore,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (error) {
            console.error('Failed to log risk assessment', error);
        }
    });
});