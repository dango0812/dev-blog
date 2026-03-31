'use client';

import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { EmptyContent } from '@/components/empty-content';
import { Badge, Button, Flex } from '@/components/ui';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PATHS, type PostType, TYPE_LABEL } from '@/constants';
import { useDeletePost } from '@/hooks/use-delete-post';
import type { Post } from '@/services/post.schema';
import { formatDate } from '@/utils/date/format-date';

interface PostsTableProps {
  posts: Post[];
}

export function PostsTable({ posts }: PostsTableProps) {
  const router = useRouter();
  const { mutate: deletePost } = useDeletePost();

  const handleDelete = async (title: string, slug: string) => {
    if (!confirm(`"${title}" 게시글을 삭제할까요?`)) {
      return;
    }

    deletePost(slug, {
      onSuccess: () => {
        toast.success('게시글이 삭제되었어요');
        router.refresh();
      },
      onError: (err: Error) => {
        toast.error(err.message || '게시글 삭제에 실패했어요');
      },
    });
  };

  if (posts.length === 0) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <EmptyContent title="아직 작성된 게시글이 없습니다" />
      </Flex>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>제목</TableHead>
          <TableHead className="hidden sm:table-cell">Slug</TableHead>
          <TableHead className="hidden md:table-cell">분류</TableHead>
          <TableHead className="hidden md:table-cell">태그</TableHead>
          <TableHead className="hidden lg:table-cell">작성일</TableHead>
          <TableHead className="text-right">관리</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {posts.map(post => (
          <TableRow key={post.id}>
            <TableCell className="max-w-50 truncate font-medium">
              <Link href={PATHS.ADMIN.POSTS.EDIT(post.slug)}>{post.title}</Link>
            </TableCell>
            <TableCell className="hidden max-w-40 truncate text-muted-foreground sm:table-cell">{post.slug}</TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant="secondary">{TYPE_LABEL[post.type as PostType] ?? post.type}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant="outline">{post.tag}</Badge>
            </TableCell>
            <TableCell className="hidden text-muted-foreground lg:table-cell">{formatDate(post.createdAt)}</TableCell>
            <TableCell className="text-right">
              <Flex justifyContent="flex-end" className="gap-1">
                <Link
                  href={PATHS.ADMIN.POSTS.EDIT(post.slug)}
                  className={buttonVariants({ variant: 'ghost', size: 'icon-sm' })}
                >
                  <Pencil className="size-3.5" />
                </Link>
                <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(post.title, post.slug)}>
                  <Trash2 className="size-3.5 text-destructive" />
                </Button>
              </Flex>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
