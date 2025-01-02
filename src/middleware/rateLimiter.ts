import rateLimit from 'express-rate-limit';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

interface RateLimitConfig {
  windowMs: number;
  max: number;
  keyGenerator?: (req: NextApiRequest) => string;
}

export function createRateLimiter(config: RateLimitConfig) {
  return async function rateLimitMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ) {
    const key = config.keyGenerator 
      ? config.keyGenerator(req)
      : `rate-limit:${req.ip}`;

    try {
      const current = await redis.incr(key);
      
      if (current === 1) {
        await redis.expire(key, config.windowMs / 1000);
      }

      res.setHeader('X-RateLimit-Limit', config.max);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, config.max - current));

      if (current > config.max) {
        return res.status(429).json({
          error: 'Too many requests, please try again later.'
        });
      }

      next();
    } catch (error) {
      console.error('Rate limit error:', error);
      next();
    }
  };
}

// Pre-configured rate limiters
export const globalRateLimit = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

export const authRateLimit = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  keyGenerator: (req) => `auth-limit:${req.ip}`
});

export const apiRateLimit = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  keyGenerator: (req) => `api-limit:${req.ip}`
});