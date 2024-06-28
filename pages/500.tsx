import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { ErrorComponent } from '@/components/errorComponent/errorComponent';

const Custom500: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <ErrorComponent
      statusCode="500"
      title={t('internalServerError')}
      subtitle={t('serviceNotAvailable')}
    />
  );
};

export default Custom500;

export const getStaticProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});
