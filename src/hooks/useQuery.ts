import { useCallback, useEffect, useState } from 'react';
import { useCacheStore } from '../context/CacheStoreProvider';

interface UseQueryArgs {
  queryKey: string[];
  queryFn: () => void;
  cacheTime?: number;
}

const initialCacheTime = 5 * 60 * 1000;

export const useQuery = ({
  queryKey,
  queryFn,
  cacheTime = initialCacheTime,
}: UseQueryArgs) => {
  const { cacheStore } = useCacheStore();
  const [initData, setInitData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [isError, setIsError] = useState(false);

  const fetchWithCache = useCallback(async () => {
    if (cacheStore.has(queryKey)) {
      const cache = cacheStore.get(queryKey);
      if (cache) {
        if (Date.now() - cache.createAt < cacheTime) {
          setInitData(cache.data);
          return;
        }
      }
    }
    try {
      setIsPending(true);

      const { data } = await queryFn();

      cacheStore.set(queryKey, { data, createAt: Date.now() });

      setInitData(data);
    } catch (e: unknown) {
      // TODO: type 변경
      setError(e);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }, [cacheStore, cacheTime, queryFn, queryKey]);

  useEffect(() => {
    fetchWithCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { initData, isPending, error, isError };
};
