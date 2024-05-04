import './App.css';
import { QueryClient } from './client/queryClient';
import { CacheStoreProvider } from './context/CacheStoreProvider';
import { QueryClientProvider } from './context/QueryClientProvider';
import { useQuery } from './hooks/useQuery';

const queryClient = new QueryClient();

function Example() {
  const { isPending, error } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) => {
        res.json();
      }),
  });

  if (isPending) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div>
      {/* <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong> */}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheStoreProvider>
        <Example />
      </CacheStoreProvider>
    </QueryClientProvider>
  );
}
