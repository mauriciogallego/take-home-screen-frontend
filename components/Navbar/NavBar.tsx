import { ReactElement } from 'react';
import { UserOptions } from './User';
import { navigation } from './constant';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Each } from '../common/Each/Each';

type OpenSide = {
  children: ReactElement;
};

export default function NavBar({ children }: OpenSide) {
  const { t } = useTranslation(['common']);

  return (
    <main className="h-screen flex bg-[#1D2530]">
      <div className="h-full">
        <div className="px-[6px] py-2 flex items-center !w-[208px]"></div>
        <nav
          className="flex-col mt-3 space-y-1 !w-[208px] items-center"
          aria-label="Sidebar"
        >
          <Each
            of={navigation}
            render={(item) => (
              <Link
                className="flex cursor-pointer items-center hover:bg-[#13171F] group px-2 py-2 text-white"
                href={item.href}
              >
                <span className="ml-3 font-normal text-xs leading-4 tracking-wide text-neutro-400 py-1 group-active:text-[#E8EEF2]">
                  {t(item.name)}
                </span>
              </Link>
            )}
          />
        </nav>
      </div>
      <div className="flex flex-col w-full">
        <div className="bg-white flex items-center justify-end !h-[55px] py-4 shadow-md space-x-6 pr-[72px]">
          <UserOptions />
        </div>
        <div
          id="main-scroll"
          className="bg-neutro w-full overflow-y-auto h-full"
        >
          {children}
        </div>
      </div>
    </main>
  );
}
