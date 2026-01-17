import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsers } from '../users.api';
import { useNetworkStatus } from './useNetworkStatus';

export const useInfiniteUsers = () => {
  const isConnected = useNetworkStatus();
  return useInfiniteQuery({
    queryKey: ['users'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchUsers(pageParam as number),
    getNextPageParam: lastPage => {
      const { skip, limit, total } = lastPage;
      return skip + limit < total ? skip / limit + 2 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    enabled: isConnected,
  });
};
