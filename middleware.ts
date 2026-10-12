import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicAdminRoute = pathname === '/admin/login' || pathname.startsWith('/admin/api');
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (pathname === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (pathname.startsWith('/admin') && !isPublicAdminRoute && !token) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-admin-pathname', pathname);

  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: ['/admin/:path*']
};
