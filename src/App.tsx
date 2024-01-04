import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { AppProvider } from './providers/AppProvider';
import { FC } from 'react';

export const App: FC = () => {
  return <AppProvider />;
};
