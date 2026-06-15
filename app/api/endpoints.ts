/** API 엔드포인트 */
export const API_ROUTES = {
  UPLOAD_IMAGE: '/api/upload/image',
  POSTS: {
    ROOT: '/api/posts',
    DETAIL: (slug: string) => `/api/posts/${slug}`,
  },
} as const;

/** OAuth 엔드포인트 */
const GITHUB_URL = 'https://github.com';
const GITHUB_API_URL = 'https://api.github.com';
export const OAUTH_ROUTES = {
  GITHUB: {
    AUTH: `${GITHUB_URL}/login/oauth/authorize`,
    TOKEN: `${GITHUB_URL}/login/oauth/access_token`,
    USER: `${GITHUB_API_URL}/user`,
  },
};
