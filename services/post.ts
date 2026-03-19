import { cache } from 'react';

import db from '@/lib/neon-database';

import { type PostFormSchema, postSchema } from './post.schema';

export type { Post, PostFormSchema } from './post.schema';
export { postFormSchema, postSchema } from './post.schema';

/** slug로 게시글 단건 조회 (같은 렌더 패스 내 중복 호출 방지) */
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

/** 게시글 목록 조회 */
export async function getPosts(tag?: string | null) {
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
}

/** 게시글 생성 */
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

/** 게시글 수정 */
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
