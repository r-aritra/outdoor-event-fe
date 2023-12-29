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

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const loginButton = canvas.getByTestId('button-login');
    expect(loginButton).toBeDisabled();

    await userEvent.type(canvas.getByTestId('email-input'), 'rutvik@gmail.com');

    await userEvent.type(canvas.getByTestId('password-input'), 'rutvik12321');

    expect(loginButton).toBeEnabled();
  },
};
