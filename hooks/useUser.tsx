import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { get } from '@/helper/api';

export default function useUser() {
  const { status } = useSession();

  return useQuery({
    queryKey: ['user'],
    queryFn: () => get(`/users/me`).then(({ data }) => data),
    enabled: status === 'authenticated',
  });
}
