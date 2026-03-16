import { NextResponse } from 'next/server';

import db from '@/lib/neon-database';
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
