import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // Exclude admin and API routes from i18n middleware
  if (request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/api')) {
    
    // Protect admin routes (except login page)
    if (request.nextUrl.pathname.startsWith('/admin') && 
        !request.nextUrl.pathname.startsWith('/admin/login')) {
      
      const token = await getToken({ 
        req: request,
        secret: process.env.NEXTAUTH_SECRET 
      });
      
      // If no token, redirect to login
      if (!token) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
    
    return;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(fr|en|nl)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};

