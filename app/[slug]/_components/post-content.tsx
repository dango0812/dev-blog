'use client';

import { EditorContent, useEditor } from '@tiptap/react';

import { STATIC_EXTENSIONS } from '@/components/editor/config';
import { cn } from '@/lib/tailwind';

// View 영역 Tailwind 스타일
const PROSE_CLASSES = cn(
  'prose max-w-none prose-neutral dark:prose-invert',
  'prose-headings:font-bold prose-headings:tracking-tight',
  'prose-p:my-2',
  'prose-li:my-0 prose-li:text-foreground [&_li::marker]:text-foreground',
  '[&_p:empty]:min-h-[1em]',
  'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
  `[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5
[&_:not(pre)>code]:text-sm [&_:not(pre)>code]:font-normal [&_:not(pre)>code]:before:content-none
[&_:not(pre)>code]:after:content-none`,
  `prose-pre:overflow-hidden prose-pre:rounded-xl prose-pre:p-0 [&_pre_code]:block [&_pre_code]:overflow-x-auto
[&_pre_code]:p-4 [&_pre_code]:[tab-size:2]`,
  'prose-img:rounded-xl prose-img:shadow-md',
  '[&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded-lg',
  '[&_table]:w-full [&_table]:table-fixed [&_table]:border-collapse',
  '[&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold',
  '[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top',
);

export function PostContent({ content }: { content: string }) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: STATIC_EXTENSIONS,
    content,
  });

  return (
    <article>
      <EditorContent editor={editor} className={PROSE_CLASSES} />
    </article>
  );
}
