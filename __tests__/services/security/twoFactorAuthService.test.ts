import twoFactorAuthService from '@/services/security/twoFactorAuthService';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');

describe('Two-Factor Authentication Service', () => {
  let prisma: jest.Mocked<PrismaClient>;
  const mockUserId = 'user123';

  beforeEach(() => {
    prisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    (twoFactorAuthService as any).prisma = prisma;
  });

  test('generate two-factor secret', async () => {
    prisma.user.update.mockResolvedValue({} as any);

    const result = await twoFactorAuthService.generateTwoFactorSecret(mockUserId);

    expect(result).toHaveProperty('secret');
    expect(result).toHaveProperty('qrCodeUrl');
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: mockUserId },
      data: expect.objectContaining({
        twoFactorSecret: expect.any(String),
        twoFactorEnabled: false
      })
    });
  });

  test('verify valid token', () => {
    const secret = 'KVKFKRCPNZQUYMLXOVYQ';
    const token = '123456'; // You'd use a real token generation method here

    const result = twoFactorAuthService.verifyTwoFactorToken(secret, token);
    expect(result).toBe(true);
  });

  test('enable two-factor authentication', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: mockUserId,
      twoFactorSecret: 'TESTSCRET'
    } as any);
    prisma.user.update.mockResolvedValue({} as any);

    const result = await twoFactorAuthService.enableTwoFactor(mockUserId, '123456');
    
    expect(result).toBe(true);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: mockUserId },
      data: { twoFactorEnabled: true }
    });
  });

  test('disable two-factor authentication', async () => {
    prisma.user.update.mockResolvedValue({} as any);

    await twoFactorAuthService.disableTwoFactor(mockUserId);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: mockUserId },
      data: { 
        twoFactorEnabled: false,
        twoFactorSecret: null 
      }
    });
  });
});
