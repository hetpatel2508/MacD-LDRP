import { Request, Response } from 'express';
import prisma from '../../DB/prisma';
import { createFeedbackSchema } from '../models/feedback';

export const createFeedback = async (req: Request, res: Response) => {
  createFeedbackSchema.parse(req.body);

  const { orderId, email, rating, message } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      orderId,
      email,
      rating,
      comment: message,
    },
  });

  res.status(201).json({
    message: 'Feedback created successfully',
    data: feedback,
  });
};

export const getAllFeedback = async (req: Request, res: Response) => {
  const feedback = await prisma.feedback.findMany();
  res.status(200).json({
    message: 'Feedback fetched successfully',
    data: feedback,
  });
};

export const getFeedbackByOrderId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const feedback = await prisma.feedback.findFirst({
    where: {
      orderId: Number(id),
    },
  });
  res.status(200).json({
    message: 'Feedback fetched successfully',
    data: feedback,
  });
};
