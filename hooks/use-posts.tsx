import { useQuery } from '@tanstack/react-query';

import { API_ROUTES, QUERY_KEYS } from '@/constants';
import { http } from '@/lib/http';
import { type Post, postSchema } from '@/services/post.schema';

interface UsePostsParams {
  tag?: string | null;
}

/**
 * 게시글 목록 조회 훅
 *
 * @param {UsePostsParams} params - 조회 옵션
 * @param {string | null} params.tag - 필터링할 태그 (없으면 전체 조회)
 *
 * @example
 * const { data: posts, isLoading } = usePosts({ tag: 'Frontend' });
 */
export function usePosts({ tag }: UsePostsParams = {}) {
  return useQuery<Post[]>({
    queryKey: QUERY_KEYS.post.list(tag),
    queryFn: async () => {
      const data = await http.get<Post[]>(API_ROUTES.POSTS.ROOT, {
        searchParams: { tag: tag ?? undefined },
      });
      return postSchema.array().parse(data);
    },
  });
}
