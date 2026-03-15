import type { NextConfig } from 'next';

import '@/lib/env';

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  },
};

export default nextConfig;
