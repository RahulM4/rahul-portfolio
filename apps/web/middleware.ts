import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/admin'];

export function middleware(request: NextRequest) {
  if (PROTECTED_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route))) {
    const token = request.cookies.get('adminToken');
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
