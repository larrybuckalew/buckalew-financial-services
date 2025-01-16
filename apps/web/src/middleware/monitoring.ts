import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logInfo } from '@/lib/monitoring/logger';

export function middleware(request: NextRequest) {
  const requestStart = Date.now();
  const response = NextResponse.next();

  response.headers.set('X-Response-Time', `${Date.now() - requestStart}ms`);

  logInfo('API Request', {
    method: request.method,
    path: request.nextUrl.pathname,
    duration: Date.now() - requestStart,
    userAgent: request.headers.get('user-agent'),
  });

  return response;
}