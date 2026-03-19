import { AUTH_ERRORS } from '@/constants/auth';
import { OAUTH_ROUTES } from '@/constants/routes';
import { env } from '@/lib/env';

import { type GitHubUser, tokenSchema, userSchema } from './auth.schema';

export type { GitHubUser } from './auth.schema';
export { tokenSchema, userSchema } from './auth.schema';

/** GitHub OAuth 액세스 토큰 요청 */
export async function getAccessToken(code: string): Promise<string> {
  const res = await fetch(OAUTH_ROUTES.GITHUB.TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_SECRET_KEY,
      code,
      redirect_uri: env.GITHUB_REDIRECT_URI,
    }),
  });

  const tokenData = tokenSchema.safeParse(await res.json());
  if (!tokenData.success || tokenData.data.error || !tokenData.data.access_token) {
    throw new Error(AUTH_ERRORS.OAUTH_DENIED);
  }

  return tokenData.data.access_token;
}

/** GitHub 사용자 정보 요청 */
export async function getGitHubUser(accessToken: string): Promise<GitHubUser> {
  const res = await fetch(OAUTH_ROUTES.GITHUB.USER, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const userData = userSchema.safeParse(await res.json());
  if (!userData.success) {
    throw new Error(AUTH_ERRORS.UNAUTHORIZED);
  }

  return userData.data;
}

/** 블로그 소유자인지 검증 */
export function isAuthorized(user: GitHubUser): boolean {
  return String(user.id) === env.GITHUB_USER_ID && user.login === env.GITHUB_LOGIN;
}

const cache = new Map<string, { valid: boolean; expires: number }>();

/** 인증 여부 확인 */
export async function isAuthenticated(accessToken: string): Promise<boolean> {
  const cached = cache.get(accessToken);
  if (cached && cached.expires > Date.now()) {
    return cached.valid;
  }

  try {
    const user = await getGitHubUser(accessToken);
    const valid = isAuthorized(user);
    cache.set(accessToken, { valid, expires: Date.now() + 60 * 60 * 1000 }); // 1시간 캐시

    return valid;
  } catch {
    return false;
  }
}
