import './App.css';
import { CacheStoreProvider } from './context/CacheStoreProvider';
import { useQuery } from './hooks/useQuery';

function Example() {
  const { isPending, error } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((res) => res.json())
        .then((json) => {
          return json;
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
    <CacheStoreProvider>
      <Example />
    </CacheStoreProvider>
  );
}
