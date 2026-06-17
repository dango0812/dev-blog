import { OAUTH_ROUTES } from '@/app/api/endpoints';
import { AUTH_ERRORS } from '@/constants/auth';
import { http } from '@/lib/http';
import { type GitHubUser, userSchema } from '@/model/auth';

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
