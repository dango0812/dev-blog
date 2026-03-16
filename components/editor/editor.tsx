'use client';

import { useEffect, useRef } from 'react';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Table as TableExtension } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Typography from '@tiptap/extension-typography';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';

import { cn } from '@/lib/tailwind';

import { EditorToolbar } from './editor-toolbar';
import { useEditorImage } from './use-editor-image';
import { useEditorLink } from './use-editor-link';

import 'highlight.js/styles/atom-one-dark.css';

const lowlight = createLowlight(common);

const STATIC_EXTENSIONS = [
  StarterKit.configure({ codeBlock: false }),
  CodeBlockLowlight.configure({ lowlight }),
  ImageExtension,
  LinkExtension.configure({ openOnClick: false }),
  Typography,
  TableExtension.configure({ resizable: false }),
  TableRow,
  TableHeader,
  TableCell,
];

// ProseMirror 에디터 영역 Tailwind 스타일
const PROSE_CLASSES = cn(
  'prose prose-sm max-w-none px-4 py-3 dark:prose-invert',
  '[&_.ProseMirror]:min-h-72',
  '[&_.ProseMirror]:outline-none',
  '[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none',
  '[&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left',
  '[&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0',
  '[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground',
  '[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
  '[&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:table-fixed [&_.ProseMirror_table]:border-collapse',
  `[&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-border [&_.ProseMirror_th]:bg-muted [&_.ProseMirror_th]:px-3
[&_.ProseMirror_th]:py-2 [&_.ProseMirror_th]:text-left [&_.ProseMirror_th]:font-semibold`,
  `[&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-border [&_.ProseMirror_td]:px-3 [&_.ProseMirror_td]:py-2
[&_.ProseMirror_td]:align-top`,
  '[&_.ProseMirror_.selectedCell]:bg-primary/10',
);

interface EditorProps {
  value?: string;
  onChange?: (html: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
}

export function Editor({ value = '', onChange, onBlur, placeholder = '내용을 입력하세요...', className }: EditorProps) {
  // 콜백을 ref로 안정화: 부모가 새 함수 레퍼런스를 넘겨도 useEditor가 재초기화되지 않음
  const onChangeRef = useRef(onChange);
  const onBlurRef = useRef(onBlur);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onBlurRef.current = onBlur;
  }, [onBlur]);

  // editor 인스턴스 생성
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [...STATIC_EXTENSIONS, Placeholder.configure({ placeholder })],
    content: value,
    onUpdate: ({ editor: e }) => {
      onChangeRef.current?.(e.isEmpty ? '' : e.getHTML());
    },
    onBlur: () => {
      onBlurRef.current?.();
    },
  });

  const handleLink = useEditorLink(editor);
  const { inputRef, handleImageClick, handleFileChange } = useEditorImage(editor);

  return (
    <div
      className={cn(
        `rounded-lg border border-input transition-colors focus-within:border-ring focus-within:ring-3
focus-within:ring-ring/50`,
        className,
      )}
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <EditorToolbar editor={editor} onLinkClick={handleLink} onImageClick={handleImageClick} />
      <EditorContent editor={editor} className={PROSE_CLASSES} />
    </div>
  );
}
