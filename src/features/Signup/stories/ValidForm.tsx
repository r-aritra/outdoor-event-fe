import { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Signup from '../components/pages/Signup';

type Story = StoryObj<typeof Signup>;

export const ValidForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const signupButton = canvas.getByTestId('button-signup');

    await userEvent.type(canvas.getByTestId('name-input'), 'rutvik', {
      delay: 100,
    });
    await userEvent.type(canvas.getByTestId('email-input'), 'rutvik@gmail.com', {
      delay: 100,
    });
    await userEvent.type(canvas.getByTestId('password-input'), 'rutvik12321', {
      delay: 100,
    });

    await userEvent.click(signupButton, {
      delay: 50,
    });
  },
};
