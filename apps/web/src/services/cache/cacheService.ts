import Redis from 'ioredis';

interface CacheOptions {
  ttl?: number; // Time to live in seconds
}

class CacheService {
  private redis: Redis;
  private static instance: CacheService;

  private constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD
    });
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  // Set a value in cache
  async set(key: string, value: any, options: CacheOptions = {}): Promise<void> {
    const { ttl = 3600 } = options; // Default 1 hour
    
    const serializedValue = JSON.stringify(value);
    await this.redis.set(key, serializedValue, 'EX', ttl);
  }

  // Get a value from cache
  async get<T = any>(key: string): Promise<T | null> {
    const cachedValue = await this.redis.get(key);
    
    if (cachedValue) {
      try {
        return JSON.parse(cachedValue) as T;
      } catch (error) {
        console.error('Error parsing cached value:', error);
        return null;
      }
    }
    
    return null;
  }

  // Delete a key from cache
  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  // Implement cache-aside pattern
  async cacheable<T>(
    key: string, 
    fetchFn: () => Promise<T>, 
    options: CacheOptions = {}
  ): Promise<T> {
    // Try to get from cache first
    const cachedData = await this.get<T>(key);
    if (cachedData) return cachedData;

    // If not in cache, fetch and cache
    const freshData = await fetchFn();
    await this.set(key, freshData, options);

    return freshData;
  }

  // Invalidate multiple keys by pattern
  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  // Close Redis connection
  async close(): Promise<void> {
    await this.redis.quit();
  }
}

export default CacheService;
