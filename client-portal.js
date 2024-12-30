document.addEventListener('DOMContentLoaded', function() {
    // Login Form Elements
    const loginForm = document.getElementById('client-login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const twoFactorCheckbox = document.getElementById('two-factor');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const registerAccountLink = document.getElementById('register-account');

    // Dashboard Elements
    const dashboardSection = document.getElementById('client-dashboard');
    const clientNameDisplay = document.getElementById('client-name');
    const logoutButton = document.getElementById('logout-btn');
    const financialSummary = document.getElementById('financial-summary');
    const documentList = document.getElementById('document-list');
    const messageList = document.getElementById('message-list');
    const sendMessageForm = document.getElementById('send-message-form');
    const appointmentList = document.getElementById('appointment-list');
    const scheduleAppointmentBtn = document.getElementById('schedule-appointment');

    // Document Upload Elements
    const uploadDocumentBtn = document.getElementById('upload-document');
    const uploadDocumentModal = document.getElementById('upload-document-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const documentUploadForm = document.getElementById('document-upload-form');

    // Simulated Authentication
    function authenticateUser(username, password, twoFactor) {
        // In a real-world scenario, this would be a secure backend call
        const validCredentials = {
            username: 'client1',
            password: 'password123'
        };

        if (username === validCredentials.username && password === validCredentials.password) {
            // Simulate two-factor authentication
            if (twoFactor) {
                return promptTwoFactor();
            }
            return true;
        }
        return false;
    }

    // Two-Factor Authentication Simulation
    function promptTwoFactor() {
        const code = prompt('Enter 6-digit verification code');
        // Simulate code verification
        return code === '123456';
    }

    // Login Form Submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        const twoFactor = twoFactorCheckbox.checked;

        if (authenticateUser(username, password, twoFactor)) {
            showDashboard(username);
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });

    // Show Dashboard
    function showDashboard(username) {
        loginForm.closest('.portal-login').style.display = 'none';
        dashboardSection.style.display = 'block';
        clientNameDisplay.textContent = username;

        // Load dashboard components
        loadFinancialSummary();
        loadDocuments();
        loadMessages();
        loadAppointments();
    }

    // Logout Functionality
    logoutButton.addEventListener('click', function() {
        dashboardSection.style.display = 'none';
        loginForm.closest('.portal-login').style.display = 'block';
        // Clear inputs
        usernameInput.value = '';
        passwordInput.value = '';
    });

    // Financial Summary
    function loadFinancialSummary() {
        // Simulated financial data
        const financialData = {
            totalAssets: 250000,
            totalInvestments: 180000,
            monthlyIncome: 8500,
            netWorthChange: '+3.2%'
        };

        financialSummary.innerHTML = `
            <div class="financial-metric">
                <h3>Total Assets</h3>
                <p>$${financialData.totalAssets.toLocaleString()}</p>
            </div>
            <div class="financial-metric">
                <h3>Investments</h3>
                <p>$${financialData.totalInvestments.toLocaleString()}</p>
            </div>
            <div class="financial-metric">
                <h3>Net Worth Change</h3>
                <p class="positive">${financialData.netWorthChange}</p>
            </div>
        `;
    }

    // Document Management
    function loadDocuments() {
        // Simulated documents
        const documents = [
            { name: '2023 Tax Return.pdf', type: 'tax-return', date: '2024-01-15' },
            { name: 'Investment Statement Q4 2023.pdf', type: 'investment-statement', date: '2024-01-10' }
        ];

        documentList.innerHTML = documents.map(doc => `
            <div class="document-item">
                <span class="document-name">${doc.name}</span>
                <span class="document-type">${doc.type}</span>
                <span class="document-date">${doc.date}</span>
                <button class="btn download-btn">Download</button>
            </div>
        `).join('');
    }

    // Document Upload
    uploadDocumentBtn.addEventListener('click', function() {
        uploadDocumentModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', function() {
        uploadDocumentModal.style.display = 'none';
    });

    documentUploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const documentType = document.getElementById('document-type').value;
        const documentFile = document.getElementById('document-file').files[0];

        if (documentType && documentFile) {
            // Simulate document upload
            alert('Document uploaded successfully!');
            uploadDocumentModal.style.display = 'none';
            loadDocuments(); // Refresh document list
        } else {
            alert('Please select a document type and file.');
        }
    });

    // Messaging System
    function loadMessages() {
        // Simulated messages
        const messages = [
            { sender: 'Financial Advisor', message: 'Your quarterly review is ready.', date: '2024-02-01' },
            { sender: 'System', message: 'Your tax documents are now available.', date: '2024-01-15' }
        ];

        messageList.innerHTML = messages.map(msg => `
            <div class="message-item">
                <strong>${msg.sender}</strong>
                <p>${msg.message}</p>
                <small>${msg.date}</small>
            </div>
        `).join('');
    }

    // Send Message
    sendMessageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const messageContent = document.getElementById('message-content').value;

        if (messageContent.trim()) {
            // Simulate sending message
            alert('Message sent to your financial advisor.');
            this.reset();
            loadMessages(); // Refresh messages
        }
    });

    // Appointments
    function loadAppointments() {
        // Simulated appointments
        const appointments = [
            { type: 'Quarterly Review', date: '2024-03-15', time: '10:00 AM' },
            { type: 'Tax Planning', date: '2024-02-20', time: '2:00 PM' }
        ];

        appointmentList.innerHTML = appointments.map(appt => `
            <div class="appointment-item">
                <h4>${appt.type}</h4>
                <p>${appt.date} at ${appt.time}</p>
                <button class="btn">Reschedule</button>
            </div>
        `).join('');
    }

    // Schedule Appointment
    scheduleAppointmentBtn.addEventListener('click', function() {
        window.location.href = '/consultation-booking.html';
    });

    // Forgot Password
    forgotPasswordLink.addEventListener('click', function() {
        // Implement password reset logic
        alert('Password reset link sent to your registered email.');
    });

    // Create Account
    registerAccountLink.addEventListener('click', function() {
        window.location.href = '/register.html';
    });
});