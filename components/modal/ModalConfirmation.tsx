/* eslint-disable jsx-a11y/control-has-associated-label */
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { ModalProps } from '@/@types/index';
import Button from '@/components/common/Button/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ModalConfirmation({
  title,
  children,
  visible = false,
  message,
  subMessage,
  cancelText,
  onCancel = () => undefined,
  onConfirm = () => undefined,
  confirmText,
  isValid = true,
}: ModalProps) {
  const { t } = useTranslation(['common']);

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onCancel}
        test-id="modal-confirmation"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-2 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:pt-4 sm:pb-5 sm:pl-6 sm:pr-7">
              <div className="mr-3 flex h-7 flex justify-end">
                <button
                  type="button"
                  className="text-black hover:text-indigo-200 focus:outline-none"
                  onClick={onCancel}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-5 sm:text-left ">
                  <Dialog.Title
                    as="h3"
                    className="text-md leading-6 font-semibold text-gray-900 mb-5 tracking-wide"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2 ">
                    <p className="text-sm leading-6 text-neutro-200 font-light">
                      {message}
                    </p>
                  </div>
                  {subMessage && (
                    <div className="py-3 ">
                      <p className="text-sm leading-6 text-neutro-200 font-light">
                        {subMessage}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {children}
              <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                <Button
                  variant="primary"
                  className="w-full inline-flex justify-center px-[24px] py-[12px] sm:mt-0 sm:w-auto sm:ml-3"
                  text={confirmText || t('confirm')}
                  onClick={onConfirm}
                  disabled={!isValid}
                />
                <Button
                  variant="secondary"
                  className="mt-3 w-full inline-flex justify-center px-[24px] py-[12px] sm:mt-0 sm:w-auto"
                  text={cancelText || t('cancel')}
                  onClick={onCancel}
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
