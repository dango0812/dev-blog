/** 게시글 타입 옵션 */
export const POST_TYPES = ['tech', 'insight'] as const;
export type PostType = (typeof POST_TYPES)[number];

/** 게시글 타입 라벨 */
export const TYPE_LABEL: Record<PostType, string> = {
  tech: '기술',
  insight: '인사이트',
} as const;

/** 게시글 태그 옵션 */
export const POST_TAGS = ['2026', '프론트엔드', '디자인패턴', '알고리즘', '자료구조', 'Vercel', 'TOEIC'] as const;
export type PostTag = (typeof POST_TAGS)[number];

/** API 엔드포인트 */
export const API_ROUTES = {
  UPLOAD_IMAGE: '/api/upload/image',
  POSTS: {
    LIST: '/api/posts',
    CREATE: '/api/posts',
    DETAIL: (slug: string) => `/api/posts/${slug}`,
  },
} as const;

/** 페이지 경로 */
export const PATHS = {
  HOME: '/',
  POSTS: '/posts',
} as const;

/** Github 주소 */
export const GITHUB_URL = 'https://github.com/dango0812/dev-blog';
/** OG 이미지 주소 */
export const OPEN_GRAPH_URL = 'https://res.cloudinary.com/dong-gyu/image/upload/v1773644123/open-graph.png';

/** 사이트 설정 */
export const SITE_CONFIG = {
  name: '동규의 개발 블로그',
  shortName: '개발 블로그',
  description: '프론트엔드 개발자 동규의 개발 블로그, 경험과 생각을 글로 남깁니다.',
  author: 'Donggyu',
  locale: 'ko_KR',
} as const;
