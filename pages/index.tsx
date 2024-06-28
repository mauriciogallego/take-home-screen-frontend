/* eslint-disable consistent-return */
import withAuth from '../hocs/auth';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Table from '@/components/common/Table/Table';
import Input from '@/components/common/Input/Input';
import { useRouter } from 'next/router';
import { RFQ } from '../@types';
import { useMemo } from 'react';
import { headerRFQ } from '@/constants/headers';
import useRFQList from '@/hooks/queries/useRFQList';

const Home = () => {
  const router = useRouter();
  const { t } = useTranslation(['common']);

  const columns = useMemo(() => {
    return headerRFQ.map((i) => ({
      ...i,
      Header: t(i.Header),
    }));
  }, []);

  const { list, fetchNextPage } = useRFQList();

  const onClickButton = (type: string, row: RFQ) => {
    if (type === 'detail') {
      router.push(`/rfq/${row.id}`);
    }
  };

  return (
    <div className="w-full  flex-col space-y-6 pl-6 pr-6 pt-6">
      <div className="flex items-center justify-between w-full">
        <h1 className="tracking-wider leading-3 text-mds">{t('rfq')}</h1>
      </div>
      <div className="flex m-w-full flex-col justify-end py-3 px-6 my-4 rounded-lg bg-white">
        <div className="m-3 grid grid-cols-3 gap-2">
          <Input
            register={{}}
            type="text"
            placeholder={t('name')}
            label={t('name')}
          />
        </div>
      </div>
      <div className="divide-y">
        <Table
          columns={columns}
          data={list}
          loadMore={fetchNextPage}
          clickButton={onClickButton}
        />
      </div>
    </div>
  );
};

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
