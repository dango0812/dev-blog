import { Calendar, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SchemaScript } from '@/components/schema-script';
import { Container, Flex, Text } from '@/components/ui';
import { Utterances } from '@/components/utterances';
import { API_ROUTES } from '@/constants';
import { sanitizeHtml } from '@/lib/dompurify';
import { env } from '@/lib/env';
import { cn } from '@/lib/tailwind';
import type { Post } from '@/types';
import { formatDateKor } from '@/utils/date/format-date';
import { getArticleSchema } from '@/utils/metadata/article-schema';
import { generatePostDescription } from '@/utils/metadata/generate-post-description';

interface PostDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}${API_ROUTES.POSTS.DETAIL(slug)}`);

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as Post;
  } catch {
    return null;
  }
}

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

        <article
          className={cn(
            'prose max-w-none prose-neutral dark:prose-invert',
            'prose-headings:font-bold prose-headings:tracking-tight',
            'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
            `prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
prose-code:font-normal prose-code:before:content-none prose-code:after:content-none`,
            'prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:p-0',
            'prose-img:rounded-xl prose-img:shadow-md',
            '[&_table]:w-full [&_table]:table-fixed [&_table]:border-collapse',
            `[&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left
[&_th]:font-semibold`,
            '[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top',
          )}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
        />

        <Utterances />
      </Container>
    </>
  );
}
