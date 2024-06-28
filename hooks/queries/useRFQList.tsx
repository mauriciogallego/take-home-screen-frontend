import { useEffect, useContext } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { get } from '@/helper/api';
import { LoadingContext } from '@/context/LoadingContext';
import { IPaginatedResult, RFQ } from '@/@types/index';

const useFormulaList = () => {
  const { add, remove } = useContext(LoadingContext);

  const { data, isLoading, fetchNextPage, refetch, isFetchingNextPage } =
    useInfiniteQuery<IPaginatedResult<RFQ>>({
      queryKey: ['rfq-list'],
      queryFn: ({ pageParam = 0 }) =>
        get(`/rfq`, {
          params: {
            take: 20,
            skip: 20 * (pageParam as number),
            select: JSON.stringify({
              customerEmail: true,
              subject: true,
              id: true,
            }),
          },
        }).then((response) => response.data),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) =>
        lastPage?.pagination.hasMore ? pages.length : undefined,
    });

  useEffect(() => {
    if (isLoading || isFetchingNextPage) {
      add('get/rfq');
    } else {
      remove('get/rfq');
    }
    return () => remove('get/rfq');
  }, [isLoading, isFetchingNextPage]);

  const list = data?.pages.flatMap((page) => page.results) ?? [];

  return {
    list,
    refetch,
    fetchNextPage,
  };
};

export default useFormulaList;
