import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin rotalarını koru
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Cookie kontrolü
    const adminAuth = request.cookies.get('admin-auth');
    
    if (!adminAuth || adminAuth.value !== 'authenticated') {
      // Cookie yoksa login sayfasına yönlendir
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
