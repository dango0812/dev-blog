import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_ROUTES, QUERY_KEYS } from '@/constants';
import { http } from '@/lib/http';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => http.delete(API_ROUTES.POSTS.DETAIL(slug)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.all });
    },
  });
}
