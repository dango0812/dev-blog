'use client';

import { useController, useFormContext } from 'react-hook-form';

import { Flex, Input, Text } from '@/components/ui';
import type { PostFormSchema } from '@/services/post.schema';

export function TitleField() {
  const { control } = useFormContext<PostFormSchema>();
  const {
    field,
    fieldState: { error },
  } = useController({ name: 'title', control });

  return (
    <Flex direction="column" className="gap-2">
      <Text as="label" htmlFor="title" className="text-sm font-medium">
        제목
      </Text>

      <Input id="title" placeholder="게시글 제목을 입력하세요" {...field} />

      {error && <Text className="text-sm text-destructive">{error.message}</Text>}
    </Flex>
  );
}
