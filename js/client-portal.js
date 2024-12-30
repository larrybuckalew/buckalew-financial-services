// Client Portal Module
class ClientPortal {
    constructor() {
        this.currentUser = null;
        this.initializePortal();
        this.setupAuthentication();
        this.setupDashboard();
        this.setupDocumentManager();
        this.setupMessaging();
        this.setupAppointments();
    }

    initializePortal() {
        const portalContainer = document.getElementById('client-portal');
        if (!portalContainer) return;

        portalContainer.innerHTML = `
            <div class="portal-wrapper">
                <nav class="portal-nav">
                    <div class="portal-logo">
                        <img src="/images/logo.png" alt="Buckalew Financial Services">
                    </div>
                    <ul class="portal-menu">
                        <li><a href="#dashboard" class="active">Dashboard</a></li>
                        <li><a href="#documents">Documents</a></li>
                        <li><a href="#messages">Messages</a></li>
                        <li><a href="#appointments">Appointments</a></li>
                        <li><a href="#profile">Profile</a></li>
                    </ul>
                </nav>

                <main class="portal-content">
                    <div id="portal-header">
                        <div class="user-welcome">
                            <h2>Welcome Back, <span id="user-name">Client</span></h2>
                            <p class="last-login">Last login: <span id="last-login-time"></span></p>
                        </div>
                        <div class="quick-actions">
                            <button class="btn btn-primary" id="schedule-call">Schedule Call</button>
                            <button class="btn btn-secondary" id="upload-document">Upload Document</button>
                        </div>
                    </div>

                    <div id="portal-views">
                        <div id="dashboard-view" class="portal-view active"></div>
                        <div id="documents-view" class="portal-view"></div>
                        <div id="messages-view" class="portal-view"></div>
                        <div id="appointments-view" class="portal-view"></div>
                        <div id="profile-view" class="portal-view"></div>
                    </div>
                </main>
            </div>
        `;
    }

    setupAuthentication() {
        // Simulated authentication check
        const isAuthenticated = localStorage.getItem('clientPortalAuth');
        
        if (!isAuthenticated) {
            this.showLoginForm();
        } else {
            this.loadUserData();
        }
    }

