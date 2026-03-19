import { type NextRequest, NextResponse } from 'next/server';

import { PATHS } from '@/constants';
import { AUTH_COOKIE_NAME, AUTH_ERRORS } from '@/constants/auth';
import { getAccessToken, getGitHubUser, isAuthorized } from '@/services/auth';

/**
 * GET /api/auth/callback/github
 *
 * GitHub OAuth 콜백 핸들러
 *
 * 1. GitHub에서 전달된 `code`를 받아 액세스 토큰 요청
 * 2. 액세스 토큰으로 GitHub 사용자 정보 조회
 * 3. 사용자 정보를 기반으로 세션 생성 및 쿠키 설정
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  // code가 없으면 인증 실패로 간주하고 로그인 페이지로 리다이렉트
  if (!code) {
    return NextResponse.redirect(new URL(`${PATHS.ADMIN.ROOT}?error=${AUTH_ERRORS.OAUTH_DENIED}`, req.url));
  }

  try {
    const accessToken = await getAccessToken(code);
    const user = await getGitHubUser(accessToken);

    // 블로그 소유자 검증 실패 시 로그인 페이지로 리다이렉트
    if (!isAuthorized(user)) {
      return NextResponse.redirect(new URL(`${PATHS.ADMIN.ROOT}?error=${AUTH_ERRORS.UNAUTHORIZED}`, req.url));
    }

    const response = NextResponse.redirect(new URL(PATHS.ADMIN.DASHBOARD, req.url));
    response.cookies.set(AUTH_COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.redirect(new URL(`${PATHS.ADMIN.ROOT}?error=${AUTH_ERRORS.SERVER_ERROR}`, req.url));
  }
}
