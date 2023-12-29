import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Login from './Login';

const meta: Meta<typeof Login> = {
  component: Login,
};

export default meta;
type Story = StoryObj<typeof Login>;

export const EmptyForm: Story = {};

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

export const InvalidEmailForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const loginButton = canvas.getByTestId('button-login');
    expect(loginButton).toBeDisabled();

    // Test Case: Invalid email
    await userEvent.type(canvas.getByTestId('email-input'), 'invalidemail', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('password-input'), 'rutvik12321', {
      delay: 50,
    });

    expect(loginButton).toBeDisabled();
  },
};

export const ShortPasswordForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const loginButton = canvas.getByTestId('button-login');
    expect(loginButton).toBeDisabled();

    // Test Case: Short password
    await userEvent.type(canvas.getByTestId('email-input'), 'rutvik@gmail.com', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('password-input'), 'short', {
      delay: 50,
    });

    expect(loginButton).toBeDisabled();
  },
};
