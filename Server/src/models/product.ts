import { Food_type } from '@prisma/client';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string(),
  image: z.string().url(),
  price: z.number(),
  foodType: z.nativeEnum(Food_type).optional(),
  categoryId: z.number(),
});

export const updateProductSchema = z.object({
  name: z.string().optional(),
  image: z.string().url().optional(),
  price: z.number().optional(),
  foodType: z.nativeEnum(Food_type).optional(),
  categoryId: z.number().optional(),
});
