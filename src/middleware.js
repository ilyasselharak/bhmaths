import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Routes that require authentication
const protectedRoutes = [
  '/profile',
  '/dashboard',
  '/admin'
];

// Routes that are public but should redirect authenticated users
const authRedirectRoutes = [
  '/login',
  '/register'
];

// Routes that are always public
const publicRoutes = [
  '/api/auth/login',
  '/api/auth/register'
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if route is always public
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if route should redirect authenticated users
  if (authRedirectRoutes.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('auth-token')?.value;
    
    if (token) {
      try {
        verifyToken(token);
        return NextResponse.redirect(new URL('/', request.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // Check if route is protected
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      verifyToken(token);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('auth-token', '', { httpOnly: true, maxAge: 0, path: '/' });
      return response;
    }
  }

  // For API routes that need authentication (like /api/user/profile)
  if (pathname.startsWith('/api/user/')) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    try {
      const decoded = verifyToken(token);
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      return NextResponse.next({ request: { headers: requestHeaders } });
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on routes that actually need auth checks.
  // This prevents middleware from running on every public page visit,
  // dramatically reducing serverless function invocations.
  matcher: [
    '/profile/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register',
    '/api/auth/login',
    '/api/auth/register',
    '/api/user/:path*',
  ],
}; 