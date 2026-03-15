'use client';

import { useCallback } from 'react';

import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { useController, useFormContext } from 'react-hook-form';

import { Button, Flex, Text } from '@/components/ui';
import { cn } from '@/lib/tailwind';
import type { PostFormSchema } from '@/schemas';

const ACCEPTED_IMAGE_TYPES = {
  'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
};

export function CoverImageUpload() {
  const { control } = useFormContext<PostFormSchema>();
  const {
    field,
    fieldState: { error },
  } = useController({ name: 'coverImage', control });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        field.onChange(file);
      }
    },
    [field],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxFiles: 1,
    multiple: false,
  });

  const preview = field.value ? URL.createObjectURL(field.value) : null;

  return (
    <Flex direction="column" className="gap-2">
      <Text as="label" className="text-sm font-medium">
        커버 이미지
      </Text>

      {preview ? (
        <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
          <Image src={preview} alt="커버 이미지 미리보기" fill className="object-cover" />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-2 right-2 bg-background/70 hover:bg-background"
            onClick={() => field.onChange(null)}
          >
            <X />
          </Button>
        </div>
      ) : (
        <Flex
          {...getRootProps()}
          direction="column"
          justifyContent="center"
          alignItems="center"
          className={cn(
            'cursor-pointer gap-2 rounded-lg border-2 border-dashed px-4 py-10 transition-colors',
            isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50',
          )}
        >
          <input {...getInputProps()} />
          <ImagePlus className="size-8 text-muted-foreground" />
          <Text className="text-sm text-muted-foreground">
            {isDragActive ? '여기에 놓으세요' : '클릭하거나 이미지를 드래그하세요'}
          </Text>
          <Text className="text-xs text-muted-foreground/60">PNG, JPG, JPEG, WebP</Text>
        </Flex>
      )}

      {error && <Text className="text-sm text-destructive">{error.message}</Text>}
    </Flex>
  );
}
