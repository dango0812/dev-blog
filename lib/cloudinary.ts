import crypto from 'node:crypto';

/* Cloudinary 서명 생성 (SHA-1, 파라미터 알파벳순 정렬) */
export function cloudinarySignature(params: Record<string, string>, apiSecret: string): string {
  const sorted = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

  return crypto
    .createHash('sha1')
    .update(sorted + apiSecret)
    .digest('hex');
}
