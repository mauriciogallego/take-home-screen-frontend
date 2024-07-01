import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/Layout/Layout';
import LoadingProvider from '@/context/LoadingContext';
import ToastProvider from '@/context/ToastContext';
import QueryClient from '@/context/QueryClient';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <QueryClient>
          <LoadingProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LoadingProvider>
        </QueryClient>
      </ToastProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(App);
