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
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
