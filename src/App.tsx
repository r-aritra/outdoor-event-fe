import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';

import AppRoutes from './router/AppRoutes';

function App() {
  return (
    <MantineProvider>
      <Notifications />
      <AppRoutes />
    </MantineProvider>
  );
}

export default App;
