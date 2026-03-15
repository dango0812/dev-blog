import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

import { env } from '@/lib/env';

import 'server-only';

/** Neon HTTP 쿼리 함수 타입 */
type NeonClient = NeonQueryFunction<false, false>;

declare global {
  var neonClient: NeonClient | undefined;
}

/**
 * Neon serverless 클라이언트 생성
 */
function createClient(): NeonClient {
  return neon(env.DATABASE_URL);
}

/**
 * Neon serverless DB 클라이언트
 *
 * - 개발: HMR 시 인스턴스 재생성 방지를 위해 globalThis에 캐싱
 * - 프로덕션: 콜드 스타트마다 새 인스턴스 생성
 */
const db = globalThis.neonClient ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.neonClient = db;
}

export default db;
