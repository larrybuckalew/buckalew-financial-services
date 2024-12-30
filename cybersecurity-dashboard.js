document.addEventListener('DOMContentLoaded', function() {
    // Previous code remains the same...

    // Password Reset
    function initiatePasswordReset() {
        const resetMethod = confirm('Would you like to reset your password via email?');
        
        if (resetMethod) {
            // Simulate password reset process
            const resetToken = Math.random().toString(36).substring(2, 10).toUpperCase();
            
            alert(`A password reset link has been sent to your registered email. 
Reset Token: ${resetToken}`);

            // Update last password change in data
            cybersecurityData.accountProtection.lastPasswordChange = new Date().toISOString().split('T')[0];
            renderAccountProtection();
        }
    }

    // Lock Account
    function lockAccount() {
        const confirmLock = confirm('Are you sure you want to lock your account? This will prevent all access until you contact support.');
        
        if (confirmLock) {
            // Simulate account locking
            alert('Your account has been locked. Please contact customer support to unlock.');

            // Update security events
            cybersecurityData.securityEvents.unshift({
                timestamp: new Date().toISOString(),
                type: 'Account Locked',
                status: 'Manual Lock'
            });

            renderSecurityEvents();
        }
    }

    // Report Security Incident
    function reportSecurityIncident() {
        // Create a detailed incident report modal
        const incidentModal = document.createElement('div');
        incidentModal.className = 'modal incident-report-modal';
        incidentModal.innerHTML = `
            <div class="modal-content">
                <h2>Report Security Incident</h2>
                <form id="incident-report-form">
                    <div class="form-group">
                        <label>Incident Type</label>
                        <select required>
                            <option value="">Select Incident Type</option>
                            <option value="unauthorized-access">Unauthorized Access</option>
                            <option value="suspicious-activity">Suspicious Activity</option>
                            <option value="data-breach">Potential Data Breach</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Incident Description</label>
                        <textarea required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Additional Evidence (optional)</label>
                        <input type="file" multiple>
                    </div>
                    <button type="submit" class="btn">Submit Incident Report</button>
                </form>
                <button class="btn close-modal">Close</button>
            </div>
        `;

        // Add event listeners to the modal
        const form = incidentModal.querySelector('#incident-report-form');
        const closeBtn = incidentModal.querySelector('.close-modal');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const incidentType = form.querySelector('select').value;
            const description = form.querySelector('textarea').value;

            // Simulate incident reporting
            alert('Incident report submitted. Our security team will investigate.');

            // Add to security events
            cybersecurityData.securityEvents.unshift({
                timestamp: new Date().toISOString(),
                type: `Incident Report: ${incidentType}`,
                status: 'Pending Investigation'
            });

            renderSecurityEvents();
            document.body.removeChild(incidentModal);
        });

        closeBtn.addEventListener('click', () => {
            document.body.removeChild(incidentModal);
        });

        // Add modal to the body
        document.body.appendChild(incidentModal);
    }

    // Manage Connected Devices
    function manageDevices() {
        const devicesModal = document.createElement('div');
        devicesModal.className = 'modal devices-management-modal';
        devicesModal.innerHTML = `
            <div class="modal-content">
                <h2>Connected Devices</h2>
                <div class="devices-list">
                    ${cybersecurityData.accountProtection.connectedDevices.map(device => `
                        <div class="device-item">
                            <p>${device.type}</p>
                            <small>Last Access: ${device.lastAccess}</small>
                            <button class="btn revoke-access">Revoke Access</button>
                        </div>
                    `).join('')}
                </div>
                <button class="btn close-modal">Close</button>
            </div>
        `;

        // Add event listeners
        const revokeButtons = devicesModal.querySelectorAll('.revoke-access');
        const closeBtn = devicesModal.querySelector('.close-modal');

        revokeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const deviceType = this.closest('.device-item').querySelector('p').textContent;
                
                // Remove device from connected devices
                cybersecurityData.accountProtection.connectedDevices = 
                    cybersecurityData.accountProtection.connectedDevices.filter(device => device.type !== deviceType);

                // Update security events
                cybersecurityData.securityEvents.unshift({
                    timestamp: new Date().toISOString(),
                    type: `Device Revoked: ${deviceType}`,
                    status: 'Access Removed'
                });

                // Re-render devices and events
                renderConnectedDevices();
                renderSecurityEvents();

                // Remove device from modal
                this.closest('.device-item').remove();
            });
        });

        closeBtn.addEventListener('click', () => {
            document.body.removeChild(devicesModal);
        });

        // Add modal to the body
        document.body.appendChild(devicesModal);
    }

    // Event Listeners
    configure2FABtn.addEventListener('click', configureTwoFactor);
    manageDevicesBtn.addEventListener('click', manageDevices);
    passwordResetBtn.addEventListener('click', initiatePasswordReset);
    lockAccountBtn.addEventListener('click', lockAccount);
    reportIncidentBtn.addEventListener('click', reportSecurityIncident);

    // Initialize Dashboard
    initializeCybersecurityDashboard();
});