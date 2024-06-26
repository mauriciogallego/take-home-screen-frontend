import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';

export const useQueryClient = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 20000,
            retry: 2,
          },
        },
      }),
  );

  return queryClient;
};
