import { Request, Response } from 'express';
import { createCategorySchema, deleteCategorySchema } from '../models/category';
import prisma from '../../DB/prisma';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';

export const createCategory = async (req: Request, res: Response) => {
  createCategorySchema.parse(req.body);
  const { name } = req.body;

  const category = await prisma.category.create({
    data: {
      name: name,
    },
  });

  res.status(201).json({
    message: 'Category created successfully',
    data: category,
  });
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.status(200).json({
    message: 'Categories fetched successfully',
    data: categories,
  });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await prisma.category.delete({
    where: {
      id: Number(id),
    },
  });
  if (!category) throw new NotFoundException('Category not found', ErrorCode.UNPROCESSABLE_ENTITY);
  res.status(200).json({
    message: 'Category deleted successfully',
    data: category,
  });
};

export const getSpecificCategories = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!category) throw new NotFoundException('Category not found', ErrorCode.UNPROCESSABLE_ENTITY);
  res.status(200).json({
    message: 'Category fetched successfully',
    data: category,
  });
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const c = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  })
  if (!c) throw new NotFoundException('Category not found', ErrorCode.UNPROCESSABLE_ENTITY);
  const category = await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
    },
  });
  res.status(200).json({
    message: 'Category updated successfully',
    data: category,
  });
};
