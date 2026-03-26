import { useMutation } from '@tanstack/react-query';

import { API_ROUTES } from '@/constants';

/**
 * 게시글 삭제 훅
 *
 * @example
 * const { mutateAsync: deletePost, isPending } = useDeletePost();
 *
 * try {
 *   await deletePost('blog-post');
 * } catch (err) {
 *   console.log(err.message);
 * }
 */
export function useDeletePost() {
  return useMutation({
    mutationFn: (slug: string) => fetcherDeletePost(slug),
  });
}

async function fetcherDeletePost(slug: string): Promise<void> {
  const res = await fetch(API_ROUTES.POSTS.DETAIL(slug), { method: 'DELETE' });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error);
  }
}
