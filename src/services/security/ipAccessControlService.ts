import { PrismaClient } from '@prisma/client';
import * as geoip from 'geoip-lite';

export interface IPAccessRule {
  userId: string;
  allowedCountries?: string[];
  blockedCountries?: string[];
  allowedIPs?: string[];
  blockedIPs?: string[];
}

class IPAccessControlService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Create IP access rule for a user
  async createAccessRule(rule: IPAccessRule): Promise<void> {
    await this.prisma.ipAccessRule.create({
      data: {
        userId: rule.userId,
        allowedCountries: rule.allowedCountries || [],
        blockedCountries: rule.blockedCountries || [],
        allowedIPs: rule.allowedIPs || [],
        blockedIPs: rule.blockedIPs || []
      }
    });
  }

  // Check if IP is allowed
  async isIPAllowed(userId: string, ipAddress: string): Promise<boolean> {
    // Lookup geolocation for the IP
    const geo = geoip.lookup(ipAddress);
    const country = geo ? geo.country : null;

    // Fetch user's access rules
    const accessRule = await this.prisma.ipAccessRule.findUnique({
      where: { userId }
    });

    if (!accessRule) {
      // No specific rules, allow access
      return true;
    }

    // Check blocked/allowed IPs
    if (accessRule.blockedIPs.includes(ipAddress)) {
      return false;
    }

    if (accessRule.allowedIPs.length > 0 && 
        !accessRule.allowedIPs.includes(ipAddress)) {
      return false;
    }

    // Check blocked/allowed countries
    if (country) {
      if (accessRule.blockedCountries.includes(country)) {
        return false;
      }

      if (accessRule.allowedCountries.length > 0 && 
          !accessRule.allowedCountries.includes(country)) {
        return false;
      }
    }

    return true;
  }

  // Log access attempts
  async logAccessAttempt(
    userId: string, 
    ipAddress: string, 
    allowed: boolean
  ): Promise<void> {
    const geo = geoip.lookup(ipAddress);

    await this.prisma.accessLog.create({
      data: {
        userId,
        ipAddress,
        country: geo ? geo.country : null,
        city: geo ? geo.city : null,
        allowed,
        timestamp: new Date()
      }
    });
  }

  // Get recent access logs for a user
  async getRecentAccessLogs(
    userId: string, 
    days: number = 30
  ): Promise<any[]> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - days);

    return this.prisma.accessLog.findMany({
      where: {
        userId,
        timestamp: { gte: thirtyDaysAgo }
      },
      orderBy: { timestamp: 'desc' }
    });
  }
}

export default new IPAccessControlService();
