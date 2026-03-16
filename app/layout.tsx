import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import { Header } from '@/components/layout/header';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SchemaScript } from '@/components/schema-script';
import { OPEN_GRAPH_URL, SITE_CONFIG } from '@/constants';
import { env } from '@/lib/env';
import { getWebSiteSchema } from '@/utils/metadata/website-schema';

import './globals.css';

const notoSansKR = Noto_Sans_KR({
  variable: '--font-notosans',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: env.NEXT_PUBLIC_APP_URL,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: 'website',
    images: [
      {
        url: OPEN_GRAPH_URL,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_CONFIG.shortName,
  },
  alternates: {
    canonical: env.NEXT_PUBLIC_APP_URL,
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" className={notoSansKR.variable} suppressHydrationWarning>
      <body>
        <SchemaScript schema={getWebSiteSchema()} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
