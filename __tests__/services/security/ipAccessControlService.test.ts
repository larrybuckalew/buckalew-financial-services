import ipAccessControlService from '@/services/security/ipAccessControlService';
import { PrismaClient } from '@prisma/client';
import * as geoip from 'geoip-lite';

jest.mock('@prisma/client');
jest.mock('geoip-lite');

describe('IP Access Control Service', () => {
  let prisma: jest.Mocked<PrismaClient>;
  const mockUserId = 'user123';

  beforeEach(() => {
    prisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    (ipAccessControlService as any).prisma = prisma;
  });

  test('create access rule', async () => {
    prisma.ipAccessRule.create.mockResolvedValue({} as any);

    await ipAccessControlService.createAccessRule({
      userId: mockUserId,
      allowedCountries: ['US'],
      blockedCountries: ['CN'],
      allowedIPs: ['192.168.1.1'],
      blockedIPs: ['10.0.0.1']
    });

    expect(prisma.ipAccessRule.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: mockUserId,
        allowedCountries: ['US'],
        blockedCountries: ['CN'],
        allowedIPs: ['192.168.1.1'],
        blockedIPs: ['10.0.0.1']
      })
    });
  });

  test('is IP allowed - no rules', async () => {
    prisma.ipAccessRule.findUnique.mockResolvedValue(null);
    (geoip.lookup as jest.Mock).mockReturnValue({ country: 'US' });

    const result = await ipAccessControlService.isIPAllowed(mockUserId, '192.168.1.1');

    expect(result).toBe(true);
  });

  test('is IP allowed - blocked IP', async () => {
    prisma.ipAccessRule.findUnique.mockResolvedValue({
      userId: mockUserId,
      blockedIPs: ['192.168.1.1'],
      allowedIPs: [],
      blockedCountries: [],
      allowedCountries: []
    });
    (geoip.lookup as jest.Mock).mockReturnValue({ country: 'US' });

    const result = await ipAccessControlService.isIPAllowed(mockUserId, '192.168.1.1');

    expect(result).toBe(false);
  });

  test('log access attempt', async () => {
    prisma.accessLog.create.mockResolvedValue({} as any);
    (geoip.lookup as jest.Mock).mockReturnValue({ 
      country: 'US', 
      city: 'New York' 
    });

    await ipAccessControlService.logAccessAttempt(mockUserId, '192.168.1.1', true);

    expect(prisma.accessLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: mockUserId,
        ipAddress: '192.168.1.1',
        country: 'US',
        city: 'New York',
        allowed: true
      })
    });
  });

  test('get recent access logs', async () => {
    const mockLogs = [
      { id: '1', userId: mockUserId, ipAddress: '192.168.1.1' }
    ];
    prisma.accessLog.findMany.mockResolvedValue(mockLogs);

    const logs = await ipAccessControlService.getRecentAccessLogs(mockUserId);

    expect(logs).toEqual(mockLogs);
    expect(prisma.accessLog.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        userId: mockUserId
      })
    }));
  });
});
