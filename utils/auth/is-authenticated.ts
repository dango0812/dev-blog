import { getGitHubUser } from './get-github-user';
import { isAuthorized } from './is-authorized';

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
