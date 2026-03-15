'use client';

import { useController, useFormContext } from 'react-hook-form';

import { Editor } from '@/components/editor';
import { Flex, Text } from '@/components/ui';
import type { PostFormSchema } from '@/schemas';

export function ContentEditor() {
  const { control } = useFormContext<PostFormSchema>();
  const {
    field,
    fieldState: { error },
  } = useController({ name: 'content', control });

  const { value, onChange, onBlur } = field;

  return (
    <Flex direction="column" className="gap-2">
      <Text as="label" className="text-sm font-medium">
        내용
      </Text>

      <Editor value={value} onChange={onChange} onBlur={onBlur} />

      {error && <Text className="text-sm text-destructive">{error.message}</Text>}
    </Flex>
  );
}
