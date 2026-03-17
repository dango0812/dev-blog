import { Text } from '@/components/ui';
import { Container } from '@/components/ui/container';

import { PostForm } from '../_components/post-form';

export const metadata = {
  title: '게시글 작성',
  description: '블로그 새 글을 작성하는 페이지입니다.',
};

export default function CreatePostPage() {
  return (
    <Container className="mx-auto max-w-3xl px-5 py-10">
      <Text as="h1" className="mb-8 text-2xl font-bold">
        게시글 작성
      </Text>
      <PostForm />
    </Container>
  );
}
