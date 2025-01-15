import { NextRequest, NextResponse } from 'next/server'
import * as crypto from 'crypto'

// Security middleware to add various security headers
export function securityMiddleware(req: NextRequest) {
  const response = NextResponse.next()

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src * data:; connect-src 'self' https://"
  )

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')

  // Enforce HTTPS
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Prevent XSS
  response.headers.set('X-XSS-Protection', '1; mode=block')

  return response
}

// Rate limiter middleware
export function rateLimiterMiddleware(req: NextRequest) {
  // Track request frequency
  const ip = req.ip ?? ''
  const requestKey = crypto.createHash('md5').update(ip).digest('hex')

  // Implement basic rate limiting
  const MAX_REQUESTS = 100 // Requests per window
  const WINDOW_MS = 15 * 60 * 1000 // 15 minutes

  // In a real-world scenario, use Redis or distributed cache
  const requestCount = getRequestCount(requestKey)

  if (requestCount > MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later' },
      { status: 429 }
    )
  }

  incrementRequestCount(requestKey)

  return NextResponse.next()
}

// Placeholder for request count tracking (replace with actual implementation)
function getRequestCount(key: string): number {
  // Simulated request count
  return 0
}

function incrementRequestCount(key: string): void {
  // Simulated increment
  console.log(`Tracking requests for ${key}`)
}

// CSRF protection middleware
export function csrfProtectionMiddleware(req: NextRequest) {
  // Validate CSRF token for state-changing requests
  const csrfToken = req.headers.get('x-csrf-token')

  // In a real implementation, validate against stored token
  if (!csrfToken) {
    return NextResponse.json(
      { error: 'CSRF token missing' },
      { status: 403 }
    )
  }

  return NextResponse.next()
}