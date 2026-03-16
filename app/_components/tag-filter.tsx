'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button, Flex } from '@/components/ui';
import { POST_TAGS } from '@/constants';
import { cn } from '@/lib/tailwind';

export function TagFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tag === 'all') {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Flex className="gap-2 overflow-x-auto pb-1">
      <Button
        type="button"
        size="sm"
        variant="ghost"
        aria-pressed={!activeTag}
        className={cn(
          'h-8 shrink-0 rounded-full px-4',
          !activeTag && 'bg-foreground text-background hover:bg-foreground/90 hover:text-background',
        )}
        onClick={() => handleTagClick('all')}
      >
        전체
      </Button>

      {POST_TAGS.map(tag => (
        <Button
          key={tag}
          type="button"
          size="sm"
          variant="ghost"
          aria-pressed={activeTag === tag}
          className={cn(
            'h-8 shrink-0 rounded-full px-4',
            activeTag === tag && 'bg-foreground text-background hover:bg-foreground/90 hover:text-background',
          )}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </Button>
      ))}
    </Flex>
  );
}
