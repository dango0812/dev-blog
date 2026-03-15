'use client';

import { useController, useFormContext } from 'react-hook-form';

import { Flex, Input, Text } from '@/components/ui';
import type { PostFormSchema } from '@/schemas';

export function SlugField() {
  const { control } = useFormContext<PostFormSchema>();
  const {
    field,
    fieldState: { error },
  } = useController({ name: 'slug', control });

  return (
    <Flex direction="column" className="gap-2">
      <Text as="label" htmlFor="slug" className="text-sm font-medium">
        슬러그
      </Text>

      <Input id="slug" placeholder="first-post" autoComplete="off" {...field} />

      {error && <Text className="text-sm text-destructive">{error.message}</Text>}
    </Flex>
  );
}
