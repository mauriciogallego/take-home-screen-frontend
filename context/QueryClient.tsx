import {
  QueryClientProvider,
  QueryClient as QueryClientTans,
} from '@tanstack/react-query';
import { FC, ReactElement, useContext, useState } from 'react';
import { ToastContext } from './ToastContext';

type Props = {
  children: ReactElement;
};

const QueryClient: FC<Props> = ({ children }) => {
  const { showErrorMessage } = useContext(ToastContext);
  const throwOnError = (error: any) => {
    if (error) {
      showErrorMessage();
    }
    return false;
  };
  const [queryClient] = useState(
    () =>
      new QueryClientTans({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 20000,
            retry: 2,
            throwOnError,
          },
          mutations: {
            onError: throwOnError,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClient;
