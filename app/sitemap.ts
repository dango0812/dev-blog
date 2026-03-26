import type { MetadataRoute } from 'next';
import { unstable_cache } from 'next/cache';

import { env } from '@/lib/env';
import { getPosts } from '@/services/post';

const getCachedPosts = unstable_cache(getPosts, ['sitemap-posts'], { revalidate: 86400 }); // 24시간마다 캐시 갱신

const LAST_MODIFIED_DATE = new Date();
const BASE_URL = env.NEXT_PUBLIC_APP_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cachedPosts = await getCachedPosts();

  const posts: MetadataRoute.Sitemap = cachedPosts.map(post => ({
    url: `${BASE_URL}/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED_DATE,
    },
    ...posts,
  ];
}
