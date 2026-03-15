'use client';

import { useController, useFormContext } from 'react-hook-form';

import { Button, Flex, Text } from '@/components/ui';
import { POST_TAGS, TAG_LABEL } from '@/constants';
import type { PostFormSchema } from '@/schemas';

export function TagSelector() {
  const { control } = useFormContext<PostFormSchema>();
  const {
    field,
    fieldState: { error },
  } = useController({ name: 'tag', control });

  return (
    <Flex direction="column" className="gap-2">
      <Text as="label" className="text-sm font-medium">
        태그
      </Text>

      <Flex className="gap-2">
        {POST_TAGS.map(tag => (
          <Button
            key={tag}
            type="button"
            size="sm"
            variant={field.value === tag ? 'destructive' : 'outline'}
            aria-pressed={field.value === tag}
            onClick={() => field.onChange(tag)}
          >
            {TAG_LABEL[tag]}
          </Button>
        ))}
      </Flex>

      {error && <Text className="text-sm text-destructive">{error.message}</Text>}
    </Flex>
  );
}
