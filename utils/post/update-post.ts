import db from '@/lib/neon-database';
import { type PostFormSchema, postSchema } from '@/model/post';

export async function updatePost(slug: string, data: PostFormSchema) {
  const { slug: newSlug, title, type, tag, content, coverUrl } = data;

  const rows = await db`
    UPDATE posts
    SET
      slug       = ${newSlug},
      title      = ${title},
      type       = ${type},
      tag        = ${tag},
      content    = ${content},
      cover_url  = ${coverUrl},
      updated_at = NOW()
    WHERE slug = ${slug}
    RETURNING
      id, slug, title, type, tag, content,
      cover_url   AS "coverUrl",
      created_at  AS "createdAt",
      updated_at  AS "updatedAt"
  `;

  if (!rows[0]) {
    return null;
  }

  return postSchema.parse(rows[0]);
}
