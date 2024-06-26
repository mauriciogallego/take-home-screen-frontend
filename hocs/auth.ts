import { getSession } from 'next-auth/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { CustomerSession, CustomGetServerSideProps } from '@/@types/index';

const withAuth = (fn: CustomGetServerSideProps): GetServerSideProps => {
  const resolve = async (context: GetServerSidePropsContext) => {
    const { req } = context;
    const session: CustomerSession | null = await getSession({ req });
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    const sspResult = await fn(context, session);
    return sspResult;
  };
  return resolve;
};

export default withAuth;
