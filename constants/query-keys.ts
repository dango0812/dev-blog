export const QUERY_KEYS = {
  post: {
    all: ['posts'] as const,
    list: (tag?: string | null) => ['posts', 'list', { tag: tag ?? null }] as const,
    detail: (slug: string) => ['posts', slug] as const,
  },
};
