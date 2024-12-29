document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submissionStatus = document.getElementById('form-submission-status');

    // Validation functions
    function validateName(name) {
        return name.trim().length >= 2;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
        return phoneRegex.test(phone);
    }

    function displayError(inputElement, errorMessage) {
        const errorSpan = document.getElementById(`${inputElement.id}-error`);
        errorSpan.textContent = errorMessage;
        inputElement.setAttribute('aria-invalid', 'true');
        inputElement.classList.add('error');
    }

    function clearError(inputElement) {
        const errorSpan = document.getElementById(`${inputElement.id}-error`);
        errorSpan.textContent = '';
        inputElement.removeAttribute('aria-invalid');
        inputElement.classList.remove('error');
    }

    // Form validation
    function validateForm() {
        let isValid = true;

        // Name validation
        const nameInput = document.getElementById('name');
        if (!validateName(nameInput.value)) {
            displayError(nameInput, 'Please enter a valid name');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Email validation
        const emailInput = document.getElementById('email');
        if (!validateEmail(emailInput.value)) {
            displayError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Phone validation
        const phoneInput = document.getElementById('phone');
        if (!validatePhone(phoneInput.value)) {
            displayError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearError(phoneInput);
        }

        // Service type validation
        const serviceTypeInput = document.getElementById('service-type');
        if (serviceTypeInput.value === '') {
            displayError(serviceTypeInput, 'Please select a service');
            isValid = false;
        } else {
            clearError(serviceTypeInput);
        }

        // Message validation
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim().length < 10) {
            displayError(messageInput, 'Please provide more details in your message');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        // Consent validation
        const consentInput = document.getElementById('consent');
        if (!consentInput.checked) {
            displayError(consentInput, 'You must agree to be contacted');
            isValid = false;
        } else {
            clearError(consentInput);
        }

        return isValid;
    }

    // Form submission handling
    function handleSubmission(e) {
        e.preventDefault();

        // Reset previous submission status
        submissionStatus.innerHTML = '';
        submissionStatus.classList.remove('success', 'error');

        // Validate form
        if (validateForm()) {
            // Simulated form submission (replace with actual submission logic)
            const formData = new FormData(contactForm);
            const submissionData = Object.fromEntries(formData.entries());

            // Simulate server request
            setTimeout(() => {
                submissionStatus.textContent = 'Thank you! We will contact you soon.';
                submissionStatus.classList.add('success');
                contactForm.reset();

                // Analytics or tracking could be added here
                console.log('Form submitted:', submissionData);
            }, 1000);
        }
    }

    // Event listeners
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmission);

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateForm);
            input.addEventListener('input', () => {
                clearError(input);
            });
        });
    }
});
