import { expect } from '@storybook/jest';
import { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Signup from '../Signup';

type Story = StoryObj<typeof Signup>;

export const ValidOTP: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const signupButton = canvas.getByTestId('button-signup');
    expect(signupButton).toBeDisabled();

    // Test Case: Valid email and password
    await userEvent.type(canvas.getByTestId('name-input'), 'rutvik', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('email-input'), 'rutvik@gmail.com', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('password-input'), 'rutvik12321', {
      delay: 50,
    });

    expect(signupButton).toBeEnabled();

    await userEvent.click(signupButton);

    const validateOTPButton = canvas.getByTestId('button-validation');
    expect(validateOTPButton).toBeInTheDocument();

    await userEvent.type(canvas.getByTestId('OTP-input'), '123321', {
      delay: 50,
    });

    await userEvent.click(validateOTPButton);
  },
};
