import { Request, Response } from 'express';
import { changeQuantitySchema, CreateCartSchema } from '../models/cart';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { NotFoundException } from '../exceptions/not-found';
import prisma from '../../DB/prisma';
import { Meal, Product } from '@prisma/client';

export const addItemToCart = async (req: Request, res: Response): Promise<any> => {
  const validatedData = CreateCartSchema.parse(req.body);
  let product: Product;
  try {
    product = await prisma.product.findFirstOrThrow({
      where: {
        id: Number(validatedData.productId),
      },
    });
  } catch (error: any) {
    throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
  }

  const cart = await prisma.cartItem.create({
    data: {
      userId: Number(req.user?.id),
      productId: Number(validatedData.productId),
      quantity: Number(validatedData.quantity),
    },
  });

  res.status(201).json(cart);
};

export const addMealToCart = async (req: Request, res: Response): Promise<any> => {
  const validatedData = CreateCartSchema.parse(req.body);
  let meal: Meal;
  try {
    meal = await prisma.meal.findFirstOrThrow({
      where: {
        id: Number(validatedData.productId),
      },
    });
  } catch (error: any) {
    throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
  }

  if (meal) {
    const cart = await prisma.cartItem.create({
      data: {
        userId: Number(req.user?.id),
        mealId: Number(validatedData.productId),
        quantity: Number(validatedData.quantity),
      },
    });
    res.status(201).json(cart);
    return;
  }

  // const cart = await prisma.cartItem.create({
  //   data: {
  //     userId: Number(req.user?.id),
  //     productId: Number(validatedData.productId),
  //     quantity: Number(validatedData.quantity),
  //   },
  // });

  // res.status(201).json(cart);
};

export const deleteItemToCart = async (req: Request, res: Response): Promise<any> => {
  const cart = await prisma.cartItem.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  res.status(200).json(cart);
};

export const changeQuantity = async (req: Request, res: Response): Promise<any> => {
  const validatedData = changeQuantitySchema.parse(req.body);

  const cart = await prisma.cartItem.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      quantity: Number(validatedData.quantity),
    },
  });

  res.status(200).json(cart);
};

export const getCart = async (req: Request, res: Response): Promise<any> => {
  const cart_product = await prisma.cartItem.findMany({
    where: {
      userId: Number(req.user?.id),
      mealId: null,
    },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
  });

  const cart_meal = await prisma.cartItem.findMany({
    where: {
      userId: Number(req.user?.id),
      productId: null,
    },
    include: {
      meal: {
        include: {
          category: true,
          mealItems: {
            include: {
              product: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (cart_meal.length + cart_product.length === 0) {
    throw new BadRequestException('Cart is empty', ErrorCode.UNPROCESSABLE_ENTITY);
  }

  const totalPrice = cart_product.reduce(
    (total, item) => total + Number(item.product.price) * Number(item.quantity),
    0,
  );

  const finalTotalPrice = cart_meal.reduce(
    (total, item) => total + Number(item.meal.price) * Number(item.quantity),
    totalPrice,
  );

  const totalQuantity = cart_product.reduce((total, item) => total + Number(item.quantity), 0);

  const finalTotalQuantity = cart_meal.reduce(
    (total, item) => total + Number(item.quantity),
    totalQuantity,
  );

  const cart = [...cart_product, ...cart_meal];

  res.status(200).json({
    cart,
    finalTotalPrice,
    finalTotalQuantity,
  });
};

export const clearCart = async (req: Request, res: Response): Promise<any> => {
  const cart = await prisma.cartItem.deleteMany({
    where: {
      userId: Number(req.user?.id),
    },
  });

  res.status(200).json(cart);
};
