import { Calendar, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import { SchemaScript } from '@/components/schema-script';
import { Container, Flex, Text } from '@/components/ui';
import { Utterances } from '@/components/utterances';
import { env } from '@/lib/env';
import db from '@/lib/neon-database';
import type { Post } from '@/types';
import { formatDateKor } from '@/utils/date/format-date';
import { getArticleSchema } from '@/utils/metadata/article-schema';
import { generatePostDescription } from '@/utils/metadata/generate-post-description';

import { PostContent } from './_components/post-content';

interface PostDetailPageProps {
  params: Promise<{ slug: string }>;
}

// https://nextjs.org/docs/app/getting-started/fetching-data
// 캐싱과 재검증을 활용하여 데이터베이스 조회 최적화
const getPost = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    try {
      const rows = (await db`
        SELECT
          id, slug, title, type, tag, content,
          cover_url  AS "coverUrl",
          created_at AS "createdAt",
          updated_at AS "updatedAt"
        FROM posts
        WHERE slug = ${slug}
      `) as Post[];

      return rows[0] ?? null;
    } catch {
      return null;
    }
  },
  ['post-detail'],
  { tags: ['posts'], revalidate: 3600 },
);
export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

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
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SchemaScript schema={getArticleSchema(post)} />
      <Container maxWidth="md" className="px-6 py-10">
        <Flex direction="column" className="mb-10 gap-4">
          <Text as="h1" className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            {post.title}
          </Text>

          <Flex alignItems="center" className="gap-4 text-sm text-muted-foreground">
            <Flex alignItems="center" className="gap-1.5">
              <Calendar size={14} />
              <Text as="span">{formatDateKor(post.createdAt)}</Text>
            </Flex>

            {post.tag && (
              <Flex alignItems="center" className="gap-1.5">
                <Tag size={14} />
                <Text as="span">{post.type}</Text> | <Text as="span">{post.tag}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>

        <PostContent content={post.content} />

        <Utterances />
      </Container>
    </>
  );
}
