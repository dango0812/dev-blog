import { type ChangeEvent, useCallback, useRef } from 'react';

import type { Editor } from '@tiptap/react';
import { toast } from 'sonner';

import { API_ROUTES } from '@/constants';
import { http, isHttpError } from '@/lib/http';

interface UploadResponse {
  url: string;
}

export function useEditorImage(editor: Editor | null) {
  const inputRef = useRef<HTMLInputElement>(null);

  /** 숨김 파일 피커를 트리거 */
  const handleImageClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  /** 파일 선택 시 업로드 후 에디터에 이미지 삽입 */
  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      // 같은 파일 재선택을 허용하기 위해 즉시 초기화
      e.target.value = '';

      if (!file || !editor) {
        return;
      }

      const body = new FormData();
      body.append('file', file);

      try {
        const { url } = await http.post<UploadResponse>(API_ROUTES.UPLOAD_IMAGE, { body });
        editor.chain().focus().setImage({ src: url, alt: file.name }).run();
      } catch (error) {
        toast.error(isHttpError(error) ? error.message : '이미지 업로드 중 오류가 발생했어요');
      }
    },
    [editor],
  );

  return { inputRef, handleImageClick, handleFileChange };
}
