import { Fragment, useState } from 'react';
import Router from 'next/router';
import { signOut } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { Menu, Transition } from '@headlessui/react';
import { removeToken } from '@/helper/api';
import useUser from '@/hooks/useUser';
import LogOut from '../../svg/log-out-icon';
import Profile from '../../svg/user';
import ModalConfirmation from '../modal/ModalConfirmation';

export const UserOptions = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user } = useUser();

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    setTimeout(async () => {
      await signOut({ redirect: false });
      removeToken();
      Router.push('/login');
      queryClient.clear();
    }, 100);
  };

  return (
    <>
      <ModalConfirmation
        title="¿Deseas cerrar sesión?"
        visible={isModalOpen}
        message="Si tienes formularios sin enviar asegúrate de guardarlos previamente."
        cancelText="Cancelar"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        confirmText="Cerrar sesión"
      />
      <Menu>
        <Menu.Button test-id="user-data-click">
          <div className="bg-[#1D2530] p-[6px] rounded-full border border-neutro shadow-xl">
            <Profile width="20" height="20" className="fill-white" />
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-20 right-24 top-14 w-[267px] shadow-md rounded-md focus:outline-none bg-[#FAFAFA] border border-[#E8EEF2]">
            <div className="p-3 flex items-center">
              <div>
                <div className="bg-[#1D2530] p-[9px] rounded-md">
                  <Profile width="18" className="fill-white" />
                </div>
              </div>
              <div className="px-2.5">
                <p className="text-xs font-medium tracking-wide leading-5">
                  {user?.email}
                </p>
              </div>
            </div>
            <div>
              <Menu.Item>
                {() => (
                  <div
                    aria-hidden="true"
                    onClick={handleLogout}
                    className="flex cursor-pointer bg-white text-gray-600 items-center px-5 py-5 text-sm rounded-b-md group border-t border-neutro"
                  >
                    <LogOut
                      width="19"
                      className="group-hover:fill-primary ml-[2px]"
                    />
                    <span className="flex-1 ml-3 font-normal tracking-wide text-xs group-hover:text-primary">
                      Cerrar sesión
                    </span>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
