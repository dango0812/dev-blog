import { env } from '@/lib/env';
import { type GitHubUser } from '@/model/auth';

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
