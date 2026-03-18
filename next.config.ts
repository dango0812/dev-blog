import type { NextConfig } from 'next';

import '@/lib/env';

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['turbopack-inline-svg-loader'],
        condition: {
          content: /^[\s\S]{0,4000}$/, // 약 4KB 이하의 작은 파일만 인라인화
        },
        as: '*.js',
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/posts/2026/nextjs',
        destination: '/vercel-nextjs-open-source-contribution/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
