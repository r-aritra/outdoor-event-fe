import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './router/AppRoutes';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Suspense } from 'react';
import { AppLoading } from './layout/Loading';

const queryClient = new QueryClient();

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
