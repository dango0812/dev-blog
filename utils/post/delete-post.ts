import db from '@/lib/neon-database';

export async function deletePost(slug: string) {
  const rows = await db`
    DELETE FROM posts
    WHERE slug = ${slug}
    RETURNING id
  `;

  return rows.length > 0;
}
