import { Food_type } from '@prisma/client';
import { z } from 'zod';

export const createMealSchema = z.object({
  name: z.string(),
  image: z.string().url(),
  foodType: z.nativeEnum(Food_type).optional(),
  categoryId: z.number(),
  mealItems: z.array(z.number()),
});

export const createMealWithPriceSchema = z.object({
  name: z.string(),
  image: z.string().url(),
  foodType: z.nativeEnum(Food_type).optional(),
  categoryId: z.number(),
  mealItems: z.array(z.number()),
  price: z.number(),
});
