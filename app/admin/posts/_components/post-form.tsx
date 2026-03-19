'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button, Flex, Spinner } from '@/components/ui';
import { API_ROUTES } from '@/constants';
import { type PostFormSchema, postFormSchema } from '@/services/post.schema';

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

interface PostFormProps {
  initialData?: PostFormSchema;
}

export function PostForm({ initialData }: PostFormProps) {
  const isEditMode = Boolean(initialData);

  const methods = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    defaultValues: initialData ?? defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<PostFormSchema> = async data => {
    try {
      const url = isEditMode ? API_ROUTES.POSTS.UPDATE(initialData!.slug) : API_ROUTES.POSTS.CREATE;
      const method = isEditMode ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error } = (await res.json()) as { error: string };
        toast.error(error);
        return;
      }

      const successMsg = isEditMode ? '게시글이 성공적으로 수정되었어요' : '게시글이 성공적으로 생성되었어요';
      toast.success(successMsg);
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
              {isEditMode ? '수정하기' : '게시하기'}
              {isSubmitting && <Spinner data-icon="inline-start" />}
            </Button>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
}
