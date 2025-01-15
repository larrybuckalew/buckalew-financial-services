import { NextRequest, NextResponse } from 'next/server'
import { AnalyticsService } from './lib/monitoring/analytics'

export function middleware(req: NextRequest) {
  // Track page views
  const analyticsService = AnalyticsService.getInstance()
  analyticsService.trackPageView(req.nextUrl.pathname)

  // Performance monitoring
  const startTime = Date.now()
  const response = NextResponse.next()

  // Add performance headers
  response.headers.set('X-Response-Time', `${Date.now() - startTime}ms`)

  return response
}

// Define paths for middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}