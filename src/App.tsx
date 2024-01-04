import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './router/AppRoutes';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Suspense } from 'react';
import { AppLoading } from './layout/Loading';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Suspense fallback={<AppLoading />}>
          <Notifications />
          <AppRoutes />
        </Suspense>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
