import { expect } from '@storybook/jest';
import { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Login from '../components/pages/Login';

type Story = StoryObj<typeof Login>;

export const ShortPasswordForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const loginButton = canvas.getByTestId('button-login');

    // Test Case: Short password
    await userEvent.type(canvas.getByTestId('email-input'), 'rutvik@gmail.com', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('password-input'), 'short', {
      delay: 50,
    });

    await userEvent.click(loginButton, {
      delay: 50,
    });

    expect(
      canvas.getByText('Password should include at least 6 characters'),
    ).toBeInTheDocument();
  },
};
