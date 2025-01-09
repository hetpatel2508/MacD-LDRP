import { z } from 'zod';

export const createFeedbackSchema = z.object({
  orderId: z.number(),
  email: z.string().email(),
  rating: z.number(),
  message: z.string().optional(),
});
