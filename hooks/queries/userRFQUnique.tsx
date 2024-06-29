import { useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from '@/helper/api';
import { LoadingContext } from '@/context/LoadingContext';
import { RFQ } from '@/@types/index';

const useRFQUnique = ({ id }: { id: string }) => {
  const { add, remove } = useContext(LoadingContext);

  const { data, isLoading, refetch } = useQuery<RFQ>({
    queryKey: ['rfq-unique', id],
    queryFn: () => get(`/rfq/${id}`).then((response) => response.data),
  });

  useEffect(() => {
    if (isLoading) {
      add('get/rfq/id');
    } else {
      remove('get/rfq/id');
    }
    return () => remove('get/rfq/id');
  }, [isLoading]);

  return {
    data,
    refetch,
  };
};

export default useRFQUnique;
