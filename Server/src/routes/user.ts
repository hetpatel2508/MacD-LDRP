import { Router } from 'express';
import {
  changeRole,
  deleteUser,
  getAllUsers,
  getUser,
  login,
  resetPassword,
  signUp,
} from '../controllers/user';
import { errorHandler } from '../../error-handler';
import adminMiddleware from '../middlewares/admin';
import authMiddleware from '../middlewares/auth';

const userRouter = Router();

userRouter.post('/signup', errorHandler(signUp));
userRouter.get('/', [authMiddleware, adminMiddleware], errorHandler(getAllUsers));
userRouter.post('/login', errorHandler(login));
userRouter.patch('/', errorHandler(resetPassword));
userRouter.patch('/:id', [authMiddleware, adminMiddleware], errorHandler(changeRole));
userRouter.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteUser));

export default userRouter;
