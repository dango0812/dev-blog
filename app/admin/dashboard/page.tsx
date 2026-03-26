import type { Metadata } from 'next';
import Link from 'next/link';

import { Button, Container, Flex, Text } from '@/components/ui';
import { PATHS } from '@/constants';
import { getPosts } from '@/services/post';

import { DashboardStats } from './_components/dashboard-stats';
import { PostsTable } from './_components/posts-table';

export const metadata: Metadata = {
  title: '관리자 대시보드',
  description: '블로그 관리자 대시보드입니다.',
};

export default async function DashboardPage() {
  const posts = await getPosts();

  return (
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

        <DashboardStats totalPosts={posts.length} />

        <Flex direction="column" className="gap-3">
          <Text as="h2" className="text-lg font-semibold">
            게시글 목록
          </Text>
          <PostsTable posts={posts} />
        </Flex>
      </Flex>
    </Container>
  );
}
