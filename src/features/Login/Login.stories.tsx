import type { Meta, StoryObj } from '@storybook/react';

import Login from './components/pages/Login';
import { InvalidEmailForm } from './stories/InvalidEmailForm';
import { ShortPasswordForm } from './stories/ShortPasswordForm';
import { ValidForm } from './stories/ValidForm';

const meta: Meta<typeof Login> = {
  component: Login,
};

export default meta;
type Story = StoryObj<typeof Login>;

export const EmptyForm: Story = {};

export { InvalidEmailForm, ShortPasswordForm, ValidForm };
