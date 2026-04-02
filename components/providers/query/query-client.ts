import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';

const STALE_TIME = 24 * 60 * 60 * 1000; // 24시간

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
};

export const getQueryClient = cache(() => new QueryClient(queryClientConfig));
