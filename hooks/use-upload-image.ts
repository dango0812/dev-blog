import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_ROUTES, QUERY_KEYS } from '@/constants';
import { http } from '@/lib/http';

interface UploadResponse {
  url: string;
}
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const body = new FormData();
      body.append('file', file);

      const data = await http.post<UploadResponse>(API_ROUTES.UPLOAD_IMAGE, { body });

      if (!data.url) {
        throw new Error('업로드에 실패했어요');
      }

      return data.url;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.all });
    },
  });
}
