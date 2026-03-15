import type { NextConfig } from 'next';

import '@/lib/env';

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true,
};

export default nextConfig;
