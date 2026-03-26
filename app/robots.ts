import type { MetadataRoute } from 'next';

import { PATHS } from '@/constants';
import { env } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: PATHS.HOME,
      disallow: `${PATHS.ADMIN.ROOT}/`,
    },
    sitemap: `${env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
