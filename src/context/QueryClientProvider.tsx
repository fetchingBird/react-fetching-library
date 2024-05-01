import { createContext, useContext, useEffect } from 'react';

interface QueryClientProviderProps {
  client: any;
  children: React.ReactNode;
}
export const QueryClientContext = createContext(undefined);

export const queryClient = (queryClient: any) => {
  const client = useContext(QueryClientContext);
  if (queryClient) {
    return client;
  }

  if (!client) {
    throw new Error('?? error');
  }

  return client;
};

export function QueryClientProvider({
  client,
  children,
}: QueryClientProviderProps) {
  //네트워크 요청, 캐싱, 이벤트 리스닝과 같은 작업을 수행하는 객체는 생성과 해제 시점을 명확히 관리해주어야 메모리 누수나 불필요한 처리를 방지할 수 있다

  // client가 업데이트될 때마다 client를 초기화해줌
  useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);

  return (
    <QueryClientContext.Provider value={client}>
      {children}
    </QueryClientContext.Provider>
  );
}
