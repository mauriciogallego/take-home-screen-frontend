import Button from '@/components/common/Button/Button';
import { Each } from '@/components/common/Each/Each';
import { useCreateQuote } from '@/hooks/mutations/useCreateQuote';
import useRFQUnique from '@/hooks/queries/userRFQUnique';
import { ToastContext } from '@/context/ToastContext';
import { Disclosure } from '@headlessui/react';
import {
  ChevronLeftIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from '@heroicons/react/24/outline';
import withAuth from 'hocs/auth';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useContext } from 'react';

type Props = {
  id: string;
};

const RfqDetails: NextPage<Props> = ({ id }) => {
  const { showSuccessMessage } = useContext(ToastContext);
  const { back, push } = useRouter();
  const { data } = useRFQUnique({ id });
  const { t } = useTranslation(['common']);

  const onSuccess = () => {
    showSuccessMessage(t('quoteCreated'));
    push('/');
  };

  const { mutate } = useCreateQuote(onSuccess);

  const controlInventory = data?.items.products?.map((product) => {
    let finalQuantity = 0;

    const productInventory = data.inventory.find(
      (p: { product: { name: string; defaultPrice: number } }) =>
        p.product.name === product.name,
    );

    if (!productInventory) {
      return {
        name: product.name,
        expected: product.quantity,
        amount: 0,
        quantity: finalQuantity,
        stock: false,
      };
    }

    const q = productInventory.quantity - product.quantity;

    if (q > 0) {
      finalQuantity = product.quantity;
    }

    if (q < 0) {
      finalQuantity = productInventory.quantity;
    }

    return {
      name: productInventory.product.name,
      productId: productInventory.productId,
      expected: product.quantity,
      quantity: finalQuantity,
      amount: finalQuantity * productInventory.product.defaultPrice,
      stock: true,
    };
  });

  let total = controlInventory?.reduce(
    (total, currentValue) => total + currentValue.amount,
    0,
  );

  const sendQuote = () => {
    const items = controlInventory
      ?.filter((i) => i.stock)
      .map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      }));

    mutate({
      id,
      data: {
        total,
        items,
      },
    });
  };

  return (
    <div className="w-full space-y-6 px-4 py-6">
      <div>
        <div className="px-4 sm:px-0 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <ChevronLeftIcon
              width={30}
              height={30}
              onClick={back}
              className="cursor-pointer"
            />
            <div>
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                {t('rfqDetail')}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {t('detailInfo')}.
              </p>
            </div>
          </div>
          <div>
            <Button
              variant="primary"
              className="w-[155px] inline-flex justify-center px-[24px] py-[12px] items-center"
              text={t('sendQuote')}
              onClick={sendQuote}
            />
          </div>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t('customer')}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data?.customerEmail}
              </dd>
            </div>
            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t('subject')}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data?.subject}
              </dd>
            </div>
            <Disclosure as="div">
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full flex bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm text-left font-medium leading-6 text-gray-900">
                      {t('description')}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex justify-between mr-10">
                      <div>{t('bodyMail')}</div>
                      {open ? (
                        <MinusSmallIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </dd>
                  </Disclosure.Button>
                  <Disclosure.Panel
                    as="div"
                    className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3"
                  >
                    <dt className="text-sm font-medium leading-6 text-gray-900"></dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <div
                        className="text-gray-300"
                        dangerouslySetInnerHTML={{ __html: data?.body || '' }}
                      />
                    </dd>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t('products')}
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          {t('product')}
                        </span>
                      </div>
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="flex-shrink-0 text-gray-400">
                          {t('quantityExpected')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <p className="font-medium text-indigo-600 hover:text-indigo-500">
                        {t('quantityAvailable')}
                      </p>
                    </div>
                  </li>
                  <Each
                    of={controlInventory || []}
                    render={(i) => (
                      <li className="grid grid-cols-3 py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="text-left">
                          <span className="truncate font-medium">{i.name}</span>
                        </div>
                        <div className="text-center">
                          <span className="text-gray-400">{i.expected}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-indigo-600 hover:text-indigo-500">
                            {i.quantity}
                          </p>
                        </div>
                      </li>
                    )}
                  />
                </ul>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t('total')}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                ${' '}
                {controlInventory?.reduce(
                  (total, currentValue) => total + currentValue.amount,
                  0,
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async ({ locale, query }) => {
    return {
      props: {
        id: query.id,
        ...(await serverSideTranslations(locale as string, ['common'])),
      },
    };
  },
);

export default RfqDetails;
