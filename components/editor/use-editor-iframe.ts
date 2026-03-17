import { useCallback } from 'react';

import type { Editor } from '@tiptap/react';

/** Iframe 삽입을 위한 커스텀 훅 */
export function useEditorIframe(editor: Editor | null) {
  return useCallback(() => {
    if (!editor) {
      return;
    }

    const url = window.prompt('iframe URL을 입력하세요', 'https://');
    if (!url) {
      return;
    }

    editor.chain().focus().setIframe({ src: url }).run();
  }, [editor]);
}
