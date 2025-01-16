document.addEventListener('DOMContentLoaded', function() {
    const debtForm = document.getElementById('debt-consolidation-form');
    const debtEntries = document.getElementById('debt-entries');
    const addDebtButton = document.getElementById('add-debt');
    const resultContainer = document.getElementById('debt-analysis-result');

    // Add new debt entry
    addDebtButton.addEventListener('click', function() {
        const newDebtEntry = document.createElement('div');
        newDebtEntry.className = 'debt-entry';
        newDebtEntry.innerHTML = `
            <div class="form-group">
                <label>Debt Type</label>
                <select name="debt-type" required>
                    <option value="credit-card">Credit Card</option>
                    <option value="personal-loan">Personal Loan</option>
                    <option value="student-loan">Student Loan</option>
                    <option value="medical-debt">Medical Debt</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label>Outstanding Balance</label>
                <input type="number" name="balance" required min="0" step="0.01">
            </div>
            <div class="form-group">
                <label>Interest Rate (%)</label>
                <input type="number" name="interest-rate" required min="0" max="100" step="0.1">
            </div>
            <button type="button" class="btn remove-debt">Remove</button>
        `;

        // Add remove functionality to new entry
        newDebtEntry.querySelector('.remove-debt').addEventListener('click', function() {
            debtEntries.removeChild(newDebtEntry);
        });

        debtEntries.appendChild(newDebtEntry);
    });

    // Debt Consolidation Analysis
    debtForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect debt entries
        const entries = debtEntries.querySelectorAll('.debt-entry');
        const monthlyIncome = parseFloat(document.getElementById('monthly-income').value);
        const monthlyExpenses = parseFloat(document.getElementById('monthly-expenses').value);

        let totalDebt = 0;
        let totalMonthlyInterest = 0;
        let highestInterestDebt = { type: '', rate: 0, balance: 0 };

        entries.forEach(entry => {
            const balance = parseFloat(entry.querySelector('input[name="balance"]').value);
            const interestRate = parseFloat(entry.querySelector('input[name="interest-rate"]').value);
            const debtType = entry.querySelector('select[name="debt-type"]').value;

            totalDebt += balance;
            const monthlyInterest = balance * (interestRate / 100 / 12);
            totalMonthlyInterest += monthlyInterest;

            if (interestRate > highestInterestDebt.rate) {
                highestInterestDebt = { type: debtType, rate: interestRate, balance: balance };
            }
        });

        // Calculate debt metrics
        const disposableIncome = monthlyIncome - monthlyExpenses;
        const debtToIncomeRatio = (totalDebt / monthlyIncome) * 100;
        const timeToPayOff = totalDebt / disposableIncome;

        // Consolidation recommendation
        let consolidationStrategy = '';
        if (debtToIncomeRatio > 50) {
            consolidationStrategy = 'HIGH RISK: Immediate debt consolidation recommended';
        } else if (debtToIncomeRatio > 30) {
            consolidationStrategy = 'MODERATE RISK: Consider debt consolidation or aggressive repayment plan';
        } else {
            consolidationStrategy = 'LOW RISK: Maintain current payment strategy';
        }

        // Display results
        resultContainer.innerHTML = `
            <div class="analysis-summary">
                <h2>Debt Analysis Results</h2>
                <div class="metric">
                    <h3>Total Debt</h3>
                    <p>$${totalDebt.toLocaleString()}</p>
                </div>
                <div class="metric">
                    <h3>Monthly Interest Expense</h3>
                    <p>$${totalMonthlyInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div class="metric">
                    <h3>Debt-to-Income Ratio</h3>
                    <p>${debtToIncomeRatio.toFixed(2)}%</p>
                </div>
                <div class="metric">
                    <h3>Estimated Time to Payoff</h3>
                    <p>${timeToPayOff.toFixed(1)} months</p>
                </div>
                <div class="highest-interest">
                    <h3>Highest Interest Debt</h3>
                    <p>Type: ${highestInterestDebt.type}</p>
                    <p>Balance: $${highestInterestDebt.balance.toLocaleString()}</p>
                    <p>Interest Rate: ${highestInterestDebt.rate}%</p>
                </div>
                <div class="strategy-recommendation">
                    <h3>Consolidation Strategy</h3>
                    <p>${consolidationStrategy}</p>
                </div>
                <div class="action-plan">
                    <h3>Recommended Next Steps</h3>
                    <ul>
                        <li>Consider balance transfer options</li>
                        <li>Explore debt consolidation loans</li>
                        <li>Create an aggressive repayment plan</li>
                        <li>Seek professional financial counseling</li>
                    </ul>
                    <a href="/contact.html" class="btn">Get Professional Advice</a>
                </div>
            </div>
        `;
    });
});