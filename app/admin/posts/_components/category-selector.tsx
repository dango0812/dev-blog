'use client';

import { useController, useFormContext } from 'react-hook-form';

import { Button, Flex, Text } from '@/components/ui';
import { POST_TYPES, TYPE_LABEL } from '@/constants';
import type { PostFormSchema } from '@/schemas';

export function CategorySelector() {
  const { control } = useFormContext<PostFormSchema>();
  const {
    field,
    fieldState: { error },
  } = useController({ name: 'type', control });

  return (
    <Flex direction="column" className="gap-2">
      <Text as="label" className="text-sm font-medium">
        타입
      </Text>

      <Flex className="gap-2">
        {POST_TYPES.map(type => (
          <Button
            key={type}
            type="button"
            size="sm"
            variant={field.value === type ? 'destructive' : 'outline'}
            aria-pressed={field.value === type}
            onClick={() => field.onChange(type)}
          >
            {TYPE_LABEL[type]}
          </Button>
        ))}
      </Flex>

      {error && <Text className="text-sm text-destructive">{error.message}</Text>}
    </Flex>
  );
}
