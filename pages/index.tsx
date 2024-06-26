/* eslint-disable consistent-return */
import withAuth from '../hocs/auth';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home = () => (
  <div>
    <main />
  </div>
);

export const getServerSideProps: GetServerSideProps = withAuth(
  async ({ locale }, session) => {
    return {
      props: {
        session,
        ...(await serverSideTranslations(locale as string, ['common'])),
      },
    };
  },
);

export default Home;
