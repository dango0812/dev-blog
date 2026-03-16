'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { EmptyContent } from '@/components/EmptyContent';
import { Flex } from '@/components/ui';
import { API_ROUTES } from '@/constants';
import type { Post } from '@/types';

import { PostCard } from './post-card';
import { PostListSkeleton } from './post-list-skeleton';

export function PostList() {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const url = activeTag ? `${API_ROUTES.POSTS.LIST}?tag=${encodeURIComponent(activeTag)}` : API_ROUTES.POSTS.LIST;

        const res = await fetch(url);
        const data = (await res.json()) as Post[];

        setPosts(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [activeTag]);

  if (isLoading) {
    return <PostListSkeleton />;
  }

  const isEmpty = posts.length === 0;
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
