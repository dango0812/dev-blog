import { useMutation } from '@tanstack/react-query';

import { API_ROUTES } from '@/constants';
import type { Post, PostFormSchema } from '@/services/post.schema';

/**
 * 게시글 수정 훅
 *
 * @param slug - 수정할 게시글의 원본 slug
 *
 * @example
 * const { mutateAsync: updatePost, isPending } = useUpdatePost('blog-post');
 *
 * try {
 *   const post = await updatePost({ slug: 'blog-post', title: '블로그 제목 수정', ... });
 * } catch (err) {
 *   console.error(err.message); // 게시글을 찾지 못했어요
 * }
 */
export function useUpdatePost(slug: string) {
  return useMutation({
    mutationFn: (data: PostFormSchema) => fetcherUpdatePost(slug, data),
  });
}

async function fetcherUpdatePost(slug: string, data: PostFormSchema): Promise<Post> {
  const res = await fetch(API_ROUTES.POSTS.UPDATE(slug), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const { error } = (await res.json()) as { error: string };
    throw new Error(error);
  }

  return res.json() as Promise<Post>;
}
