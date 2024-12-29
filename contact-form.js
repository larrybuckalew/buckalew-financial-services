import INTEGRATIONS_CONFIG from './integrations-config.js';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submissionStatus = document.getElementById('form-submission-status');

    // Previous validation functions remain the same...

    // Enhanced form submission handling with integrations
    async function handleSubmission(e) {
        e.preventDefault();

        // Reset previous submission status
        submissionStatus.innerHTML = '';
        submissionStatus.classList.remove('success', 'error');

        // Validate form
        if (validateForm()) {
            // Prepare form data
            const formData = Object.fromEntries(new FormData(contactForm));

            try {
                // Show loading state
                submissionStatus.textContent = 'Submitting... Please wait.';
                submissionStatus.classList.add('loading');

                // Process integrations
                const integrationResults = await INTEGRATIONS_CONFIG.processIntegrations(formData);

                // Check integration results
                const allIntegrationsSuccessful = Object.values(integrationResults).every(result => result);

                if (allIntegrationsSuccessful) {
                    submissionStatus.textContent = 'Thank you! We will contact you soon.';
                    submissionStatus.classList.add('success');
                    contactForm.reset();

                    // Optional: Send to your own backend
                    await sendToBackend(formData);
                } else {
                    // Log which integrations failed
                    const failedIntegrations = Object.entries(integrationResults)
                        .filter(([, success]) => !success)
                        .map(([key]) => key);

                    submissionStatus.textContent = `Submission partially successful. Failed integrations: ${failedIntegrations.join(', ')}`;
                    submissionStatus.classList.add('warning');
                }
            } catch (error) {
                console.error('Submission error:', error);
                submissionStatus.textContent = 'An error occurred. Please try again.';
                submissionStatus.classList.add('error');
            } finally {
                // Remove loading state
                submissionStatus.classList.remove('loading');
            }
        }
    }

    // Optional: Send to your own backend
    async function sendToBackend(formData) {
        try {
            const response = await fetch('/api/submit-lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Backend submission failed');
            }
        } catch (error) {
            console.error('Backend submission error:', error);
        }
    }

    // Event listeners (existing code remains the same)
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmission);

        // Real-time validation listeners
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateForm);
            input.addEventListener('input', () => {
                clearError(input);
            });
        });
    }
});
