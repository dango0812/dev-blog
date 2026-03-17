import { z } from 'zod';

import { POST_TAGS, POST_TYPES } from '@/constants';

/** 날짜 필드 (Date → ISO 문자열 변환) */
const dateString = z.preprocess(val => (val instanceof Date ? val.toISOString() : val), z.string());

/** DB 응답 게시글 스키마 */
export const postSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  type: z.string(),
  tag: z.string(),
  content: z.string(),
  coverUrl: z.string().nullable(),
  createdAt: dateString,
  updatedAt: dateString,
});

/** 게시글 작성/수정 폼 스키마 */
export const postFormSchema = z.object({
  coverUrl: z.url('올바른 이미지 URL을 입력해주세요').nullable(),
  slug: z
    .string()
    .min(1, '슬러그를 입력해주세요')
    .max(80, '슬러그는 80자 이내로 입력해주세요')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, '영문 소문자, 숫자, 하이픈(-)만 사용할 수 있어요'),
  title: z.string().min(1, '제목을 입력해주세요').max(100, '제목은 100자 이내로 입력해주세요'),
  type: z.enum(POST_TYPES),
  tag: z.enum(POST_TAGS),
  content: z.string().refine(
    value =>
      value
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim().length > 0,
    '내용을 입력해주세요',
  ),
});

/* 게시글 작성/수정 폼 타입 */
export type PostFormSchema = z.infer<typeof postFormSchema>;
/** 게시글 타입 */
export type Post = z.infer<typeof postSchema>;
