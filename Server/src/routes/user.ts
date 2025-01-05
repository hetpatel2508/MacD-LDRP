import { Router } from 'express';
import { deleteUser, getUser, login, resetPassword, signUp } from '../controllers/user';
import { errorHandler } from '../../error-handler';
import adminMiddleware from '../middlewares/admin';
import authMiddleware from '../middlewares/auth';

const userRouter = Router();

userRouter.post('/', errorHandler(signUp));
userRouter.get('/', errorHandler(login));
userRouter.patch('/', errorHandler(resetPassword));
userRouter.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteUser));

export default userRouter;
