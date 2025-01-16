import { NextRequest, NextResponse } from 'next/server'
import Redis from 'ioredis'

interface RateLimiterConfig {
  points: number
  duration: number
}

export class RateLimiter {
  private redis: Redis
  private config: RateLimiterConfig

  constructor(config: RateLimiterConfig = { points: 10, duration: 60 }) {
    this.config = config
    this.redis = new Redis(process.env.REDIS_URL)
  }

  public async limit(key: string): Promise<boolean> {
    const currentCount = await this.redis.incr(key)
    
    if (currentCount === 1) {
      // Set expiration for the key
      await this.redis.expire(key, this.config.duration)
    }

    return currentCount <= this.config.points
  }

  public async blockIP(ip: string, duration: number = 3600): Promise<void> {
    await this.redis.set(`blocked:${ip}`, '1', 'EX', duration)
  }

  public async isIPBlocked(ip: string): Promise<boolean> {
    const blockedStatus = await this.redis.exists(`blocked:${ip}`)
    return blockedStatus === 1
  }
}

// Middleware for rate limiting
export function rateLimitMiddleware(req: NextRequest) {
  const rateLimiter = new RateLimiter()
  const ip = req.ip ?? 'unknown'
  const key = `rate:${ip}:${req.nextUrl.pathname}`

  return rateLimiter.limit(key)
    .then((allowed) => {
      if (!allowed) {
        return NextResponse.json(
          { error: 'Too many requests' },
          { status: 429 }
        )
      }
      return NextResponse.next()
    })
    .catch(() => {
      // Fallback if rate limiting fails
      return NextResponse.next()
    })
}