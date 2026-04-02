import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import Link from 'next/link';

import { getQueryClient } from '@/components/providers/query';
import { Button, Container, Flex, Text } from '@/components/ui';
import { PATHS, QUERY_KEYS } from '@/constants';
import { getPosts } from '@/services/post';

import { DashboardStats } from './_components/dashboard-stats';
import { PostsTable } from './_components/posts-table';

export const metadata: Metadata = {
  title: '관리자 대시보드',
  description: '블로그 관리자 대시보드입니다.',
};

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.post.list(),
    queryFn: () => getPosts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container maxWidth="lg" className="px-6 py-10">
        <Flex direction="column" className="gap-8">
          <Flex justifyContent="space-between" alignItems="center">
            <Text as="h1" className="text-2xl font-bold">
              대시보드
            </Text>
            <Link href={PATHS.ADMIN.POSTS.CREATE}>
              <Button size={'lg'}>새 글 작성</Button>
            </Link>
          </Flex>

          <Suspense fallback={null}>
            <DashboardStats />
          </Suspense>

          <Flex direction="column" className="gap-3">
            <Text as="h2" className="text-lg font-semibold">
              게시글 목록
            </Text>
            <Suspense fallback={null}>
              <PostsTable />
            </Suspense>
          </Flex>
        </Flex>
      </Container>
    </HydrationBoundary>
  );
}
