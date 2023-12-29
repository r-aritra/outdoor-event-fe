import type { Meta, StoryObj } from '@storybook/react';

import Signup from './components/pages/Signup';
import { InvalidEmailForm } from './stories/InvalidEmailForm';
import { ShortPasswordForm } from './stories/ShortPasswordForm';
import { ValidForm } from './stories/ValidForm';
import { ValidOTP } from './stories/ValidOTP';

const meta: Meta<typeof Signup> = {
  component: Signup,
};

export default meta;
type Story = StoryObj<typeof Signup>;

export const EmptyForm: Story = {};

export { InvalidEmailForm, ShortPasswordForm, ValidForm, ValidOTP };
