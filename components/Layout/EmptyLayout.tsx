import { ReactElement, FC } from 'react';
import Head from 'next/head';
import Spinner from '@/components/Spinner/Spinner';

type Props = {
  children: ReactElement;
};

const EmptyLayout: FC<Props> = ({ children }: Props) => (
  <>
    <Head>
      <title>WEB APP</title>
      <meta name="description" content="WEB APP" />
    </Head>
    <Spinner />
    <div className="flex-1 w-full">
      <main className="w-full h-full">
        <div className="max-w-7xl m-auto h-full">{children}</div>
      </main>
    </div>
  </>
);

export default EmptyLayout;
