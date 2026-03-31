import { AUTH_ERRORS } from '@/constants/auth';
import { OAUTH_ROUTES } from '@/constants/routes';
import { env } from '@/lib/env';
import { http } from '@/lib/http';

import { type GitHubUser, tokenSchema, userSchema } from './auth.schema';

export type { GitHubUser } from './auth.schema';
export { tokenSchema, userSchema } from './auth.schema';

/**
 * GitHub OAuth 액세스 토큰 요청
 *
 * @description OAuth 콜백으로 받은 `code`를 GitHub 토큰 엔드포인트로 보내 액세스 토큰을 발급받는다.
 * @param {string} code - GitHub OAuth 콜백으로 전달된 인증 코드
 * @returns {Promise<string>} 액세스 토큰 문자열
 *
 * @example
 * const token = await getAccessToken('abc123');
 * console.log(token); // 'gho_xxxx'
 */
export async function getAccessToken(code: string): Promise<string> {
  const data = await http.post<unknown>(OAUTH_ROUTES.GITHUB.TOKEN, {
    json: {
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: env.GITHUB_REDIRECT_URI,
    },
  });

  const tokenData = tokenSchema.safeParse(data);
  if (!tokenData.success || tokenData.data.error || !tokenData.data.access_token) {
    throw new Error(AUTH_ERRORS.OAUTH_DENIED);
  }

  return tokenData.data.access_token;
}

/**
 * GitHub 사용자 정보 요청
 *
 * @description 액세스 토큰으로 GitHub API를 호출하여 사용자 프로필을 가져온다.
 * @param {string} accessToken - GitHub OAuth 액세스 토큰
 * @returns {Promise<GitHubUser>} GitHub 사용자 정보 객체
 *
 * @example
 * const user = await getGitHubUser('gho_xxxx');
 * console.log(user.login); // 'dango0812'
 */
export async function getGitHubUser(accessToken: string): Promise<GitHubUser> {
  const data = await http.get<unknown>(OAUTH_ROUTES.GITHUB.USER, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const userData = userSchema.safeParse(data);
  if (!userData.success) {
    throw new Error(AUTH_ERRORS.UNAUTHORIZED);
  }

  return userData.data;
}

/**
 * 블로그 소유자인지 검증
 *
 * @param {GitHubUser} user - GitHub 사용자 정보 객체
 * @returns {boolean} 소유자이면 `true`, 아니면 `false`
 *
 * @example
 * const user = await getGitHubUser(token);
 * console.log(isAuthorized(user)); // true 또는 false
 */
export function isAuthorized(user: GitHubUser): boolean {
  return String(user.id) === env.GITHUB_USER_ID && user.login === env.GITHUB_LOGIN;
}

const cache = new Map<string, { valid: boolean; expires: number }>();

/**
 * 액세스 토큰이 유효한지 확인
 *
 * @param {string} accessToken - GitHub OAuth 액세스 토큰
 * @returns {Promise<boolean>} 인증된 소유자면 `true`, 아니면 `false`
 *
 * @example
 * const authenticated = await isAuthenticated(accessToken);
 * console.log(authenticated); // true 또는 false
 */
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
