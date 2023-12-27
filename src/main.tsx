import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const element = document.getElementById('root');
const root = createRoot(element!);
root.render(
  <MantineProvider>
    <Notifications />
    <App />
  </MantineProvider>,
);
