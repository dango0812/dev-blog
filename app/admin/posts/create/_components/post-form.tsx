'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import { Button, Flex } from '@/components/ui';
import { type PostFormSchema, postFormSchema } from '@/schemas';

import { ContentEditor } from './content-editor';
import { CoverImageUpload } from './cover-image-upload';
import { SlugField } from './slug-field';
import { TagSelector } from './tag-selector';
import { TitleField } from './title-field';

const defaultValues: PostFormSchema = {
  slug: '',
  coverImage: null,
  title: '',
  tag: 'tech',
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

  const onSubmit: SubmitHandler<PostFormSchema> = data => {
    console.warn(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" className="gap-6">
          <SlugField />
          <TitleField />
          <CoverImageUpload />
          <TagSelector />
          <ContentEditor />
          <Flex justifyContent="flex-end">
            <Button type="submit" size="lg" className="h-11 px-8 py-2.5" disabled={isSubmitting}>
              게시하기
            </Button>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
}
