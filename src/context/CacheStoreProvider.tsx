import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

interface CacheEmpty {
  data: object;
  createAt: number;
}
interface CacheStoreContextProviderProps {
  cacheStore: Map<string[], CacheEmpty>; // cacheStore의 타입을 Map<any, any>로 지정
}

const CacheStoreContext = createContext<CacheStoreContextProviderProps>({
  cacheStore: new Map(),
});

export function CacheStoreProvider({ children }: PropsWithChildren) {
  const [cacheStore] = useState(new Map());

  const value = useMemo(() => {
    return { cacheStore }; // 객체 형태로 반환
  }, [cacheStore]);

  return (
    <CacheStoreContext.Provider value={value}>
      {children}
    </CacheStoreContext.Provider>
  );
}

export const useCacheStore = () => useContext(CacheStoreContext);
