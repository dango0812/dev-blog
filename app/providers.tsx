import type { PropsWithChildren } from 'react';

import { QueryProvider } from '@/components/providers/query';
import { ThemeProvider } from '@/components/providers/theme-provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
