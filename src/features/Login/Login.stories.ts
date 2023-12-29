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

    await userEvent.type(canvas.getByTestId('email-input'), 'email@provider.com');

    await userEvent.type(canvas.getByTestId('password-input'), 'a-random-password');

    await userEvent.click(canvas.getByTestId('button-input'));

    await expect(canvas.getByText('Welcome to booking.com')).toBeInTheDocument();
  },
};
