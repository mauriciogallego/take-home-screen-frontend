import { ReactElement } from 'react';
import { UserOptions } from './User';

type OpenSide = {
  children: ReactElement;
};

export default function NavBar({ children }: OpenSide) {
  return (
    <div className="h-full flex bg-[#1D2530]">
      <div className="px-[6px] py-2 flex items-center !w-[208px]" />
      <div className="flex flex-col w-full">
        <div className="bg-white flex items-center justify-end !h-[55px] py-4 shadow-md space-x-6 pr-[32px]">
          <UserOptions />
        </div>
        <div
          id="main-scroll"
          className="bg-neutro w-full overflow-y-auto h-full"
        >
          {children}
        </div>
      </div>
    </div>
  );
}