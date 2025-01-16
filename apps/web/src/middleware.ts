import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Paths that don't require authentication
  const publicPaths = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/api/auth/(.)*',
  ];

  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.match(new RegExp(`^${path}$`)));

  if (isPublicPath) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });

  // Redirect to login if not authenticated
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check for required MFA
  if (token.mfaEnabled && !token.mfaVerified && 
      !request.nextUrl.pathname.startsWith('/auth/mfa')) {
    const mfaUrl = new URL('/auth/mfa', request.url);
    return NextResponse.redirect(mfaUrl);
  }

  // Add security headers
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  );

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};