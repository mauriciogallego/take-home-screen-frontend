import { GetServerSideProps, NextPage } from 'next';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { getSession, useSession, signIn } from 'next-auth/react';
import { useContext, useState } from 'react';
import { ToastContext } from '@/context/ToastContext';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { setToken } from '@/helper/api';
import { CustomerSession, DataLogin } from '@/@types/index';

const Login: NextPage = () => {
  const { showErrorMessage } = useContext(ToastContext);
  const router = useRouter();

  const { status }: { status: string } = useSession();
  const { t } = useTranslation(['common']);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [email, password] = useWatch({
    control,
    name: ['email', 'password'],
  });

  const onSubmit = async (data: DataLogin) => {
    setLoading(true);
    try {
      const response: any = await signIn('login', {
        ...data,
        redirect: false,
      });

      if (response?.error) {
        const error = JSON.parse(response.error);
        throw new Error(error);
      }

      const session: CustomerSession | null = await getSession();

      if (session?.accessToken) {
        setToken(session.accessToken);
        router.push('/');
      }
    } catch (error) {
      if (typeof error === 'string') {
        showErrorMessage(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || !email || !password || status === 'authenticated';

  return (
    <div className="flex flex-1 flex-col w-full space-y-8 text-sm lg:max-w-md justify-center">
      <div className="tracking-wider space-y-1 text-center mb-7">
        <p className="text-md font-semibold">{t('login')}</p>
        <p className="text-sm font-normal pt-1">{t('loginDescription')}</p>
      </div>

      <div className="flex flex-col space-y-3">
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2">
            <Input
              type="text"
              placeholder={t('writeEmail')}
              label={t('email')}
              error={errors?.email?.message}
              register={register('email', {
                required: true,
              })}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Input
              type="password"
              placeholder={t('writePassword')}
              label={t('password')}
              canSeePassword
              error={errors?.password?.message}
              register={register('password', {
                required: true,
              })}
            />
          </div>
          <div className="flex items-center justify-between pt-4">
            <Link href="/#">
              <p className="text-xs text-main tracking-wider cursor-pointer">
                {t('forgotPassword')}
              </p>
            </Link>
            <Button
              variant="primary"
              type="submit"
              disabled={disabled}
              text={t('login')}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
}) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { permanent: false, destination: '/' },
    };
  }

  return {
    props: {
      session,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default Login;
