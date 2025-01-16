import Redis from 'ioredis';

class CacheManager {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }

  async get(key: string) {
    const cachedData = await this.redis.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  async set(key: string, data: any, ttl: number = 3600) {
    await this.redis.set(key, JSON.stringify(data), 'EX', ttl);
  }

  async invalidate(key: string) {
    await this.redis.del(key);
  }
}

export const cacheManager = new CacheManager();