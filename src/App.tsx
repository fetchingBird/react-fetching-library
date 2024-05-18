import './App.css';
import axios from 'axios';
import { CacheStoreProvider } from './context/CacheStoreProvider';
import { useQuery } from './hooks/useQuery';

const EXAMPLE_URL = 'https://jsonplaceholder.typicode.com/todos/1';
// const EXAMPLE_ERROR_URL = 'https://jsonplaceholder.typicodoode.com/todos/1';

const QUERY_KEY = ['getData1'];

function Example() {
  const { isPending, error, initData, isError } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const result = await axios.get(EXAMPLE_URL);
      return result;
    },
  });
  const data = initData;

  if (isError)
    return (
      <div>
        <strong>⛔️ error</strong>
        <strong>{error as string}</strong>
        <br />
      </div>
    );

  return (
    <div>
      {isPending ? (
        <strong>Loading...</strong>
      ) : (
        <strong>🍴 {data?.data.title}</strong>
      )}
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
