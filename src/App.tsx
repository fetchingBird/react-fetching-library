import './App.css';
import axios from 'axios';
import { CacheStoreProvider } from './context/CacheStoreProvider';
import { useQuery } from './hooks/useQuery';

const EXAMPLE_URL = 'https://jsonplaceholder.typicddddode.com/todos/1';

const QUERY_KEY = ['getData'];

function Example() {
  // const { isPending, error, initData } = useQuery({
  //   queryKey: QUERY_KEY,
  //   queryFn: async () => {
  //     const result = await axios.get(EXAMPLE_URL);
  //     return result;
  //   },
  // });
  //
  const { isPending, error, initData } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((res) => res.json())
        .then((json) => {
          return json;
        }),
  });

  console.log('1️⃣', initData);
  const data = initData;

  if (error) return `An error has occurred: ${error}`;

  return (
    <div>
      {/* {isPending ? (
        <strong>Loading...</strong>
      ) : (
        <strong>🍴 {data?.data.title}</strong>
      )} */}
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
