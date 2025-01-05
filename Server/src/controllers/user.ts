import { Request, Response } from 'express';
import prisma from '../../DB/prisma';
import { BadRequestException } from '../exceptions/bad-requests';
import { resetPasswordSchema, signInSchema, signUpSchema } from '../models/user';

import { compareSync, hashSync } from 'bcrypt';
import { ErrorCode } from '../exceptions/root';
// import * as jwt from 'jsonwebtoken';
import jsonwebtoken from 'jsonwebtoken';

export const getUser = (req: any, res: any) => {
  res.send('get user');
};

export const signUp = async (req: Request, res: Response) => {
  signUpSchema.parse(req.body);

  const { name, email, password } = req.body;

  let user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    //   return res.status(400).json({ message: 'User already exists' });
    throw new BadRequestException('User already exists', ErrorCode.USER_ALREADY_EXISTS);
  }

  user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password, 10),
    },
  });

  res.status(201).json({
    message: 'User created successfully',
    data: user,
  });
};

export const login = async (req: Request, res: Response) => {
  signInSchema.parse(req.body);

  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new BadRequestException('User not found', ErrorCode.USER_NOT_FOUND);
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestException('Invalid credentials', ErrorCode.INCORRECT_PASSWORD);
  }

  const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET as string);

  res.status(200).json({
    message: 'User logged in successfully',
    data: user,
    token: token,
  });

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw
};

export const resetPassword = async (req: Request, res: Response) => {
  resetPasswordSchema.parse(req.body);
  const { email, newPassword } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new BadRequestException('User not found', ErrorCode.USER_NOT_FOUND);
  }

  const hashedPassword = hashSync(newPassword, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  res.status(200).json({
    message: 'Password reset successfully',
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    throw new BadRequestException('User not found', ErrorCode.USER_NOT_FOUND);
  }

  res.status(200).json({
    message: 'User deleted successfully',
    data: user,
  });
};
