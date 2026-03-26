import { useMutation } from '@tanstack/react-query';

import { API_ROUTES } from '@/constants';
import type { Post, PostFormSchema } from '@/services/post.schema';

/**
 * 게시글 생성 훅
 *
 * @example
 * const { mutateAsync: createPost, isPending } = useCreatePost();
 *
 * try {
 *   const post = await createPost({ slug: 'blog', title: '블로그', ... });
 * } catch (err) {
 *   console.error(err.message); // 이미 사용 중인 슬러그예요
 * }
 */
export function useCreatePost() {
  return useMutation({
    mutationFn: (data: PostFormSchema) => fetcherCreatePost(data),
  });
}

async function fetcherCreatePost(data: PostFormSchema): Promise<Post> {
  const res = await fetch(API_ROUTES.POSTS.CREATE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const { error } = (await res.json()) as { error: string };
    throw new Error(error);
  }

  return res.json() as Promise<Post>;
}
