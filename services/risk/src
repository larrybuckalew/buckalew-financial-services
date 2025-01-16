import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import { PrismaClient } from '@prisma/client';

export interface TwoFactorSetupResponse {
  secret: string;
  qrCodeUrl: string;
}

class TwoFactorAuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Generate 2FA secret and QR code
  async generateTwoFactorSecret(userId: string): Promise<TwoFactorSetupResponse> {
    // Generate a secret key
    const secret = speakeasy.generateSecret({ 
      name: "Buckalew Financial Services" 
    });

    // Save secret to user's profile
    await this.prisma.user.update({
      where: { id: userId },
      data: { 
        twoFactorSecret: secret.base32,
        twoFactorEnabled: false
      }
    });

    // Generate QR code URL
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

    return {
      secret: secret.base32,
      qrCodeUrl
    };
  }

  // Verify 2FA token
  verifyTwoFactorToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token
    });
  }

  // Enable 2FA for a user
  async enableTwoFactor(userId: string, token: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || !user.twoFactorSecret) {
      throw new Error('Two-factor setup not initiated');
    }

    // Verify the token
    const isValid = this.verifyTwoFactorToken(user.twoFactorSecret, token);

    if (isValid) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { twoFactorEnabled: true }
      });
    }

    return isValid;
  }

  // Disable 2FA for a user
  async disableTwoFactor(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { 
        twoFactorEnabled: false,
        twoFactorSecret: null 
      }
    });
  }
}

export default new TwoFactorAuthService();
