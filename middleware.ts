import { NextRequest, NextResponse } from 'next/server'
import { securityMiddleware, rateLimiterMiddleware, csrfProtectionMiddleware } from './middleware/security'

export function middleware(req: NextRequest) {
  // Apply security middlewares
  const securityResponse = securityMiddleware(req)
  const rateLimitResponse = rateLimiterMiddleware(req)
  const csrfResponse = csrfProtectionMiddleware(req)

  // If any middleware returns an error response, return it
  if (securityResponse.status !== 200) return securityResponse
  if (rateLimitResponse.status !== 200) return rateLimitResponse
  if (csrfResponse.status !== 200) return csrfResponse

  return NextResponse.next()
}

// Define paths for middleware
export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/profile/:path*'
  ]
}