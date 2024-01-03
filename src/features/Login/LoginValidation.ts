import { z } from 'zod';

export const LoginValidation = () =>
  z.object({
    email: z
      .string({
        required_error: 'Invalid email',
      })
      .refine((email) => /^\S+@\S+\.\S+$/.test(email), {
        message: 'Invalid email format',
      }),

    password: z
      .string({
        required_error: 'Password should include at least 6 characters',
      })
      .min(6, { message: 'Password should include at least 6 characters' }),
  });
