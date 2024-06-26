import { ReactElement, FC } from 'react';
import Image from 'next/legacy/image';
import PictureBackroung from '../../public/static/img/background.png';

type Props = {
  children: ReactElement | ReactElement[];
};

const LoginRegisterLayout: FC<Props> = ({ children }: Props) => (
  <main className="flex w-full">
    <div className="relative flex flex-col md:w-3/5 2xl:w-4/6 h-screen overflow-hidden">
      <Image
        layout="fill"
        objectFit="cover"
        src={PictureBackroung}
        alt="Login / Register background"
        placeholder="blur"
        priority
        quality={90}
      />
    </div>
    <div className="flex flex-col flex-grow items-center px-12 py-6 lg:py-12 overflow-y-auto h-screen overflow-hidden">
      {children}
    </div>
  </main>
);

export default LoginRegisterLayout;
