import { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Login from '../components/pages/Login';

type Story = StoryObj<typeof Login>;

export const ValidForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('email-input'), 'rutvik@gmail.com', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('password-input'), 'rutvik12321', {
      delay: 50,
    });
  },
};
