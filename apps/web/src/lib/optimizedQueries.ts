import prisma from '@/lib/prisma';
import { cacheManager } from './cache';

export class OptimizedQueries {
  static async getUserWithProfile(userId: string) {
    const cacheKey = `user:${userId}:profile`;
    
    const cachedUser = await cacheManager.get(cacheKey);
    if (cachedUser) return cachedUser;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
            completionPercentage: true
          }
        }
      }
    });

    if (user) {
      await cacheManager.set(cacheKey, user, 3600);
    }

    return user;
  }

  static async getUserAnalytics(userId: string) {
    const cacheKey = `user:${userId}:analytics`;
    
    const cachedAnalytics = await cacheManager.get(cacheKey);
    if (cachedAnalytics) return cachedAnalytics;

    const analytics = await prisma.$queryRaw`
      SELECT 
        COUNT(DISTINCT portfolio_id) as portfolio_count,
        SUM(investment_value) as total_investment,
        AVG(risk_score) as avg_risk
      FROM user_portfolios
      WHERE user_id = ${userId}
    `;

    await cacheManager.set(cacheKey, analytics, 7200);
    return analytics;
  }
}