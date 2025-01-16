import INTEGRATIONS_CONFIG from './integrations-config.js';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submissionStatus = document.getElementById('form-submission-status');

    // Validate form inputs
    function validateForm() {
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                displayError(input, 'This field is required');
                isValid = false;
            } else {
                clearError(input);
            }

            // Email validation
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    displayError(input, 'Please enter a valid email address');
                    isValid = false;
                }
            }

            // Phone validation
            if (input.type === 'tel') {
                const phoneRegex = /^\+?\d{10,14}$/;
                if (!phoneRegex.test(input.value.replace(/[\s-()]/g, ''))) {
                    displayError(input, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
        });

        // Consent checkbox
        const consentCheckbox = document.getElementById('consent');
        if (!consentCheckbox.checked) {
            displayError(consentCheckbox, 'You must agree to be contacted');
            isValid = false;
        }

        return isValid;
    }

    // Display error message
    function displayError(input, message) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
        }
        input.classList.add('input-error');
    }

    // Clear error message
    function clearError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
        input.classList.remove('input-error');
    }

    // Verify reCAPTCHA
    async function verifyRecaptcha() {
        return new Promise((resolve, reject) => {
            grecaptcha.enterprise.ready(async () => {
                try {
                    const token = await grecaptcha.enterprise.execute('6LclxaoqAAAAAEJ6THNm0ooCQRhIJGavKJASuRAI', {action: 'contact_form'});
                    
                    // Send token to backend for verification
                    const response = await fetch('/api/verify-recaptcha', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ token })
                    });

                    const result = await response.json();
                    
                    if (result.success) {
                        document.getElementById('g-recaptcha-response').value = token;
                        resolve(token);
                    } else {
                        displayRecaptchaError('ReCAPTCHA verification failed');
                        reject(new Error('ReCAPTCHA verification failed'));
                    }
                } catch (error) {
                    displayRecaptchaError('Error verifying ReCAPTCHA');
                    reject(error);
                }
            });
        });
    }

    // Display reCAPTCHA error
    function displayRecaptchaError(message) {
        const recaptchaError = document.getElementById('recaptcha-error');
        if (recaptchaError) {
            recaptchaError.textContent = message;
        }
    }

    // Enhanced form submission handling with integrations
    async function handleSubmission(e) {
        e.preventDefault();

        // Reset previous submission status
        submissionStatus.innerHTML = '';
        submissionStatus.classList.remove('success', 'error');

        try {
            // Validate form
            if (!validateForm()) {
                return;
            }

            // Verify reCAPTCHA
            await verifyRecaptcha();

            // Prepare form data
            const formData = Object.fromEntries(new FormData(contactForm));

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

    // Event listeners
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