import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { ErrorComponent } from '@/components/errorComponent/errorComponent';

const Custom404: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <ErrorComponent
      statusCode="404"
      title={t('pageNotFound')}
      subtitle={t('pageNotFound2')}
    />
  );
};

export default Custom404;

export const getStaticProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});
