import { Container, Flex } from '@/components/ui';

import { PostList } from './_components/post-list';
import { TagFilter } from './_components/tag-filter';

export default function HomePage() {
  return (
    <main>
      <Container maxWidth="lg" className="px-6 py-10">
        <Flex direction="column" className="gap-8">
          <TagFilter />
          <PostList />
        </Flex>
      </Container>
    </main>
  );
}
