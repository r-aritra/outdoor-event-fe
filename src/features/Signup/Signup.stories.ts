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

export const ValidForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const signupButton = canvas.getByTestId('button-signup');
    expect(signupButton).toBeDisabled();

    // Test Case: Valid email and password
    await userEvent.type(canvas.getByTestId('name-input'), 'rutvik', {
      delay: 100,
    });
    await userEvent.type(canvas.getByTestId('email-input'), 'rutvik@gmail.com', {
      delay: 100,
    });
    await userEvent.type(canvas.getByTestId('password-input'), 'rutvik12321', {
      delay: 100,
    });

    expect(signupButton).toBeEnabled();
  },
};

export const InvalidEmailForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const signupButton = canvas.getByTestId('button-signup');
    expect(signupButton).toBeDisabled();

    // Test Case: Invalid email
    await userEvent.type(canvas.getByTestId('name-input'), 'rutvik', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('email-input'), 'invalidemail', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('password-input'), 'rutvik12321', {
      delay: 50,
    });

    expect(signupButton).toBeDisabled();
  },
};

export const ShortPasswordForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const signupButton = canvas.getByTestId('button-signup');
    expect(signupButton).toBeDisabled();

    // Test Case: Short password
    await userEvent.type(canvas.getByTestId('name-input'), 'rutvik', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('email-input'), 'rutvik@gmail.com', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('password-input'), 'short', {
      delay: 50,
    });

    expect(signupButton).toBeDisabled();
  },
};

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
