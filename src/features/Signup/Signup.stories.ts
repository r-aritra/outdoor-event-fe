import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Signup from './Signup';

const meta: Meta<typeof Signup> = {
  component: Signup,
};

export default meta;
type Story = StoryObj<typeof Signup>;

export const EmptyForm: Story = {};

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const signupButton = canvas.getByTestId('button-signup');
    expect(signupButton).toBeDisabled();

    await userEvent.type(canvas.getByTestId('name-input'), 'rutvik');

    await userEvent.type(canvas.getByTestId('email-input'), 'rutvik@gmail.com');

    await userEvent.type(canvas.getByTestId('password-input'), 'rutvik12321');

    expect(signupButton).toBeEnabled();

    await userEvent.click(signupButton);

    await userEvent.type(canvas.getByTestId('OTP-input'), '212121');

    const validationButton = canvas.getByTestId('button-validation');

    expect(validationButton).toBeEnabled();
  },
};
