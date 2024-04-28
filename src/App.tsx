import { useState } from 'react';
import './App.css';
import { QueryClient } from './client/queryClient';
import { QueryClientProvider } from './context/QueryClientProvider';

function App() {
  const [count, setCount] = useState(0);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>HI welcome to my homepage</div>
    </QueryClientProvider>
  );
}

export default App;
