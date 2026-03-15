/** 게시글 태그 옵션 */
export const POST_TAGS = ['tech', 'insight'] as const;
export type PostTag = (typeof POST_TAGS)[number];

/** 게시글 태그 라벨 */
export const TAG_LABEL: Record<PostTag, string> = {
  tech: '기술',
  insight: '인사이트',
};
