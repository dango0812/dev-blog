/** 게시글 타입 옵션 */
export const POST_TYPES = ['tech', 'insight'] as const;
export type PostType = (typeof POST_TYPES)[number];

/** 게시글 타입 라벨 */
export const TYPE_LABEL: Record<PostType, string> = {
  tech: '기술',
  insight: '인사이트',
} as const;

/** 게시글 태그 옵션 */
export const POST_TAGS = ['2026', 'Frontend', 'Design Pattern'] as const;
export type PostTag = (typeof POST_TAGS)[number];

/** 게시글 태그 한글 라벨 */
export const TAG_LABEL: Record<PostTag, string> = {
  '2026': '2026',
  Frontend: '프론트엔드',
  'Design Pattern': '디자인패턴',
} as const;
