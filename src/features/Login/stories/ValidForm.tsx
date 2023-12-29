import { expect } from '@storybook/jest';
import { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Login from '../Login';

type Story = StoryObj<typeof Login>;

export const ValidForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const loginButton = canvas.getByTestId('button-login');
    expect(loginButton).toBeDisabled();

    // Test Case: Valid email and password
    await userEvent.type(canvas.getByTestId('email-input'), 'rutvik@gmail.com', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('password-input'), 'rutvik12321', {
      delay: 50,
    });

    expect(loginButton).toBeEnabled();
  },
};
