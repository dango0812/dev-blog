import { notFound } from 'next/navigation';

import { Text } from '@/components/ui';
import { Container } from '@/components/ui/container';
import type { PostFormSchema } from '@/schemas';
import { getPostBySlug } from '@/services/post';

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

  const post = await getPostBySlug(slug);
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
