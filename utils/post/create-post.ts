import db from '@/lib/neon-database';
import { type PostFormSchema, postSchema } from '@/model/post';

export async function createPost(data: PostFormSchema) {
  const { slug, title, type, tag, content, coverUrl } = data;

  const rows = await db`
    INSERT INTO posts (slug, title, type, tag, content, cover_url)
    VALUES (${slug}, ${title}, ${type}, ${tag}, ${content}, ${coverUrl})
    RETURNING
      id, slug, title, type, tag, content,
      cover_url   AS "coverUrl",
      created_at  AS "createdAt",
      updated_at  AS "updatedAt"
  `;

  return postSchema.parse(rows[0]);
}
