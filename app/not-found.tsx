import Link from 'next/link';

import { Flex, Text } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Lottie } from '@/components/ui/lottie';
import { PATHS } from '@/constants';

export default function NotFound() {
  return (
    <Flex alignItems="center" justifyContent="center" className="min-h-[calc(100dvh-61px)]">
      <Flex direction="column" alignItems="center" className="gap-8 text-center">
        <Lottie src="/not-found.json" />

        <Flex direction="column" alignItems="center" className="gap-3">
          <Text as="h1" className="text-xl font-semibold text-foreground">
            페이지를 찾지 못했어요
          </Text>
          <Text className="max-w-xs leading-relaxed whitespace-pre-line text-muted-foreground">
            {`요청하신 페이지가 삭제되었거나\n주소가 잘못 입력되었을 수 있어요.`}
          </Text>
        </Flex>

        <Link href={PATHS.HOME}>
          <Button variant="default" size="lg" className="h-10 px-4 py-3">
            홈으로 가기
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
