import { z } from 'zod';

export const tokenSchema = z.object({
  access_token: z.string(),
  error: z.string().optional(),
});

export const userSchema = z.object({
  id: z.number(),
  login: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  avatar_url: z.string().url(),
});

export type GitHubUser = z.infer<typeof userSchema>;
