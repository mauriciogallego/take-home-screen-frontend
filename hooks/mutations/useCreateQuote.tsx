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

  return useMutation({
    mutationKey: ['Quote-create'],
    onMutate: () => {
      add('post/quote/frq');
    },
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
    onSettled: () => {
      remove('post/quote/frq');
    },

    mutationFn: (content: QuoteParams) =>
      post(`/quote/rfq/${content.id}`, {
        data: {},
      }),
  });
}
