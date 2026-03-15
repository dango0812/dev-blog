import { z } from 'zod';

import { POST_TAGS } from '@/constants';

/**
 * 게시글 작성/수정 폼 스키마
 */
export const postFormSchema = z.object({
  coverUrl: z.string().nullable(),
  slug: z
    .string()
    .min(1, '슬러그를 입력해주세요')
    .max(80, '슬러그는 80자 이내로 입력해주세요')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, '영문 소문자, 숫자, 하이픈(-)만 사용할 수 있어요'),
  title: z.string().min(1, '제목을 입력해주세요').max(100, '제목은 100자 이내로 입력해주세요'),
  tag: z.enum(POST_TAGS),
  content: z.string().min(1, '내용을 입력해주세요'),
});

/* 게시글 작성/수정 폼 타입 */
export type PostFormSchema = z.infer<typeof postFormSchema>;
