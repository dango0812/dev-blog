import { cache } from 'react';

import db from '@/lib/neon-database';

import { type PostFormSchema, postSchema } from './post.schema';

export type { Post, PostFormSchema } from './post.schema';
export { postFormSchema, postSchema } from './post.schema';

/**
 * slug로 게시글 단건 조회
 *
 * @param {string} slug - 조회할 게시글의 slug
 * @returns {Post | null} 게시글 객체 또는 `null` (존재하지 않을 경우)
 *
 * @example
 * const post = await getPostBySlug('blog-post');
 */
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

/**
 * 게시글 목록 조회
 *
 * @param {string | null} tag - 필터링할 태그 (없으면 전체 조회)
 * @returns {Post[]} 게시글 배열 (최신순 정렬)
 *
 * @example
 * const allPosts = await getPosts();
 * const frontendPosts = await getPosts('Frontend');
 */
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

/**
 * 게시글 생성
 *
 * @param {PostFormSchema} data - 게시글 폼 데이터
 * @returns {Post} 생성된 게시글 객체
 *
 * @example
 * const post = await createPost({ slug: 'blog', title: '블로그', type: 'tech', tag: '2026', content: '<p>...</p>', coverUrl: null });
 */
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

/**
 * 게시글 수정
 *
 * @param {string} slug - 수정할 게시글의 원본 slug
 * @param {PostFormSchema} data - 수정할 게시글 폼 데이터
 * @returns {Post | null} 수정된 게시글 객체 또는 `null` (존재하지 않을 경우)
 *
 * @example
 * const updated = await updatePost('blog', { slug: 'blog-posts', title: '수정', ... });
 */
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

/**
 * 게시글 삭제
 *
 * @param {string} slug - 삭제할 게시글의 slug
 * @returns {boolean} 삭제 성공 여부
 *
 * @example
 * const response = await deletePost('blog');
 * console.log(response); // true (삭제 성공) 또는 false (게시글이 존재하지 않음)
 */
export async function deletePost(slug: string) {
  const rows = await db`
    DELETE FROM posts
    WHERE slug = ${slug}
    RETURNING id
  `;

  return rows.length > 0;
}
