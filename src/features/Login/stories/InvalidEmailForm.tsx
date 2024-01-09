import { expect } from '@storybook/jest';
import { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Login from '../components/pages/Login';

type Story = StoryObj<typeof Login>;

export const InvalidEmailForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const loginButton = canvas.getByTestId('button-login');

    await userEvent.type(canvas.getByTestId('email-input'), 'invalidemail', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('password-input'), 'rutvik12321', {
      delay: 50,
    });

    await userEvent.click(loginButton, {
      delay: 50,
    });

    expect(canvas.getByText('Invalid email')).toBeInTheDocument();
  },
};
