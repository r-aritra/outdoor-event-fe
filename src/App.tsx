import '@mantine/core/styles.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './router/AppRoutes';
import { MantineProvider } from '@mantine/core';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AppRoutes />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
