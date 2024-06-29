import { useEffect, useContext } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { get } from '@/helper/api';
import { LoadingContext } from '@/context/LoadingContext';
import { IPaginatedResult, RFQ } from '@/@types/index';

const useQuoteList = (email: string) => {
  const { add, remove } = useContext(LoadingContext);

  const { data, isLoading, fetchNextPage, refetch, isFetchingNextPage } =
    useInfiniteQuery<IPaginatedResult<RFQ>>({
      queryKey: ['quote-list'],
      queryFn: ({ pageParam = 0 }) =>
        get(`/quote`, {
          params: {
            take: 20,
            skip: 20 * (pageParam as number),
            include: JSON.stringify({
              rfq: true,
              sale: true,
            }),
            where: JSON.stringify({
              rfq: {
                customerEmail: email || undefined,
              },
            }),
          },
        }).then((response) => response.data),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) =>
        lastPage?.pagination.hasMore ? pages.length : undefined,
    });

  useEffect(() => {
    if (isLoading || isFetchingNextPage) {
      add('get/quote');
    } else {
      remove('get/quote');
    }
    return () => remove('get/quote');
  }, [isLoading, isFetchingNextPage]);

  const list = data?.pages.flatMap((page) => page.results) ?? [];

  return {
    list,
    refetch,
    fetchNextPage,
  };
};

export default useQuoteList;
