import { cache } from 'react';

import db from '@/lib/neon-database';
import { postSchema } from '@/model/post';

export const getPosts = cache(async (tag?: string | null) => {
  const rows = await db`
    SELECT
      id, slug, title, type, tag, content,
      cover_url  AS "coverUrl",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM posts
    ${tag ? db`WHERE tag = ${tag}` : db``}
    ORDER BY created_at DESC
  `;

  return postSchema.array().parse(rows);
});
