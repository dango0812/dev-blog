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
