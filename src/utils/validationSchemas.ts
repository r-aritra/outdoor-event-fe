// validationSchemas.ts
import { z } from 'zod';

// Your Zod schemas here
export const RegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const ValidateSchema = z.object({
  email: z.string().email(),
  otp: z.string(),
  device_id: z.string(),
});

export const ResendSchema = z.object({
  email: z.string().email(),
  device_id: z.string(),
});
