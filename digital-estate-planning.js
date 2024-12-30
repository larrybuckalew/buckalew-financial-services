document.addEventListener('DOMContentLoaded', function() {
    // Previous code remains the same...

    // Estate Value Calculator
    function calculateEstateValue() {
        const totalFinancialValue = digitalAssets.financialAccounts.reduce((total, account) => {
            // In a real-world scenario, this would fetch actual account balances
            const estimatedValue = account.type === 'bank' ? 50000 : 100000;
            return total + estimatedValue;
        }, 0);

        const digitalAccountValue = digitalAssets.digitalAccounts.reduce((total, account) => {
            // Estimated value for digital assets (e.g., cryptocurrencies, online businesses)
            const estimatedValue = account.type === 'digital' ? 25000 : 0;
            return total + estimatedValue;
        }, 0);

        const otherAssets = 250000; // Estimated value of physical assets

        const totalEstateValue = totalFinancialValue + digitalAccountValue + otherAssets;

        // Display estate value breakdown
        const estateValueModal = createModal({
            title: 'Estate Value Breakdown',
            content: `
                <div class="estate-value-breakdown">
                    <div class="value-item">
                        <h4>Financial Accounts</h4>
                        <p>$${totalFinancialValue.toLocaleString()}</p>
                    </div>
                    <div class="value-item">
                        <h4>Digital Assets</h4>
                        <p>$${digitalAccountValue.toLocaleString()}</p>
                    </div>
                    <div class="value-item">
                        <h4>Other Physical Assets</h4>
                        <p>$${otherAssets.toLocaleString()}</p>
                    </div>
                    <div class="value-item total">
                        <h3>Total Estate Value</h3>
                        <p>$${totalEstateValue.toLocaleString()}</p>
                    </div>
                </div>
            `
        });

        document.body.appendChild(estateValueModal);
    }

    // Tax Liability Estimator
    function estimateTaxLiability() {
        // 2024 Federal Estate Tax Exemption
        const federalEstateExemption = 13610000; // Updated for 2024

        const totalEstateValue = digitalAssets.financialAccounts.reduce((total, account) => {
            const estimatedValue = account.type === 'bank' ? 50000 : 100000;
            return total + estimatedValue;
        }, 0) + 250000; // Adding other assets

        let estimatedTaxLiability = 0;
        const taxRates = [
            { min: 0, max: 10000000, rate: 0.18 },
            { min: 10000001, max: 15000000, rate: 0.20 },
            { min: 15000001, max: 20000000, rate: 0.22 },
            { min: 20000001, rate: 0.24 }
        ];

        // Calculate tax liability
        if (totalEstateValue > federalEstateExemption) {
            const taxableAmount = totalEstateValue - federalEstateExemption;
            
            for (let bracket of taxRates) {
                if (bracket.max === undefined || taxableAmount <= bracket.max) {
                    estimatedTaxLiability += taxableAmount * bracket.rate;
                    break;
                } else {
                    const bracketAmount = bracket.max - (bracket.min || 0);
                    estimatedTaxLiability += bracketAmount * bracket.rate;
                    taxableAmount -= bracketAmount;
                }
            }
        }

        // Display tax liability modal
        const taxLiabilityModal = createModal({
            title: 'Estimated Estate Tax Liability',
            content: `
                <div class="tax-liability-breakdown">
                    <div class="tax-item">
                        <h4>Total Estate Value</h4>
                        <p>$${totalEstateValue.toLocaleString()}</p>
                    </div>
                    <div class="tax-item">
                        <h4>Federal Estate Tax Exemption</h4>
                        <p>$${federalEstateExemption.toLocaleString()}</p>
                    </div>
                    <div class="tax-item">
                        <h4>Taxable Estate Amount</h4>
                        <p>$${Math.max(totalEstateValue - federalEstateExemption, 0).toLocaleString()}</p>
                    </div>
                    <div class="tax-item total">
                        <h3>Estimated Tax Liability</h3>
                        <p>$${estimatedTaxLiability.toLocaleString()}</p>
                    </div>
                    <div class="tax-disclaimer">
                        <p>Note: This is a simplified estimation. Consult a tax professional for accurate advice.</p>
                    </div>
                </div>
            `
        });

        document.body.appendChild(taxLiabilityModal);
    }

    // Utility Function to Create Modal
    function createModal({ title, content }) {
        const modal = document.createElement('div');
        modal.className = 'modal estate-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        return modal;
    }

    // Event Listeners
    addFinancialAccountBtn.addEventListener('click', () => openAddAccountModal('bank'));
    addDigitalAccountBtn.addEventListener('click', () => openAddAccountModal('digital'));
    uploadDocumentBtn.addEventListener('click', uploadDocument);
    addBeneficiaryBtn.addEventListener('click', addBeneficiary);
    closeModalBtn.addEventListener('click', closeModal);
    addAccountForm.addEventListener('submit', addAccount);
    legacyInstructionsForm.addEventListener('submit', saveLegacyInstructions);

    // Estate Planning Tools
    calculateEstateValueBtn.addEventListener('click', calculateEstateValue);
    estimateTaxLiabilityBtn.addEventListener('click', estimateTaxLiability);

    // Initialize
    loadDigitalAssets();
});
