/* eslint-disable consistent-return */
import withAuth from '../hocs/auth';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Table from '@/components/common/Table/Table';
import Input from '@/components/common/Input/Input';
import { useRouter } from 'next/router';
import { RFQ } from '../@types';
import { useMemo, useState } from 'react';
import { headerQuote } from '@/constants/headers';
import useQuoteList from '@/hooks/queries/useQuoteList';
import debounce from 'just-debounce-it';

const Quote = () => {
  const router = useRouter();
  const { t } = useTranslation(['common']);
  const [email, setEmail] = useState<string>('');

  const columns = useMemo(() => {
    return headerQuote.map((i) => ({
      ...i,
      Header: t(i.Header),
    }));
  }, []);

  const { list, fetchNextPage } = useQuoteList(email);

  const onClickButton = (type: string, row: RFQ) => {
    if (type === 'detail') {
      router.push(`/rfq/${row.id}`);
    }
  };

  const setDebounce = debounce((value: string) => setEmail(value), 750);

  return (
    <div className="w-full  flex-col space-y-6 pl-6 pr-6 pt-6">
      <div className="flex items-center justify-between w-full">
        <h1 className="tracking-wider leading-3 text-mds">{t('quote')}</h1>
      </div>
      <div className="flex m-w-full flex-col justify-end py-3 px-6 my-4 rounded-lg bg-white">
        <div className="m-3 grid grid-cols-3 gap-2">
          <Input
            register={{}}
            type="text"
            placeholder={t('email')}
            label={t('email')}
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

export default Quote;
