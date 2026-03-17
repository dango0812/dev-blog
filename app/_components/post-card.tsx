import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge, Flex, Text } from '@/components/ui';
import { PATHS } from '@/constants';
import { cn } from '@/lib/tailwind';
import type { Post } from '@/services/post';
import { formatDate } from '@/utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={PATHS.POST_DETAIL(post.slug)} className="group">
      <article>
        <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-muted">
          {post.coverUrl ? (
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <Flex
              justifyContent="center"
              alignItems="center"
              className="size-full bg-linear-to-br from-muted to-muted-foreground/10"
            >
              <ImageOff size={40} className="text-muted-foreground" />
            </Flex>
          )}
        </div>

        <Flex direction="column" className="mt-3 gap-2">
          <Badge
            className={cn('px-2 py-2.5 text-sm', {
              'bg-blue-100 text-blue-500': post.type === 'tech',
              'bg-orange-100 text-orange-600': post.type === 'insight',
            })}
          >
            {post.tag}
          </Badge>

          <Flex direction="column" className="gap-1">
            <Text as="h3" className="line-clamp-2 text-base leading-snug font-semibold text-foreground">
              {post.title}
            </Text>

            <Text as="span" className="text-xs text-muted-foreground">
              {formatDate(post.createdAt)}
            </Text>
          </Flex>
        </Flex>
      </article>
    </Link>
  );
}
