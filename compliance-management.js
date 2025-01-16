document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const complianceStatus = document.getElementById('compliance-status');
    const complianceDetails = document.getElementById('compliance-details');
    const regulatoryUpdates = document.getElementById('regulatory-updates');
    const reportGenerationForm = document.getElementById('report-generation-form');
    const documentLibrary = document.getElementById('document-library');
    const uploadComplianceDocBtn = document.getElementById('upload-compliance-doc');
    const uploadDocumentModal = document.getElementById('upload-document-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const trainingModules = document.getElementById('training-modules');
    const certificationStatus = document.getElementById('certification-status');
    const auditLog = document.getElementById('audit-log');

    // Compliance Status Management
    function updateComplianceStatus() {
        // Simulated compliance status
        const complianceData = {
            status: 'Fully Compliant',
            riskLevel: 'Low',
            lastAuditDate: '2024-01-15',
            pendingActions: 0
        };

        complianceStatus.innerHTML = `
            <div class="status-badge ${complianceData.status.toLowerCase().replace(' ', '-')}">
                ${complianceData.status}
            </div>
        `;

        complianceDetails.innerHTML = `
            <p><strong>Risk Level:</strong> ${complianceData.riskLevel}</p>
            <p><strong>Last Audit:</strong> ${complianceData.lastAuditDate}</p>
            <p><strong>Pending Actions:</strong> ${complianceData.pendingActions}</p>
        `;
    }

    // Regulatory Updates
    function loadRegulatoryUpdates() {
        const updates = [
            {
                title: 'SEC Disclosure Rule Update',
                date: '2024-02-01',
                summary: 'New guidelines for financial service disclosures'
            },
            {
                title: 'GDPR Compliance Reminder',
                date: '2024-01-15',
                summary: 'Ongoing data protection requirements'
            }
        ];

        regulatoryUpdates.innerHTML = updates.map(update => `
            <div class="update-item">
                <h4>${update.title}</h4>
                <p>${update.summary}</p>
                <small>${update.date}</small>
            </div>
        `).join('');
    }

    // Compliance Risk Chart
    function createComplianceRiskChart() {
        const ctx = document.getElementById('compliance-risk-chart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Data Privacy', 'Financial Reporting', 'Client Disclosure', 'Risk Management', 'Ethical Standards'],
                datasets: [{
                    label: 'Compliance Risk Assessment',
                    data: [0.8, 0.9, 0.7, 0.85, 0.95],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)'
                }]
            },
            options: {
                responsive: true,
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 1
                    }
                }
            }
        });
    }

    // Report Generation
    function generateComplianceReport(event) {
        event.preventDefault();
        const reportType = document.getElementById('report-type').value;
        const reportingPeriod = document.getElementById('reporting-period').value;

        // Simulate report generation
        const reportData = {
            type: reportType,
            period: reportingPeriod,
            generatedAt: new Date().toISOString()
        };

        // In a real-world scenario, this would call a backend service
        alert(`Generated ${reportType} report for ${reportingPeriod}`);
        console.log('Report Generation Data:', reportData);
    }

    // Document Library
    function loadDocumentLibrary() {
        const documents = [
            {
                name: 'Annual Compliance Policy 2024',
                type: 'Policy Document',
                uploadDate: '2024-01-10'
            },
            {
                name: 'Risk Management Procedure Manual',
                type: 'Procedure Manual',
                uploadDate: '2024-02-05'
            }
        ];

        documentLibrary.innerHTML = documents.map(doc => `
            <div class="document-item">
                <h4>${doc.name}</h4>
                <p>Type: ${doc.type}</p>
                <small>Uploaded: ${doc.uploadDate}</small>
                <button class="btn">Download</button>
            </div>
        `).join('');
    }

    // Training Modules
    function loadTrainingModules() {
        const modules = [
            {
                title: 'Annual Compliance Refresher',
                status: 'Completed',
                completionDate: '2024-01-20'
            },
            {
                title: 'Data Privacy and Security',
                status: 'Pending',
                completionDate: null
            }
        ];

        trainingModules.innerHTML = modules.map(module => `
            <div class="module-item ${module.status.toLowerCase()}">
                <h4>${module.title}</h4>
                <p>Status: ${module.status}</p>
                ${module.completionDate ? `<small>Completed: ${module.completionDate}</small>` : ''}
            </div>
        `).join('');
    }

    // Certification Status
    function loadCertificationStatus() {
        const certifications = [
            {
                name: 'Certified Compliance Professional',
                status: 'Active',
                expirationDate: '2025-06-30'
            },
            {
                name: 'Financial Risk Manager',
                status: 'Expiring Soon',
                expirationDate: '2024-12-31'
            }
        ];

        certificationStatus.innerHTML = certifications.map(cert => `
            <div class="certification-item ${cert.status.toLowerCase().replace(' ', '-')}">
                <h4>${cert.name}</h4>
                <p>Status: ${cert.status}</p>
                <small>Expires: ${cert.expirationDate}</small>
            </div>
        `).join('');
    }

    // Audit Log
    function loadAuditLog() {
        const auditEntries = [
            {
                action: 'Compliance Report Generated',
                user: 'John Doe',
                timestamp: '2024-02-10 14:30:00'
            },
            {
                action: 'Document Uploaded',
                user: 'Jane Smith',
                timestamp: '2024-02-05 09:45:00'
            }
        ];

        auditLog.innerHTML = auditEntries.map(entry => `
            <div class="audit-entry">
                <p>${entry.action}</p>
                <small>User: ${entry.user} | ${entry.timestamp}</small>
            </div>
        `).join('');
    }

    // Document Upload Modal
    uploadComplianceDocBtn.addEventListener('click', () => {
        uploadDocumentModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        uploadDocumentModal.style.display = 'none';
    });

    // Initialize Components
    function initializeComplianceManagement() {
        updateComplianceStatus();
        loadRegulatoryUpdates();
        createComplianceRiskChart();
        loadDocumentLibrary();
        loadTrainingModules();
        loadCertificationStatus();
        loadAuditLog();
    }

    // Event Listeners
    reportGenerationForm.addEventListener('submit', generateComplianceReport);

    // Initialize on page load
    initializeComplianceManagement();
});