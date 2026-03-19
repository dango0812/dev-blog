import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/components/providers/query';
import { Container, Flex } from '@/components/ui';
import { QUERY_KEYS } from '@/constants';
import { getPosts } from '@/services/post';

import { PostList } from './_components/post-list';
import { PostListSkeleton } from './_components/post-list-skeleton';
import { TagFilter } from './_components/tag-filter';

export default async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.post.list(),
    queryFn: () => getPosts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container maxWidth="lg" className="px-6 py-10">
        <Flex direction="column" className="gap-5">
          <Suspense fallback={null}>
            <TagFilter />
          </Suspense>

          <Suspense fallback={<PostListSkeleton />}>
            <PostList />
          </Suspense>
        </Flex>
      </Container>
    </HydrationBoundary>
  );
}
