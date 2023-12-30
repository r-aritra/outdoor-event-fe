import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';

import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './router/AppRoutes';
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
