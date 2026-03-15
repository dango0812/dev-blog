'use client';

import { useState } from 'react';

import { ImagePlus, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { useController, useFormContext } from 'react-hook-form';

import { Button, Flex, Text } from '@/components/ui';
import { API_ROUTES } from '@/constants';
import { cn } from '@/lib/tailwind';
import type { PostFormSchema } from '@/schemas';

const ACCEPTED_IMAGE_TYPES = { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] };

interface UploadResponse {
  url?: string;
  error?: string;
}

/**
 * 커버 이미지 업로드 필드
 *
 * 이미지 올리면 Cloudinary에 업로드하고, 반환된 URL을 폼에 저장한다.
 *
 * 이미지 삭제 버튼은 상태에서만 제거하고, 실제 이미지 삭제는 수행되지 않는다.
 */
export function CoverImageUpload() {
  const { control } = useFormContext<PostFormSchema>();
  const {
    field,
    fieldState: { error },
  } = useController({ name: 'coverUrl', control });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const body = new FormData();
      body.append('file', file);

      const res = await fetch(API_ROUTES.UPLOAD_IMAGE, { method: 'POST', body });
      const data = (await res.json()) as UploadResponse;

      if (!res.ok || !data.url) {
        setUploadError(data.error ?? '업로드에 실패했어요');
        return;
      }

      // 업로드 성공 시 반환된 URL을 폼 필드에 저장
      field.onChange(data.url);
    } catch {
      setUploadError('업로드 중 오류가 발생했어요');
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxFiles: 1,
    multiple: false,
    disabled: isUploading,
  });

  return (
    <Flex direction="column" className="gap-2">
      <Text as="label" className="text-sm font-medium">
        커버 이미지
      </Text>

      {field.value ? (
        <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
          <Image
            src={field.value}
            alt="커버 이미지 미리보기"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
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
            isDragActive && 'border-primary bg-primary/5',
            !isDragActive && !isUploading && 'border-muted-foreground/25 hover:border-primary/50',
            isUploading && 'cursor-not-allowed border-muted-foreground/25 opacity-60',
          )}
        >
          <input {...getInputProps()} />

          {isUploading ? (
            <>
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
              <Text className="text-sm text-muted-foreground">업로드 중...</Text>
            </>
          ) : (
            <>
              <ImagePlus className="size-8 text-muted-foreground" />
              <Text className="text-sm text-muted-foreground">
                {isDragActive ? '여기에 놓으세요' : '클릭하거나 이미지를 드래그하세요'}
              </Text>
              <Text className="text-xs text-muted-foreground/60">PNG, JPG, JPEG, WebP</Text>
            </>
          )}
        </Flex>
      )}

      {(error ?? uploadError) && <Text className="text-sm text-destructive">{error?.message ?? uploadError}</Text>}
    </Flex>
  );
}
