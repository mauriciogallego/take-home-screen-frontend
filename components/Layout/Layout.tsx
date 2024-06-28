import { ReactElement, FC } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AccessLayout from '@/components/LoginRegisterLayout/LoginRegisterLayout';
import Spinner from '@/components/Spinner/Spinner';
import NavBar from '../Navbar/NavBar';
import { emptyLayout } from './constants';
import EmptyLayout from './EmptyLayout';

type Props = {
  children: ReactElement;
};

const Layout: FC<Props> = ({ children }: Props) => {
  const { pathname } = useRouter();
  if (pathname === '/login') {
    return <AccessLayout>{children}</AccessLayout>;
  }
  if (emptyLayout.includes(pathname)) {
    return <EmptyLayout>{children}</EmptyLayout>;
  }

  return (
    <>
      <Head>
        <title>WEB APP</title>
        <meta name="description" content="WEB APP" />
      </Head>
      <Spinner />
      <div className="h-screen">
        <NavBar>
          <main className="w-full h-full">
            <div className="max-w-6xl m-auto h-full">{children}</div>
          </main>
        </NavBar>
      </div>
    </>
  );
};

export default Layout;
