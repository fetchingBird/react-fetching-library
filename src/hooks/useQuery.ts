import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { CacheDataArgs, useCacheStore } from '../context/CacheStoreProvider';

const isAxiosError = <ResponseDataType>(
  error: unknown
): error is AxiosError<ResponseDataType> => {
  return axios.isAxiosError(error);
};

const hasArrayKey = (map: Map<string[], CacheDataArgs>, keyArray: string[]) => {
  return Array.from(map.keys()).some(
    (key) =>
      Array.isArray(key) &&
      key.length === keyArray.length &&
      key.every((val, index) => val === keyArray[index])
  );
};

const getLatestDataFromMap = (
  map: Map<string[], CacheDataArgs>,
  keyArray: string[]
): CacheDataArgs | null => {
  return Array.from(map.entries()).reduce((latest, [key, value]) => {
    if (
      Array.isArray(key) &&
      key.length === keyArray.length &&
      key.every((val, index) => val === keyArray[index])
    ) {
      if (!latest || value.createAt > latest.createAt) {
        return value;
      }
    }
    return latest;
  }, null as CacheDataArgs | null);
};

interface UseQueryArgs {
  queryKey: string[];
  queryFn: () => Promise<AxiosResponse<any>>;
  cacheTime?: number;
  retry?: number | ((failureCount: number, error: any) => boolean);
}

const INITIAL_CACHE_TIME = 5 * 60 * 1000;

export const useQuery = ({
  queryKey,
  queryFn,
  cacheTime = INITIAL_CACHE_TIME,
  retry = 0,
}: UseQueryArgs) => {
  const { cacheStore } = useCacheStore();

  const [initData, setInitData] = useState<AxiosResponse | null>(null);
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
    if (hasArrayKey(cacheStore, queryKey)) {
      const cache = getLatestDataFromMap(cacheStore, queryKey);
      if (cache) {
        if (Date.now() - cache.createAt < cacheTime) {
          return;
        }
      }
    }
    try {
      setIsPending(true);

      const data = await queryFn();
      cacheStore.set(queryKey, { data, createAt: Date.now() });

      setInitData(data);
    } catch (axiosError) {
      if (isAxiosError(axiosError)) {
        setError(axiosError.message);
        setIsError(true);
      }
      setFailureCount(failureCount + 1);

      if (shouldRetry(error)) {
        setTimeout(fetchWithCache, Math.min(1000 * 2 ** failureCount, 30000));
      }
    } finally {
      setIsPending(false);
    }
  }, [
    cacheStore,
    cacheTime,
    error,
    failureCount,
    queryFn,
    queryKey,
    shouldRetry,
  ]);

  useEffect(() => {
    fetchWithCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { initData, isPending, error, isError };
};
