/** 페이지 경로 */
export const PATHS = {
  HOME: '/',
  POSTS: '/posts',
  POST_DETAIL: (slug: string) => `/${slug}`,

  ADMIN: {
    POSTS: {
      CREATE: '/admin/posts/create',
      EDIT: (slug: string) => `/admin/posts/edit?slug=${slug}`,
    },
  },
} as const;
