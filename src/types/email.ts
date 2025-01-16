export enum EmailTemplate {
  WELCOME = 'd-welcome-template-id',
  PASSWORD_RESET = 'd-password-reset-template-id',
  ACCOUNT_STATEMENT = 'd-account-statement-template-id',
  SECURITY_ALERT = 'd-security-alert-template-id',
  TAX_DOCUMENT = 'd-tax-document-template-id'
}

export interface EmailData {
  to: string;
  template: EmailTemplate;
  data: Record<string, any>;
}