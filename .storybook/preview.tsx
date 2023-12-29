import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import type { Preview } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </MantineProvider>
    ),
  ],
}

export default preview
