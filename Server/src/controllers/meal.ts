import e, { Request, Response } from 'express';
import prisma from '../../DB/prisma';
import { createMealSchema, createMealWithPriceSchema } from '../models/meal';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { Food_type, MealItem, Product } from '@prisma/client';

export const createMealWithPrice = async (req: Request, res: Response) => {
  createMealWithPriceSchema.parse(req.body);

  const { name, image, price, foodType, categoryId, mealItems } = req.body;

  const productsPromises = mealItems.map(async (productId: number) => {
    return prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
      },
    });
  });

  let products = await Promise.all(productsPromises);

  if (products.some((product) => !product)) {
    throw new NotFoundException(
      "Some of the product not found, can't create meal",
      ErrorCode.UNPROCESSABLE_ENTITY,
    );
  }

  interface TempInterface {
    productId: number;
    quantity: number;
  }

  let temp: TempInterface[] = [];

  for (const product of products) {
    const existingProduct = temp.find((item) => item.productId === product.id);

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      temp.push({ productId: product.id, quantity: product.quantity });
    }
  }

  products = temp.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    if (product) {
      return { ...product, quantity: item.quantity };
    } else {
      return product;
    }
  });

  const calculateDiscountedPrice = (product: Product): number => {
    switch (product.categoryId) {
      case 2:
        return Number(product.price) * 0.8; // 20% off
      case 5:
        return Number(product.price) * 0.9; // 10% off
      case 6:
        return Number(product.price) * 0.8; // 20% off
      default:
        return Number(product.price) * 0.95; // 5% off for others
    }
  };

  const netQuantity = products.reduce((total, product) => total + Number(product.quantity), 0);

  const meal = await prisma.meal.create({
    data: {
      userId: Number(req.user?.id),
      name,
      image,
      price,
      categoryId,
      quantity: netQuantity,
      foodType: foodType || Food_type.VEG, // Default to 'VEG' if not provided
    },
  });

  const createdMealItems = await prisma.mealItem.createMany({
    data: products.map((product) => ({
      mealId: meal.id,
      productId: product.id,
      quantity: product.quantity,
      categoryId: product.categoryId,
      price: calculateDiscountedPrice(product),
    })),
  });

  res.send({ message: 'Meal created successfully', meal, mealItems: createdMealItems });
};

export const createMeal = async (req: Request, res: Response) => {
  createMealSchema.parse(req.body);
  const { name, image, price, quantity, foodType, categoryId, mealItems } = req.body;

  // Fetch products asynchronously using Promise.all
  const productsPromises = mealItems.map(async (productId: number) => {
    return prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
      },
    });
  });

  // Wait for all products to be fetched
  let products = await Promise.all(productsPromises);

  // Check if all products were found
  if (products.some((product) => !product)) {
    throw new NotFoundException(
      "Some of the product not found, can't create meal",
      ErrorCode.UNPROCESSABLE_ENTITY,
    );
  }

  interface TempInterface {
    productId: number;
    quantity: number;
  }

  let temp: TempInterface[] = [];

  for (const product of products) {
    const existingProduct = temp.find((item) => item.productId === product.id);

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      temp.push({ productId: product.id, quantity: product.quantity });
    }
  }

  products = temp.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    if (product) {
      return { ...product, quantity: item.quantity };
    } else {
      return product;
    }
  });

  const calculateDiscountedPrice = (product: Product): number => {
    switch (product.categoryId) {
      case 2:
        return Number(product.price) * 0.8; // 20% off
      case 5:
        return Number(product.price) * 0.9; // 10% off
      case 6:
        return Number(product.price) * 0.8; // 20% off
      default:
        return Number(product.price) * 0.95; // 5% off for others
    }
  };

  const netPrice = products.reduce(
    (total, product) => total + calculateDiscountedPrice(product),
    0,
  );

  const netQuantity = products.reduce((total, product) => total + Number(product.quantity), 0);

  const meal = await prisma.meal.create({
    data: {
      userId: Number(req.user?.id),
      name,
      image,
      price: netPrice,
      categoryId,
      quantity: netQuantity,
      foodType: foodType || Food_type.VEG, // Default to 'VEG' if not provided
    },
  });

  const createdMealItems = await prisma.mealItem.createMany({
    data: products.map((product) => ({
      mealId: meal.id,
      productId: product.id,
      quantity: product.quantity,
      categoryId: product.categoryId,
      price: calculateDiscountedPrice(product),
    })),
  });

  res.send({ message: 'Meal created successfully', meal, mealItems: createdMealItems });
};

export const getMeals = async (req: Request, res: Response) => {
  const meals = await prisma.meal.findMany({
    include: {
      mealItems: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
      category: true,
    },
  });
  res.status(200).json({ message: 'Meals fetched successfully', data: meals });
};

export const getMealByMealCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const meals = await prisma.meal.findMany({
    where: {
      categoryId: Number(id),
    },
    include: {
      mealItems: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },  
      },
      category: true,
    },
  });
  res.status(200).json({ message: 'Meals fetched successfully', data: meals,});
};

export const deleteMeal = async (req: Request, res: Response) => {
  const { id } = req.params;

  const mealItems = await prisma.mealItem.deleteMany({
    where: {
      mealId: Number(id),
    },
  });

  const meal = await prisma.meal.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json({ message: 'Meal deleted successfully', data: meal, mealItems });
};

export const updateMeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, image, categoryId, foodType } = req.body;

  const meal = await prisma.meal.update({
    where: {
      id: Number(id), // Use `id` to find the correct meal
    },
    data: {
      name,
      image,
      categoryId,
      foodType,
    },
  });

  res.status(200).json({ message: 'Meal updated successfully', data: meal });
};
