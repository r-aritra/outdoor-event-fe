import { expect } from '@storybook/jest';
import { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Signup from '../components/pages/Signup';

type Story = StoryObj<typeof Signup>;

export const InvalidEmailForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const signupButton = canvas.getByTestId('button-signup');

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

    await userEvent.click(signupButton, {
      delay: 50,
    });

    expect(canvas.getByText('Invalid email')).toBeInTheDocument();
  },
};
