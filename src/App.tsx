import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';

import AppRoutes from './router/AppRoutes';

function App() {
  return (
    <MantineProvider>
      <AppRoutes />
    </MantineProvider>
  );
}

export default App;
