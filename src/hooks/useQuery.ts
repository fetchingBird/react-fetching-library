import { useCallback, useEffect, useState } from 'react';
import { useCacheStore } from '../context/CacheStoreProvider';

interface UseQueryArgs {
  queryKey: string[];
  queryFn: () => void;
  cacheTime?: number;
  retry?: number | ((failureCount: number, error: any) => boolean);
}

const initialCacheTime = 5 * 60 * 1000;

export const useQuery = ({
  queryKey,
  queryFn,
  cacheTime = initialCacheTime,
  retry = 0,
}: UseQueryArgs) => {
  const { cacheStore } = useCacheStore();
  const [initData, setInitData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [isError, setIsError] = useState(false);

  const [failureCount, setFailureCount] = useState(0);

  const shouldRetry = useCallback(
    (retryError: any) => {
      if (typeof retry === 'number') {
        return failureCount < retry;
      }
      if (typeof retry === 'function') {
        return retry(failureCount, retryError);
      }
      return false;
    },
    [failureCount, retry]
  );

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

      const data = await queryFn();
      if (!data.ok) {
        if (data.status === 404 || data.status === 500) {
          setFailureCount(failureCount + 1);
        }
        // 실패한 경우
        setIsError(true);
        setError(data.statusText);
      }
      cacheStore.set(queryKey, { data, createAt: Date.now() });

      setInitData(data);
    } catch (e: unknown) {
      // TODO: type 변경

      if (shouldRetry(e)) {
        setTimeout(fetchWithCache, Math.min(1000 * 2 ** failureCount, 30000)); // Exponential back-off
      }
    } finally {
      setIsPending(false);
    }
  }, [cacheStore, cacheTime, failureCount, queryFn, queryKey, shouldRetry]);

  useEffect(() => {
    fetchWithCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { initData, isPending, error, isError };
};
