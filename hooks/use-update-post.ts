import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_ROUTES, QUERY_KEYS } from '@/constants';
import { http } from '@/lib/http';
import { type Post, type PostFormSchema, postSchema } from '@/services/post.schema';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PostFormSchema) => {
      const resData = await http.patch<Post>(API_ROUTES.POSTS.DETAIL(slug), { json: data });
      return postSchema.parse(resData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.all });
    },
  });
}
