'use client';

import { Github, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import { Container, Flex, Text } from '@/components/ui';
import { Button, buttonVariants } from '@/components/ui/button';
import { GITHUB_URL, PATHS } from '@/constants';
import { useScrollTop } from '@/hooks/use-scroll-top';
import { cn } from '@/lib/tailwind';

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const { isScrollTop } = useScrollTop();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Flex
      as="header"
      alignItems="center"
      className={cn(
        'sticky top-0 z-50 bg-background/80 backdrop-blur-sm transition-[border-color] duration-200',
        isScrollTop ? 'border-b border-transparent' : 'border-b border-border',
      )}
    >
      <Container maxWidth="lg" className="px-6 py-4">
        <Flex justifyContent="space-between" alignItems="center">
          <Link href={PATHS.HOME}>
            <Text as="span" className="text-lg font-semibold tracking-tight">
              Donggyu
            </Text>
          </Link>

          <Flex alignItems="center" className="gap-1">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}
            >
              <Github />
            </Link>

            <Button type="button" aria-label="테마 전환" variant="ghost" size={'icon-sm'} onClick={toggleTheme}>
              <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
