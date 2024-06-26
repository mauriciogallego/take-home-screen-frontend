import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/Layout/Layout';
import LoadingProvider from '@/context/LoadingContext';
import ToastProvider from '@/context/ToastContext';
import { useQueryClient } from '@/hooks/useQueryClient';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <LoadingProvider>
          <ToastProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ToastProvider>
        </LoadingProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
