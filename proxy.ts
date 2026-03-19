import { type NextRequest, NextResponse } from 'next/server';

import { PATHS } from '@/constants';
import { isAuthenticated } from '@/services/auth';

import { AUTH_COOKIE_NAME } from './constants/auth';

export default async function proxy(request: NextRequest) {
  const { cookies, nextUrl, url } = request;
  const { pathname } = nextUrl;

  const isSignInPage = pathname === PATHS.ADMIN.ROOT || pathname === `${PATHS.ADMIN.ROOT}/`;
  const isProtectedRoute = pathname.startsWith(PATHS.ADMIN.ROOT) && !isSignInPage;

  // 관리자/로그인 페이지 아니라면 그대로 진행
  if (!isProtectedRoute && !isSignInPage) {
    return NextResponse.next();
  }

  const accessToken = cookies.get(AUTH_COOKIE_NAME)?.value;
  const authenticated = accessToken ? await isAuthenticated(accessToken) : false;

  if (authenticated && isSignInPage) {
    return NextResponse.redirect(new URL(PATHS.ADMIN.DASHBOARD, url));
  }

  if (!authenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL(PATHS.ADMIN.ROOT, url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
