import { NextResponse } from 'next/server';

import db from '@/lib/neon-database';
import { postFormSchema } from '@/schemas';
import type { Post } from '@/types';

/**
 * GET /api/posts
 *
 * 게시글 목록 조회 (최신순)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');

  try {
    let rows: Post[];

    if (tag) {
      rows = (await db`
        SELECT
          id, slug, title, type, tag, content,
          cover_url  AS "coverUrl",
          created_at AS "createdAt",
          updated_at AS "updatedAt"
        FROM posts
        WHERE tag = ${tag}
        ORDER BY created_at DESC
      `) as Post[];
    } else {
      rows = (await db`
        SELECT
          id, slug, title, type, tag, content,
          cover_url  AS "coverUrl",
          created_at AS "createdAt",
          updated_at AS "updatedAt"
        FROM posts
        ORDER BY created_at DESC
      `) as Post[];
    }

    return NextResponse.json(rows ?? [], { status: 200 });
  } catch {
    return NextResponse.json({ error: '게시글을 불러오지 못했어요' }, { status: 500 });
  }
}

/**
 * POST /api/posts
 *
 * 새 게시글을 생성
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '잘못된 요청이에요' }, { status: 400 });
  }

  const result = postFormSchema.safeParse(body);

  if (!result.success) {
    const message = result.error.issues[0]?.message ?? '유효하지 않은 데이터예요';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { slug, title, type, tag, content, coverUrl } = result.data;

  try {
    const rows = await db`
      INSERT INTO posts (slug, title, type, tag, content, cover_url)
      VALUES (${slug}, ${title}, ${type}, ${tag}, ${content}, ${coverUrl})
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
    `;

    return NextResponse.json(rows[0] as Post, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message.includes('unique')) {
      return NextResponse.json({ error: '이미 사용 중인 슬러그예요' }, { status: 409 });
    }

    return NextResponse.json({ error: '서버 오류가 발생했어요' }, { status: 500 });
  }
}
