import { useMutation } from '@tanstack/react-query';

import { API_ROUTES } from '@/constants';

/**
 * 이미지 업로드 훅
 *
 * @description Cloudinary API를 통해 이미지를 업로드하고 URL을 반환한다.
 *
 * @example
 * const { mutateAsync: upload, isPending } = useUploadImage();
 *
 * try {
 *   const url = await upload(file);
 *   console.log(url); // 'https://res.cloudinary.com/...'
 * } catch (err) {
 *   console.error(err.message); // 업로드에 실패했어요
 * }
 */
export function useUploadImage() {
  return useMutation({
    mutationFn: (file: File) => fetcherUploadImage(file),
  });
}

async function fetcherUploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append('file', file);

  const res = await fetch(API_ROUTES.UPLOAD_IMAGE, { method: 'POST', body });
  const data = await res.json();

  if (!res.ok || !data.url) {
    throw new Error(data.error ?? '업로드에 실패했어요');
  }

  return data.url;
}
