import { z } from 'zod';

/** GitHub OAuth 토큰 스키마 */
export const tokenSchema = z.object({
  access_token: z.string(),
  error: z.string().optional(),
});

/** GitHub 사용자 스키마 */
export const userSchema = z.object({
  id: z.number(),
  login: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  avatar_url: z.string().url(),
});

/** GitHub 사용자 타입 */
export type GitHubUser = z.infer<typeof userSchema>;
