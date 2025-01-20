import { Request, Response } from 'express';
import { createProductSchema, updateProductSchema } from '../models/product';
import prisma from '../../DB/prisma';
import { Food_type } from '@prisma/client';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';

export const createProduct = async (req: Request, res: Response) => {
  // Validate the request body
  createProductSchema.parse(req.body);
  const { name, image, price, foodType, categoryId } = req.body;

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new NotFoundException('Category not found', ErrorCode.UNPROCESSABLE_ENTITY);
  }

  // Create the product in the database
  const product = await prisma.product.create({
    data: {
      name: name,
      image: image,
      price: price,
      foodType: foodType || Food_type.VEG, // Default to 'VEG' if not provided
      categoryId: categoryId,
    },
  });

  // Send the success response
  res.status(201).json({
    message: 'Product created successfully',
    data: product,
  });
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  res.status(200).json({
    message: 'Products fetched successfully',
    data: products,
  });
};

export const getProductByCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.findMany({
    where: {
      categoryId: Number(id),
    },
    include: {
      category: true,
    },
  });

  if (product.length === 0) {
    throw new NotFoundException(
      'Product not found By Given Category',
      ErrorCode.UNPROCESSABLE_ENTITY,
    );
  }

  res.status(200).json({
    message: 'Product fetched successfully',
    data: product,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    throw new NotFoundException('Product not found', ErrorCode.UNPROCESSABLE_ENTITY);
  }

  res.status(200).json({
    message: 'Product deleted successfully',
    data: product,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  updateProductSchema.parse(req.body);
  const { id } = req.params;
  const { name, image, price, foodType, categoryId } = req.body;

  let product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    throw new NotFoundException('Product not found', ErrorCode.UNPROCESSABLE_ENTITY);
  }

  product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
      image: image,
      price: price,
      foodType: foodType || Food_type.VEG, // Default to 'VEG' if not provided
      categoryId: categoryId,
    },
  });

  res.status(200).json({
    message: 'Product updated successfully',
    data: product,
  });
};
