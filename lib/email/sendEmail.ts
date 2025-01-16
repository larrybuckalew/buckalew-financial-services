import nodemailer from 'nodemailer'
import { Logger } from '../utils/logging'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export class EmailService {
  private static instance: EmailService
  private transporter: nodemailer.Transporter
  private logger: Logger

  private constructor() {
    this.logger = Logger.getInstance()
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      secure: process.env.EMAIL_SERVER_PORT === '465',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      }
    })
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  public async sendEmail(options: EmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        ...options
      })

      this.logger.log('info', `Email sent to ${options.to}`, { subject: options.subject })
    } catch (error) {
      this.logger.log('error', 'Failed to send email', { error, recipient: options.to })
      throw error
    }
  }

  public async sendWelcomeEmail(to: string, name: string, loginUrl: string): Promise<void> {
    const welcomeTemplate = await this.loadEmailTemplate('welcome', {
      name,
      loginUrl
    })

    await this.sendEmail({
      to,
      subject: 'Welcome to Buckalew Financial Services',
      html: welcomeTemplate
    })
  }

  private async loadEmailTemplate(template: string, replacements: Record<string, string>): Promise<string> {
    // In a real-world scenario, you'd load the template from a file
    const templateContent = await import(`./templates/${template}.html`)
    let html = templateContent.default

    // Replace placeholders
    Object.entries(replacements).forEach(([key, value]) => {
      html = html.replace(`{{${key}}}`, value)
    })

    return html
  }
}