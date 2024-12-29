// Integrations Configuration
const INTEGRATIONS_CONFIG = {
    // Webhook Endpoints for Various Platforms
    webhooks: {
        // Pabbly Connect Webhook
        pabblyConnect: {
            url: 'https://connect.pabbly.com/webhook/your-unique-webhook-id',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        // Zapier Webhook
        zapier: {
            url: 'https://hooks.zapier.com/hooks/catch/your-unique-webhook-url',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        // Make (Integromat) Webhook
        make: {
            url: 'https://hook.make.com/your-unique-webhook-url',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        // Slack Webhook
        slack: {
            url: 'https://hooks.slack.com/services/your-slack-webhook-url',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    },

    // Integration Methods
    async sendToWebhook(webhookKey, data) {
        const webhook = this.webhooks[webhookKey];
        if (!webhook) {
            console.error(`Webhook ${webhookKey} not configured`);
            return false;
        }

        try {
            const response = await fetch(webhook.url, {
                method: webhook.method,
                headers: webhook.headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Webhook ${webhookKey} response not OK`);
            }

            return true;
        } catch (error) {
            console.error(`Webhook ${webhookKey} error:`, error);
            return false;
        }
    },

    // Transform form data for different platforms
    transformData(formData, platform) {
        switch(platform) {
            case 'slack':
                return {
                    text: `New Contact Form Submission from ${formData.name}`,
                    blocks: [
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: `*New Contact Submission*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service:* ${formData.serviceType}
*Message:* ${formData.message}`
                            }
                        }
                    ]
                };
            case 'pabblyConnect':
                return {
                    source: 'Buckalew Financial Website',
                    leadData: formData
                };
            default:
                return formData;
        }
    },

    // Main integration method
    async processIntegrations(formData) {
        const integrationResults = {};

        // Send to each configured webhook
        for (const [key, webhook] of Object.entries(this.webhooks)) {
            const transformedData = this.transformData(formData, key);
            integrationResults[key] = await this.sendToWebhook(key, transformedData);
        }

        return integrationResults;
    }
};

// Export for use in other scripts
export default INTEGRATIONS_CONFIG;