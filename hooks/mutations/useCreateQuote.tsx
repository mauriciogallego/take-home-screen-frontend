import { useContext, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { post } from '@/helper/api';
import { LoadingContext } from '@/context/LoadingContext';

type QuoteParams = {
  id: string;
  data: {};
};

export function useCreateQuote(onSuccess?: () => void) {
  const { add, remove } = useContext(LoadingContext);

  const { mutate, isPending } = useMutation({
    mutationKey: ['Quote-create'],
    onSuccess: () => (onSuccess ? onSuccess() : undefined),
    mutationFn: (content: QuoteParams) =>
      post(`/quote/rfq/${content.id}`, {
        data: content.data,
      }),
  });

  useEffect(() => {
    if (isPending) {
      add('post/quote/frq');
    } else {
      remove('post/quote/frq');
    }
    return () => remove('post/quote/frq');
  }, [isPending]);

  return {
    mutate,
    isLoading: isPending,
  };
}
