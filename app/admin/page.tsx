import { Github } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Text } from '@/components/ui/text';
import { SITE_CONFIG } from '@/constants';
import { AUTH_ERROR_MESSAGES } from '@/constants/auth';
import { OAUTH_ROUTES } from '@/constants/routes';
import { env } from '@/lib/env';

export const metadata: Metadata = {
  title: '관리자 로그인',
  description: `${SITE_CONFIG.name} 관리자 로그인 페이지입니다.`,
};

const params = new URLSearchParams({
  client_id: env.GITHUB_CLIENT_ID,
  redirect_uri: env.GITHUB_REDIRECT_URI,
  scope: 'read:user user:email',
});

const GITHUB_AUTH_URL = `${OAUTH_ROUTES.GITHUB.AUTH}?${params}`;

interface AdminSignInPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminSignInPage({ searchParams }: AdminSignInPageProps) {
  const { error } = await searchParams;
  const errorMessage = error && AUTH_ERROR_MESSAGES[error];

  return (
    <Flex alignItems="center" justifyContent="center" className="min-h-[calc(100vh-65px)] px-4">
      <Flex
        direction="column"
        alignItems="center"
        className="w-full max-w-sm gap-8 rounded-2xl border border-border bg-card p-10 shadow-sm"
      >
        <Flex direction="column" alignItems="center" className="gap-3">
          <Text as="h1" className="text-2xl font-bold tracking-tight">
            관리자 로그인
          </Text>
          <Text as="p" className="text-center text-sm text-muted-foreground">
            블로그 주인의 Github 계정이 아니면 로그인할 수 없어요.
          </Text>
        </Flex>

        {errorMessage && (
          <Flex className="w-full rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
            <Text as="p" className="text-sm text-destructive">
              {errorMessage}
            </Text>
          </Flex>
        )}

        <Link href={GITHUB_AUTH_URL} className="w-full">
          <Button size="lg" className="w-full gap-2 py-6">
            <Github className="size-5" />
            GitHub 로그인
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
