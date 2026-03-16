import SvgIcon from './ui/svg-icon';
import { Flex, Text } from './ui';

import EmptyContentIcon from '@/app/assets/empty-content.svg';

interface EmptyContentProps {
  title: string;
}

export function EmptyContent({ title }: EmptyContentProps) {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" className="gap-10 py-20">
      <SvgIcon src={EmptyContentIcon} width={400} height={200} className="text-muted-foreground" />
      <Text as="span" className="text-lg font-semibold text-muted-foreground dark:text-white">
        {title}
      </Text>
    </Flex>
  );
}
