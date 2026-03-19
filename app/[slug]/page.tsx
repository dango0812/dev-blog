import { Calendar } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SchemaScript } from '@/components/schema-script';
import { Container, Flex, Text } from '@/components/ui';
import { Utterances } from '@/components/utterances';
import { env } from '@/lib/env';
import { getPostBySlug } from '@/services/post';
import { formatDateKor } from '@/utils/date/format-date';
import { getArticleSchema } from '@/utils/metadata/article-schema';
import { generatePostDescription } from '@/utils/metadata/generate-post-description';

import { PostContent } from './_components/post-content';

interface PostDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const description = generatePostDescription(post.content);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      tags: post.tag,
      ...(post.coverUrl && {
        images: [{ url: post.coverUrl, width: 1200, height: 630, alt: post.title }],
      }),
    },
    alternates: {
      canonical: `${env.NEXT_PUBLIC_APP_URL}/${post.slug}`,
    },
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SchemaScript schema={getArticleSchema(post)} />
      <Container maxWidth="md" className="px-6 py-10">
        <Flex direction="column" className="mb-20 gap-3">
          <Text as="h1" className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            {post.title}
          </Text>

          <Flex alignItems="center" className="gap-1.5 text-sm text-muted-foreground">
            <Calendar size={14} />
            <Text as="span">{formatDateKor(post.createdAt)}</Text>
          </Flex>
        </Flex>

        <PostContent content={post.content} />

        <Utterances />
      </Container>
    </>
  );
}
