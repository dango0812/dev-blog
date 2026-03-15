'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button, Flex, Spinner } from '@/components/ui';
import { API_ROUTES } from '@/constants';
import { type PostFormSchema, postFormSchema } from '@/schemas';

import { CategorySelector } from './category-selector';
import { ContentEditor } from './content-editor';
import { CoverImageUpload } from './cover-image-upload';
import { SlugField } from './slug-field';
import { TagSelector } from './tag-selector';
import { TitleField } from './title-field';

const defaultValues: PostFormSchema = {
  slug: '',
  coverUrl: null,
  title: '',
  type: 'tech',
  tag: '2026',
  content: '',
};

export function PostForm() {
  const methods = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<PostFormSchema> = async data => {
    try {
      const res = await fetch(API_ROUTES.POSTS.CREATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error } = (await res.json()) as { error: string };
        toast.error(error);
        return;
      }

      toast.success('게시글이 성공적으로 생성되었어요');
    } catch {
      toast.error('서버 오류가 발생했어요');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" className="gap-6">
          <SlugField />
          <TitleField />
          <CoverImageUpload />
          <CategorySelector />
          <TagSelector />
          <ContentEditor />

          <Flex justifyContent="flex-end">
            <Button type="submit" size="lg" className="h-11 px-5 py-2.5" disabled={isSubmitting}>
              게시하기
              {isSubmitting && <Spinner data-icon="inline-start" />}
            </Button>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
}
