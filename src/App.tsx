import './App.css';
import { CacheStoreProvider } from './context/CacheStoreProvider';
import { useQuery } from './hooks/useQuery';

function Example() {
  const { isPending, error, initData } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const result = fetch(
        `https://jsonplaceholder.typicode.com/todoㅇㅇㅇs/1`
      );
      return result;
    },
  });

  if (isPending) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  console.log('data', initData);
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
    <CacheStoreProvider>
      <Example />
    </CacheStoreProvider>
  );
}
