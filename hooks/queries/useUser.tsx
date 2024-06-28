import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { get } from '@/helper/api';
import { Sale } from '../../@types';

export default function useUser() {
  const { status } = useSession();

  return useQuery<Sale>({
    queryKey: ['user'],
    queryFn: () => get(`/sales/me`).then(({ data }) => data),
    enabled: status === 'authenticated',
  });
}
