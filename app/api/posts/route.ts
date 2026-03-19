import { NeonDbError } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

import { createPost, getPosts, postFormSchema } from '@/services/post';

/**
 * GET /api/posts
 *
 * 게시글 목록 조회 (최신순)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');

  try {
    const posts = await getPosts(tag);
    return NextResponse.json(posts, { status: 200 });
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

  try {
    const post = await createPost(result.data);
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    if (err instanceof NeonDbError && err.code === '23505') {
      return NextResponse.json({ error: '이미 사용 중인 슬러그예요' }, { status: 409 });
    }

    return NextResponse.json({ error: '서버 오류가 발생했어요' }, { status: 500 });
  }
}
