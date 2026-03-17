import { GITHUB_URL, SITE_CONFIG } from '@/constants';
import { env } from '@/lib/env';
import type { Post } from '@/services/post';
import { generatePostDescription } from '@/utils/metadata/generate-post-description';

const BASE_URL = env.NEXT_PUBLIC_APP_URL;

export function getArticleSchema(post: Post) {
  const postUrl = `${BASE_URL}/${post.slug}`;

  // 날짜가 ISO 형식이 아닐 경우를 대비
  const datePublished = new Date(post.createdAt).toISOString();
  const dateModified = post.updatedAt ? new Date(post.updatedAt).toISOString() : datePublished;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}/#article`,

    headline: post.title,
    description: generatePostDescription(post.content),
    articleSection: post.type,
    keywords: post.tag,

    url: postUrl,
    datePublished,
    dateModified,

    ...(post.coverUrl && {
      image: {
        '@type': 'ImageObject',
        url: post.coverUrl,
        width: 1200,
        height: 630,
      },
    }),

    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: GITHUB_URL,
      jobTitle: 'Frontend Engineer',
    },

    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },

    isPartOf: {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: SITE_CONFIG.name,
    },

    inLanguage: 'ko-KR',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  } as const;
}
