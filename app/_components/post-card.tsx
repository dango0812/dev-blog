import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge, Flex, Text } from '@/components/ui';
import { PATHS } from '@/constants';
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

        <Flex direction="column" className="mt-4 gap-0.5">
          <Badge className="bg-transparent p-0 text-sm font-medium text-blue-400">{post.tag}</Badge>

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
