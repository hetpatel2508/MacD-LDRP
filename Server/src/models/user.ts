import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(5),
});
