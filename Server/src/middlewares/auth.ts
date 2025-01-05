import { NextFunction } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized';
import { ErrorCode } from '../exceptions/root';
import jsonwebtoken from 'jsonwebtoken';
import prisma from '../../DB/prisma';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    next(new UnauthorizedException('Token not found', ErrorCode.UNAUTHORIZED));
  }

  try {
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET as string) as any;

    const user = await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      next(new UnauthorizedException('User not found', ErrorCode.USER_NOT_FOUND));
    }

    req.user = user;
    req.hetPatel = "hello there, I'm here to help you out, My self Het Patel";
    next();
  } catch (error: any) {
    next(new UnauthorizedException('Something went wrong with the token', ErrorCode.UNAUTHORIZED));
  }
};

export default authMiddleware;
