import { NextResponse } from 'next/server';

import { cloudinarySignature } from '@/lib/cloudinary';
import { env } from '@/lib/env';

const UPLOAD_URL = `${env.CLOUDINARY_API_URL}/${env.CLOUDINARY_CLOUD_NAME}/image/upload`;
const UPLOAD_FOLDER = 'blog';

interface CloudinarySuccessResponse {
  secure_url: string;
}

interface CloudinaryErrorResponse {
  error: { message: string };
}

type CloudinaryResponse = CloudinarySuccessResponse | CloudinaryErrorResponse;

function isCloudinaryError(data: CloudinaryResponse): data is CloudinaryErrorResponse {
  return 'error' in data;
}

/**
 * POST /api/upload/image
 *
 * Cloudinary 이미지 업로드
 */
export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: '잘못된 요청이에요' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: '파일이 없어요' }, { status: 400 });
  }

  // API Secret을 클라이언트에 노출하지 않기 위해 서버에서 서명을 생성하여 업로드 요청에 포함
  const timestamp = String(Math.round(Date.now() / 1000));
  const signature = cloudinarySignature({ folder: UPLOAD_FOLDER, timestamp }, env.CLOUDINARY_API_SECRET);

  const body = new FormData();
  body.append('file', file);
  body.append('folder', UPLOAD_FOLDER);
  body.append('timestamp', timestamp);
  body.append('api_key', env.CLOUDINARY_API_KEY);
  body.append('signature', signature);

  try {
    const res = await fetch(UPLOAD_URL, { method: 'POST', body });
    const data = (await res.json()) as CloudinaryResponse;

    if (!res.ok || isCloudinaryError(data)) {
      const message = isCloudinaryError(data) ? data.error.message : '업로드에 실패했어요';
      return NextResponse.json({ error: message }, { status: 502 });
    }

    return NextResponse.json({ url: data.secure_url });
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했어요' }, { status: 500 });
  }
}
