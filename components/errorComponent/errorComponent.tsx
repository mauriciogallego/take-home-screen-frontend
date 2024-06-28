import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Image from 'next/legacy/image';
import Button from '@/components/common/Button/Button';

export const ErrorComponent = ({
  title,
  subtitle,
  statusCode,
}: {
  statusCode: string;
  subtitle: string;
  title: string;
}) => {
  const { t } = useTranslation('common');
  const { push } = useRouter();

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="font-semibold text-center tracking-wider">
        <div className="text-secondary text-[120px] mb-[-30px]">
          {statusCode}
        </div>
        <div className="text-main text-xs mb-6">{t('error')}</div>
        <div className="text-black font-bold text-xl mb-6">{title}</div>
        <div className="text-neutro-300 font-normal text-mds">{subtitle}</div>

        <div className="mt-6  sm:flex justify-center">
          <Button
            variant="primary"
            className="w-[125px] inline-flex justify-center px-[24px] py-[12px] items-center"
            text={t('homePage')}
            onClick={() => push('/')}
          />
        </div>
      </div>
    </div>
  );
};
