import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

class SessionService {
  private prisma: PrismaClient;
  private redis: Redis;
  private readonly sessionDuration: number = 7 * 24 * 60 * 60; // 7 days in seconds

  constructor() {
    this.prisma = new PrismaClient();
    this.redis = new Redis(process.env.REDIS_URL!);
  }

  async createSession(userId: string, metadata: any = {}) {
    const sessionId = uuidv4();
    const session = {
      userId,
      createdAt: new Date(),
      metadata
    };

    await this.redis.set(
      `session:${sessionId}`,
      JSON.stringify(session),
      'EX',
      this.sessionDuration
    );

    return sessionId;
  }

  async getSession(sessionId: string) {
    const session = await this.redis.get(`session:${sessionId}`);
    return session ? JSON.parse(session) : null;
  }

  async updateSession(sessionId: string, metadata: any) {
    const session = await this.getSession(sessionId);
    if (!session) return false;

    session.metadata = { ...session.metadata, ...metadata };
    await this.redis.set(
      `session:${sessionId}`,
      JSON.stringify(session),
      'EX',
      this.sessionDuration
    );

    return true;
  }

  async deleteSession(sessionId: string) {
    await this.redis.del(`session:${sessionId}`);
  }

  async deleteAllUserSessions(userId: string) {
    const keys = await this.redis.keys('session:*');
    for (const key of keys) {
      const session = await this.redis.get(key);
      if (session && JSON.parse(session).userId === userId) {
        await this.redis.del(key);
      }
    }
  }
}