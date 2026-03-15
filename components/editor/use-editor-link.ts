import { useCallback } from 'react';

import type { Editor } from '@tiptap/react';

/**
 * Editor 링크 삽입/해제 액션을 반환하는 커스텀 훅
 *
 * `window.prompt`로 URL을 입력받아 선택 영역에 링크를 설정하거나,
 *
 * 빈 문자열 입력 시 기존 링크를 해제한다.
 */
export function useEditorLink(editor: Editor | null) {
  return useCallback(() => {
    if (!editor) {
      return;
    }

    const currentHref = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('링크 URL을 입력하세요', currentHref ?? 'https://');

    if (url === null) {
      return;
    }

    const chain = editor.chain().focus().extendMarkRange('link');

    if (url === '') {
      chain.unsetLink().run();
    } else {
      chain.setLink({ href: url }).run();
    }
  }, [editor]);
}
