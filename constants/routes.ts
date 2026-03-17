/** API 엔드포인트 */
export const API_ROUTES = {
  UPLOAD_IMAGE: '/api/upload/image',
  POSTS: {
    LIST: '/api/posts',
    CREATE: '/api/posts',
    DETAIL: (slug: string) => `/api/posts/${slug}`,
    UPDATE: (slug: string) => `/api/posts/${slug}`,
  },
} as const;
