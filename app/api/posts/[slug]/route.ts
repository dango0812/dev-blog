import { NextResponse } from 'next/server';

import db from '@/lib/neon-database';
import { postFormSchema } from '@/schemas';
import type { Post } from '@/types';

interface PostDetailRequestContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/posts/[slug]
 *
 * slug로 게시글 단건 조회
 */
export async function GET(_request: Request, { params }: PostDetailRequestContext) {
  const { slug } = await params;

  try {
    const rows = (await db`
      SELECT
        id, slug, title, type, tag, content,
        cover_url  AS "coverUrl",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM posts
      WHERE slug = ${slug}
    `) as Post[];

    const post = rows[0];

    if (!post) {
      return NextResponse.json({ error: '게시글을 찾지 못했어요' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch {
    return NextResponse.json({ error: '게시글을 불러오지 못했어요' }, { status: 500 });
  }
}

/**
 * PATCH /api/posts/[slug]
 *
 * 게시글 수정
 */
export async function PATCH(request: Request, { params }: PostDetailRequestContext) {
  const { slug } = await params;

  const result = postFormSchema.safeParse((await request.json()) ?? {});

  // request body가 유효하지 않을 때
  if (!result.success) {
    const message = result.error.issues[0]?.message ?? '유효하지 않은 데이터예요';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { slug: newSlug, title, type, tag, content, coverUrl } = result.data;

  try {
    const rows = (await db`
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
        id,
        slug,
        title,
        type,
        tag,
        content,
        cover_url   AS "coverUrl",
        created_at  AS "createdAt",
        updated_at  AS "updatedAt"
    `) as Post[];

    const post = rows[0];

    if (!post) {
      return NextResponse.json({ error: '게시글을 찾지 못했어요' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    if (err instanceof Error && err.message.includes('unique')) {
      return NextResponse.json({ error: '이미 사용 중인 슬러그예요' }, { status: 409 });
    }

    return NextResponse.json({ error: '서버 오류가 발생했어요' }, { status: 500 });
  }
}
