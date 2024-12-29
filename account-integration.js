document.addEventListener('DOMContentLoaded', function() {
    const institutionModal = document.getElementById('institution-modal');
    const institutionList = document.getElementById('institution-list');
    const connectButtons = document.querySelectorAll('.connect-btn');
    const connectedAccountsList = document.getElementById('connected-accounts-list');

    // Predefined list of financial institutions
    const financialInstitutions = [
        { name: 'Chase Bank', type: 'bank', logo: '/images/chase-logo.png' },
        { name: 'Bank of America', type: 'bank', logo: '/images/bofa-logo.png' },
        { name: 'Wells Fargo', type: 'bank', logo: '/images/wells-logo.png' },
        { name: 'Fidelity Investments', type: 'investment', logo: '/images/fidelity-logo.png' },
        { name: 'Vanguard', type: 'investment', logo: '/images/vanguard-logo.png' },
        { name: 'Charles Schwab', type: 'investment', logo: '/images/schwab-logo.png' },
        { name: 'American Express', type: 'credit', logo: '/images/amex-logo.png' },
        { name: 'Visa', type: 'credit', logo: '/images/visa-logo.png' },
        { name: 'Mastercard', type: 'credit', logo: '/images/mastercard-logo.png' }
    ];

    // Simulated connected accounts (would typically come from backend)
    let connectedAccounts = [];

    // Open Institution Modal
    function openInstitutionModal(accountType) {
        // Filter institutions by type
        const filteredInstitutions = financialInstitutions.filter(inst => inst.type === accountType);

        // Populate institution list
        institutionList.innerHTML = filteredInstitutions.map(inst => `
            <div class="institution-item" data-name="${inst.name}">
                <img src="${inst.logo}" alt="${inst.name}">
                <span>${inst.name}</span>
            </div>
        `).join('');

        // Add click event to institution items
        institutionList.querySelectorAll('.institution-item').forEach(item => {
            item.addEventListener('click', () => initiateConnection(item.dataset.name, accountType));
        });

        // Show modal
        institutionModal.style.display = 'block';
    }

    // Close Institution Modal
    function closeInstitutionModal() {
        institutionModal.style.display = 'none';
    }

    // Initiate Account Connection
    function initiateConnection(institutionName, accountType) {
        // Simulate connection process
        const newAccount = {
            id: Date.now(),
            institution: institutionName,
            type: accountType,
            lastSync: new Date().toLocaleString()
        };

        // Add to connected accounts
        connectedAccounts.push(newAccount);
        updateConnectedAccountsList();

        // Close modal
        closeInstitutionModal();

        // Show success notification
        showNotification(`Successfully connected ${institutionName} ${accountType} account`);
    }

    // Update Connected Accounts List
    function updateConnectedAccountsList() {
        if (connectedAccounts.length === 0) {
            connectedAccountsList.innerHTML = '<p>No accounts connected yet</p>';
            return;
        }

        connectedAccountsList.innerHTML = connectedAccounts.map(account => `
            <div class="account-card">
                <div class="account-details">
                    <h3>${account.institution}</h3>
                    <p>Type: ${account.type}</p>
                    <small>Last Sync: ${account.lastSync}</small>
                </div>
                <div class="account-actions">
                    <button class="btn sync-btn" data-id="${account.id}">Sync Now</button>
                    <button class="btn remove-btn" data-id="${account.id}">Remove</button>
                </div>
            </div>
        `).join('');

        // Add event listeners for sync and remove buttons
        connectedAccountsList.querySelectorAll('.sync-btn').forEach(btn => {
            btn.addEventListener('click', () => syncAccount(btn.dataset.id));
        });

        connectedAccountsList.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => removeAccount(btn.dataset.id));
        });
    }

    // Sync Account
    function syncAccount(accountId) {
        const account = connectedAccounts.find(acc => acc.id === parseInt(accountId));
        if (account) {
            account.lastSync = new Date().toLocaleString();
            updateConnectedAccountsList();
            showNotification(`Synced ${account.institution} account`);
        }
    }

    // Remove Account
    function removeAccount(accountId) {
        connectedAccounts = connectedAccounts.filter(acc => acc.id !== parseInt(accountId));
        updateConnectedAccountsList();
        showNotification('Account removed');
    }

    // Show Notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    // Event Listeners
    connectButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const accountType = btn.closest('.institution-card').dataset.institution;
            openInstitutionModal(accountType);
        });
    });

    // Close modal event
    document.querySelector('.close-modal').addEventListener('click', closeInstitutionModal);

    // Initial load of connected accounts
    updateConnectedAccountsList();
});