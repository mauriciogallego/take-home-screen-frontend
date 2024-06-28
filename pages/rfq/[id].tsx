import useRFQUnique from '@/hooks/queries/userRFQUnique';
import withAuth from 'hocs/auth';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type Props = {
  id: string;
};

const RfqDetails: NextPage<Props> = ({ id }) => {
  const { t } = useTranslation(['common']);
  const { data } = useRFQUnique({ id });

  return (
    <div className="w-full space-y-6 px-4 py-6">
      <h1 className="tracking-wider leading-3 text-mds">{t('rfqDetail')}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async ({ locale, query }) => {
    return {
      props: {
        id: query.id,
        ...(await serverSideTranslations(locale as string, ['common'])),
      },
    };
  },
);

export default RfqDetails;
