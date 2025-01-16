document.addEventListener('DOMContentLoaded', function() {
    // Retirement Savings Calculator
    const retirementCalculator = document.getElementById('retirement-calculator');
    if (retirementCalculator) {
        retirementCalculator.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentAge = parseInt(document.getElementById('current-age').value);
            const retirementAge = parseInt(document.getElementById('retirement-age').value);
            const currentSavings = parseFloat(document.getElementById('current-savings').value);
            const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value);

            const yearsToRetirement = retirementAge - currentAge;
            const annualContribution = monthlyContribution * 12;
            const estimatedAnnualReturn = 0.07; // 7% average return

            let futureValue = currentSavings;
            for (let i = 0; i < yearsToRetirement; i++) {
                futureValue = (futureValue + annualContribution) * (1 + estimatedAnnualReturn);
            }

            const resultElement = document.getElementById('retirement-result');
            resultElement.innerHTML = `
                <h3>Retirement Savings Projection</h3>
                <p>Estimated Retirement Savings: $${futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <small>Assumes 7% average annual return</small>
            `;
        });
    }

    // Mortgage Affordability Calculator
    const mortgageCalculator = document.getElementById('mortgage-calculator');
    if (mortgageCalculator) {
        mortgageCalculator.addEventListener('submit', function(e) {
            e.preventDefault();

            const annualIncome = parseFloat(document.getElementById('annual-income').value);
            const monthlyDebt = parseFloat(document.getElementById('monthly-debt').value);
            const downPayment = parseFloat(document.getElementById('down-payment').value);
            const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;

            // Debt-to-income ratio calculation
            const monthlyIncome = annualIncome / 12;
            const maxMonthlyDebt = monthlyIncome * 0.36;
            const availableForMortgage = maxMonthlyDebt - monthlyDebt;

            // Rough mortgage affordability calculation
            const loanTermYears = 30;
            const loanTermMonths = loanTermYears * 12;

            const maxMortgagePayment = availableForMortgage;
            const maxLoanAmount = maxMortgagePayment * ((1 - Math.pow(1 + interestRate, -loanTermMonths)) / interestRate);

            const resultElement = document.getElementById('mortgage-result');
            resultElement.innerHTML = `
                <h3>Mortgage Affordability</h3>
                <p>Maximum Loan Amount: $${maxLoanAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p>Recommended Monthly Mortgage Payment: $${maxMortgagePayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <small>Based on standard debt-to-income ratios</small>
            `;
        });
    }

    // Life Insurance Needs Calculator
    const lifeInsuranceCalculator = document.getElementById('life-insurance-calculator');
    if (lifeInsuranceCalculator) {
        lifeInsuranceCalculator.addEventListener('submit', function(e) {
            e.preventDefault();

            const annualIncome = parseFloat(document.getElementById('annual-income').value);
            const existingDebts = parseFloat(document.getElementById('existing-debts').value);
            const dependents = parseInt(document.getElementById('dependents').value);
            const yearsOfReplacement = parseInt(document.getElementById('years-of-replacement').value);

            // Basic life insurance needs calculation
            const incomeReplacement = annualIncome * yearsOfReplacement * dependents;
            const debtCoverage = existingDebts * 1.5; // Include additional buffer
            const futureExpenses = 50000 * dependents; // Estimated future expenses

            const recommendedCoverage = incomeReplacement + debtCoverage + futureExpenses;

            const resultElement = document.getElementById('life-insurance-result');
            resultElement.innerHTML = `
                <h3>Recommended Life Insurance Coverage</h3>
                <p>Estimated Coverage Needed: $${recommendedCoverage.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <small>Based on income replacement, debt, and future expenses</small>
            `;
        });
    }

    // Investment Growth Calculator
    const investmentCalculator = document.getElementById('investment-calculator');
    if (investmentCalculator) {
        investmentCalculator.addEventListener('submit', function(e) {
            e.preventDefault();

            const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
            const annualContribution = parseFloat(document.getElementById('annual-contribution').value);
            const yearsOfGrowth = parseInt(document.getElementById('years-of-growth').value);
            const expectedReturn = parseFloat(document.getElementById('expected-return').value) / 100;

            let futureValue = initialInvestment;
            for (let i = 0; i < yearsOfGrowth; i++) {
                futureValue = (futureValue + annualContribution) * (1 + expectedReturn);
            }

            const totalContributions = initialInvestment + (annualContribution * yearsOfGrowth);
            const totalInterest = futureValue - totalContributions;

            const resultElement = document.getElementById('investment-result');
            resultElement.innerHTML = `
                <h3>Investment Growth Projection</h3>
                <p>Future Value: $${futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p>Total Contributions: $${totalContributions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p>Total Interest Earned: $${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <small>Based on consistent annual return</small>
            `;
        });
    }
});
