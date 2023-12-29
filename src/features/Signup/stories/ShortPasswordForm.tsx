import { expect } from '@storybook/jest';
import { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Signup from '../components/pages/Signup';

type Story = StoryObj<typeof Signup>;

export const ShortPasswordForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const signupButton = canvas.getByTestId('button-signup');

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

    await userEvent.click(signupButton, {
      delay: 50,
    });

    expect(
      canvas.getByText('Password should include at least 6 characters'),
    ).toBeInTheDocument();
  },
};
