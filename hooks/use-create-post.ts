import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_ROUTES, QUERY_KEYS } from '@/constants';
import { http } from '@/lib/http';
import { type Post, type PostFormSchema, postSchema } from '@/services/post.schema';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PostFormSchema) => {
      const resData = await http.post<Post>(API_ROUTES.POSTS.ROOT, { json: data });
      return postSchema.parse(resData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.all });
    },
  });
}
