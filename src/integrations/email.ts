import sgMail from '@sendgrid/mail';
import { EmailTemplate } from '../types/email';

class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async sendEmail(to: string, template: EmailTemplate, data: any) {
    try {
      const msg = {
        to,
        from: process.env.EMAIL_FROM!,
        templateId: template,
        dynamicTemplateData: data,
      };

      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(to: string, firstName: string) {
    await this.sendEmail(to, EmailTemplate.WELCOME, {
      firstName,
      loginUrl: `${process.env.APP_URL}/login`,
      supportEmail: process.env.SUPPORT_EMAIL
    });
  }

  async sendPasswordReset(to: string, resetToken: string) {
    await this.sendEmail(to, EmailTemplate.PASSWORD_RESET, {
      resetUrl: `${process.env.APP_URL}/reset-password?token=${resetToken}`,
      expiryHours: 24
    });
  }

  async sendAccountStatement(to: string, statementUrl: string, month: string) {
    await this.sendEmail(to, EmailTemplate.ACCOUNT_STATEMENT, {
      statementUrl,
      month,
      downloadExpiryHours: 48
    });
  }

  async sendSecurityAlert(to: string, alertType: string, details: any) {
    await this.sendEmail(to, EmailTemplate.SECURITY_ALERT, {
      alertType,
      details,
      timestamp: new Date().toISOString()
    });
  }

  async sendTaxDocument(to: string, documentUrl: string, year: number) {
    await this.sendEmail(to, EmailTemplate.TAX_DOCUMENT, {
      documentUrl,
      year,
      downloadExpiryHours: 72
    });
  }
}