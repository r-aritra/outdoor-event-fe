import { z } from 'zod';

export const SignupValidation = () =>
  z.object({
    name: z.string({
      required_error: 'Enter your name',
    }),

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
