import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export const getCache = async (key: string) => {
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
};

export const setCache = async (key: string, value: any, ttl?: number) => {
  const serialized = JSON.stringify(value);
  if (ttl) {
    await redis.setex(key, ttl, serialized);
  } else {
    await redis.set(key, serialized);
  }
};

export const invalidateCache = async (key: string) => {
  await redis.del(key);
};

export const getCacheKeys = async (pattern: string) => {
  return redis.keys(pattern);
};

export default redis;