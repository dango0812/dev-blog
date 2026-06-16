import { cache } from 'react';

import db from '@/lib/neon-database';
import { postSchema } from '@/model/post';

export const getPostBySlug = cache(async (slug: string) => {
  const rows = await db`
    SELECT
      id, slug, title, type, tag, content,
      cover_url  AS "coverUrl",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM posts
    WHERE slug = ${slug}
  `;

  if (!rows[0]) {
    return null;
  }

  return postSchema.parse(rows[0]);
});
