import { createContext, useContext, useEffect } from 'react';

interface QueryClientProviderProps {
  client: any;
  children: React.ReactNode;
}
export const QueryClientContext = createContext(undefined);

export const useQueryClient = (queryClient: any) => {
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
