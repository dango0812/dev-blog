import { notFound } from 'next/navigation';

import { Text } from '@/components/ui';
import { Container } from '@/components/ui/container';
import db from '@/lib/neon-database';
import type { PostFormSchema } from '@/schemas';
import type { Post } from '@/types';

import { PostForm } from '../_components/post-form';

interface EditPostPageProps {
  searchParams: Promise<{ slug?: string }>;
}

export async function generateMetadata() {
  return {
    title: '게시글 수정',
    description: '블로그 게시글을 수정하는 페이지입니다.',
  };
}

export default async function EditPostPage({ searchParams }: EditPostPageProps) {
  const { slug } = await searchParams;

  if (!slug) {
    notFound();
  }

  const rows = (await db`
    SELECT
      id, slug, title, type, tag, content,
      cover_url  AS "coverUrl",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM posts
    WHERE slug = ${slug}
  `) as Post[];

  const post = rows[0];
  if (!post) {
    notFound();
  }

  const initialData: PostFormSchema = {
    slug: post.slug,
    coverUrl: post.coverUrl,
    title: post.title,
    type: post.type as PostFormSchema['type'],
    tag: post.tag as PostFormSchema['tag'],
    content: post.content,
  };

  return (
    <Container className="mx-auto max-w-3xl px-5 py-10">
      <Text as="h1" className="mb-8 text-2xl font-bold">
        게시글 수정
      </Text>
      <PostForm initialData={initialData} />
    </Container>
  );
}
