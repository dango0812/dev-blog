'use client';

import { useSearchParams } from 'next/navigation';

import { EmptyContent } from '@/components/empty-content';
import { Flex } from '@/components/ui';
import { usePosts } from '@/hooks/use-posts';

import { PostCard } from './post-card';
import { PostListSkeleton } from './post-list-skeleton';

export function PostList() {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');

  const { data: posts, isLoading, isError } = usePosts({ tag: activeTag });

  if (isLoading) {
    return <PostListSkeleton />;
  }

  if (isError) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <EmptyContent title="게시글을 불러오지 못했어요" />
      </Flex>
    );
  }

  const isEmpty = !posts || posts.length === 0;
  if (isEmpty) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <EmptyContent title="아직 작성된 글이 없습니다" />
      </Flex>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
