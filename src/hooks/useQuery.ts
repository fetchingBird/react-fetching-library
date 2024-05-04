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
  const [error, setError] = useState(null);

  // 1. 캐싱데이터 저장 로직 필요
  // cheche store에는 키를 저장하고 오늘 날짜를 입력한다.
  // 서버에서 받아온 데이터는 cacheStore 저장
  // data : 서버에서 받아온 데이터, createAt: 현재시간
  // 현재 시간을 함께 저장해야 캐시 타임과 비교를 할 수 있다.
  // 2. 캐시 확인 과정 필요

  const fetchWithCache = useCallback(async () => {
    if (cacheStore.has(queryKey)) {
      const cache = cacheStore.get(queryKey);
      if (Date.now() - cache.createAt < cacheTime) {
        setInitData(cache.data);
        return;
      }
    }
    try {
      setIsPending(true);
      const { data } = await queryFn();

      cacheStore.set(queryKey, { data, createAt: Date.now() });
      setInitData(data);
    } catch (e) {
      setError(e);
    } finally {
      setIsPending(false);
    }
  }, [cacheStore, cacheTime, queryFn, queryKey]);

  useEffect(() => {
    fetchWithCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { initData, isPending, error };
};
