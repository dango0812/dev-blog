import parse from 'html-react-parser';

import { sanitizeHtml } from '@/lib/dompurify';
import { cn } from '@/lib/tailwind';

export function PostContent({ content }: { content: string }) {
  return (
    <article
      className={cn(
        'prose max-w-none prose-neutral dark:prose-invert',
        'prose-headings:font-bold prose-headings:tracking-tight',
        'prose-h1:hidden',
        'prose-p:my-2',
        'prose-li:my-0 prose-li:text-foreground [&_li::marker]:text-foreground',
        '[&_p:empty]:min-h-[1em]',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        `prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
prose-code:font-normal prose-code:before:content-none prose-code:after:content-none`,
        'prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:p-0',
        'prose-img:rounded-xl prose-img:shadow-md',
        '[&_table]:w-full [&_table]:table-fixed [&_table]:border-collapse',
        `[&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left
[&_th]:font-semibold`,
        '[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top',
      )}
    >
      {parse(sanitizeHtml(content))}
    </article>
  );
}
