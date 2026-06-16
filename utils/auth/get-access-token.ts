import { OAUTH_ROUTES } from '@/app/api/endpoints';
import { AUTH_ERRORS } from '@/constants/auth';
import { env } from '@/lib/env';
import { http } from '@/lib/http';
import { tokenSchema } from '@/model/auth';

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
