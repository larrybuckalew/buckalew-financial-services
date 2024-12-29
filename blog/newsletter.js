document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            try {
                // Integration with multiple newsletter services
                const integrations = [
                    {
                        // Mailchimp webhook
                        url: 'https://your-mailchimp-webhook.com',
                        method: 'POST'
                    },
                    {
                        // Pabbly webhook
                        url: 'https://your-pabbly-webhook.com',
                        method: 'POST'
                    }
                ];

                const results = await Promise.allSettled(integrations.map(async (integration) => {
                    const response = await fetch(integration.url, {
                        method: integration.method,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email })
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to subscribe with ${integration.url}`);
                    }

                    return response;
                }));

                // Check if at least one integration was successful
                const successful = results.some(result => result.status === 'fulfilled');

                if (successful) {
                    alert('Successfully subscribed to our newsletter!');
                    newsletterForm.reset();
                } else {
                    throw new Error('Newsletter subscription failed');
                }
            } catch (error) {
                console.error('Newsletter subscription error:', error);
                alert('There was an issue subscribing. Please try again later.');
            }
        });
    }
});