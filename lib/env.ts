import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * 서버 및 클라이언트 환경 변수 스키마 정의
 *
 * 런타임에서 환경 변수가 누락되거나 타입이 틀리면 에러를 발생시켜 안전한 개발 환경을 보장합니다.
 */
export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    CLOUDINARY_API_URL: z.url(),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_SECRET_KEY: z.string().min(1),
    GITHUB_REDIRECT_URI: z.url(),
    GITHUB_USER_ID: z.string().min(1),
    GITHUB_LOGIN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    CLOUDINARY_API_URL: process.env.CLOUDINARY_API_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_SECRET_KEY: process.env.GITHUB_SECRET_KEY,
    GITHUB_REDIRECT_URI: process.env.GITHUB_REDIRECT_URI,
    GITHUB_USER_ID: process.env.GITHUB_USER_ID,
    GITHUB_LOGIN: process.env.GITHUB_LOGIN,
  },
});
