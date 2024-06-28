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
    {children}
  </>
);

export default EmptyLayout;
