import { NeonDbError } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

import { postFormSchema } from '@/schemas';
import { getPostBySlug, updatePost } from '@/services/post';

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
    const post = await getPostBySlug(slug);

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

  if (!result.success) {
    const message = result.error.issues[0]?.message ?? '유효하지 않은 데이터예요';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    const post = await updatePost(slug, result.data);

    if (!post) {
      return NextResponse.json({ error: '게시글을 찾지 못했어요' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    if (err instanceof NeonDbError && err.code === '23505') {
      return NextResponse.json({ error: '이미 사용 중인 슬러그예요' }, { status: 409 });
    }

    return NextResponse.json({ error: '서버 오류가 발생했어요' }, { status: 500 });
  }
}