    showLoginForm() {
        const portalContent = document.querySelector('.portal-content');
        if (!portalContent) return;

        portalContent.innerHTML = `
            <div class="auth-container">
                <form id="login-form" class="auth-form">
                    <h2>Client Portal Login</h2>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Log In</button>
                        <a href="#" class="forgot-password">Forgot Password?</a>
                    </div>
                </form>
            </div>
        `;

        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(loginForm);
        });
    }

    async handleLogin(form) {
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Store authentication
            localStorage.setItem('clientPortalAuth', 'true');
            localStorage.setItem('clientEmail', email);

            // Load dashboard
            this.loadUserData();
            this.initializePortal();
        } catch (error) {
            this.showError('Login failed. Please check your credentials.');
        }
    }

    loadUserData() {
        // Simulate loading user data
        this.currentUser = {
            name: 'John Doe',
            email: localStorage.getItem('clientEmail'),
            lastLogin: new Date().toLocaleString(),
            policies: [
                { type: 'Life Insurance', number: 'LI-1234', status: 'Active' },
                { type: 'Medicare Supplement', number: 'MS-5678', status: 'Active' }
            ],
            documents: [
                { name: 'Policy Document.pdf', date: '2024-03-15' },
                { name: 'Annual Statement.pdf', date: '2024-02-28' }
            ],
            messages: [
                { subject: 'Policy Update', date: '2024-03-10', unread: true },
                { subject: 'Appointment Confirmation', date: '2024-03-05', unread: false }
            ]
        };

        this.updateDashboard();
    }

    setupDashboard() {
        const dashboardView = document.getElementById('dashboard-view');
        if (!dashboardView) return;

        dashboardView.innerHTML = `
            <div class="dashboard-grid">
                <div class="dashboard-widget">
                    <h3>Your Policies</h3>
                    <div id="policies-list" class="widget-content"></div>
                </div>

                <div class="dashboard-widget">
                    <h3>Recent Documents</h3>
                    <div id="recent-documents" class="widget-content"></div>
                </div>

                <div class="dashboard-widget">
                    <h3>Messages</h3>
                    <div id="recent-messages" class="widget-content"></div>
                </div>

                <div class="dashboard-widget">
                    <h3>Upcoming Appointments</h3>
                    <div id="upcoming-appointments" class="widget-content"></div>
                </div>
            </div>
        `;
    }

    updateDashboard() {
        if (!this.currentUser) return;

        // Update user name and last login
        const userNameElement = document.getElementById('user-name');
        const lastLoginElement = document.getElementById('last-login-time');
        if (userNameElement) userNameElement.textContent = this.currentUser.name;
        if (lastLoginElement) lastLoginElement.textContent = this.currentUser.lastLogin;

        // Update policies list
        const policiesList = document.getElementById('policies-list');
        if (policiesList) {
            policiesList.innerHTML = this.currentUser.policies.map(policy => `
                <div class="policy-item">
                    <h4>${policy.type}</h4>
                    <p>Policy #: ${policy.number}</p>
                    <span class="status ${policy.status.toLowerCase()}">${policy.status}</span>
                </div>
            `).join('');
        }

        // Update recent documents
        const recentDocuments = document.getElementById('recent-documents');
        if (recentDocuments) {
            recentDocuments.innerHTML = this.currentUser.documents.map(doc => `
                <div class="document-item">
                    <i class="document-icon">📄</i>
                    <div class="document-info">
                        <span class="document-name">${doc.name}</span>
                        <span class="document-date">${doc.date}</span>
                    </div>
                </div>
            `).join('');
        }

        // Update messages
        const recentMessages = document.getElementById('recent-messages');
        if (recentMessages) {
            recentMessages.innerHTML = this.currentUser.messages.map(message => `
                <div class="message-item ${message.unread ? 'unread' : ''}">
                    <div class="message-content">
                        <span class="message-subject">${message.subject}</span>
                        <span class="message-date">${message.date}</span>
                    </div>
                    ${message.unread ? '<span class="unread-badge">New</span>' : ''}
                </div>
            `).join('');
        }
    }

    setupDocumentManager() {
        const documentsView = document.getElementById('documents-view');
        if (!documentsView) return;

        documentsView.innerHTML = `
            <div class="documents-manager">
                <div class="documents-header">
                    <h2>Document Manager</h2>
                    <button class="btn btn-primary" id="upload-new-doc">
                        Upload New Document
                    </button>
                </div>

                <div class="documents-grid">
                    <div class="documents-sidebar">
                        <h3>Categories</h3>
                        <ul class="document-categories">
                            <li class="active">All Documents</li>
                            <li>Policies</li>
                            <li>Statements</li>
                            <li>Claims</li>
                            <li>Other</li>
                        </ul>
                    </div>

                    <div class="documents-list">
                        <div class="documents-toolbar">
                            <input type="text" placeholder="Search documents..." id="doc-search">
                            <select id="doc-sort">
                                <option value="date">Sort by Date</option>
                                <option value="name">Sort by Name</option>
                                <option value="type">Sort by Type</option>
                            </select>
                        </div>

                        <div id="documents-container"></div>
                    </div>
                </div>
            </div>
        `;

        // Initialize document list
        this.loadDocuments();
    }

    loadDocuments() {
        const documentsContainer = document.getElementById('documents-container');
        if (!documentsContainer || !this.currentUser) return;

        documentsContainer.innerHTML = this.currentUser.documents.map(doc => `
            <div class="document-card">
                <div class="document-icon">📄</div>
                <div class="document-info">
                    <h4>${doc.name}</h4>
                    <p>Added: ${doc.date}</p>
                </div>
                <div class="document-actions">
                    <button class="btn btn-small">View</button>
                    <button class="btn btn-small">Download</button>
                </div>
            </div>
        `).join('');
    }

    setupMessaging() {
        const messagesView = document.getElementById('messages-view');
        if (!messagesView) return;

        messagesView.innerHTML = `
            <div class="messaging-system">
                <div class="messages-header">
                    <h2>Messages</h2>
                    <button class="btn btn-primary" id="new-message">
                        New Message
                    </button>
                </div>

                <div class="messages-container">
                    <div class="messages-list" id="messages-list"></div>
                    <div class="message-content" id="message-content"></div>
                </div>
            </div>
        `;

        // Initialize messages
        this.loadMessages();
    }

    loadMessages() {
        const messagesList = document.getElementById('messages-list');
        if (!messagesList || !this.currentUser) return;

        messagesList.innerHTML = this.currentUser.messages.map(message => `
            <div class="message-item ${message.unread ? 'unread' : ''}">
                <div class="message-header">
                    <h4>${message.subject}</h4>
                    <span class="message-date">${message.date}</span>
                </div>
                <p class="message-preview">Click to view message content...</p>
            </div>
        `).join('');
    }

    setupAppointments() {
        const appointmentsView = document.getElementById('appointments-view');
        if (!appointmentsView) return;

        appointmentsView.innerHTML = `
            <div class="appointments-manager">
                <div class="appointments-header">
                    <h2>Appointments</h2>
                    <button class="btn btn-primary" id="schedule-appointment">
                        Schedule New Appointment
                    </button>
                </div>

                <div class="appointments-calendar" id="appointments-calendar"></div>
                
                <div class="upcoming-appointments">
                    <h3>Upcoming Appointments</h3>
                    <div id="appointments-list"></div>
                </div>
            </div>
        `;

        // Initialize calendar and appointments
        this.initializeCalendar();
        this.loadAppointments();
    }

    initializeCalendar() {
        // Calendar initialization code would go here
        // This would typically use a calendar library
    }

    loadAppointments() {
        // Load and display appointments
        const appointmentsList = document.getElementById('appointments-list');
        if (!appointmentsList) return;

        // Simulate appointments data
        const appointments = [
            { date: '2024-03-20', time: '10:00 AM', type: 'Annual Review' },
            { date: '2024-04-05', time: '2:30 PM', type: 'Policy Discussion' }
        ];

        appointmentsList.innerHTML = appointments.map(apt => `
            <div class="appointment-card">
                <div class="appointment-info">
                    <h4>${apt.type}</h4>
                    <p>${apt.date} at ${apt.time}</p>
                </div>
                <div class="appointment-actions">
                    <button class="btn btn-small">Reschedule</button>
                    <button class="btn btn-small btn-danger">Cancel</button>
                </div>
            </div>
        `).join('');
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-error';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.auth-container');
        if (container) {
            container.insertBefore(errorDiv, container.firstChild);
            setTimeout(() => errorDiv.remove(), 5000);
        }
    }
}

// Initialize Client Portal
document.addEventListener('DOMContentLoaded', () => {
    new ClientPortal();
});