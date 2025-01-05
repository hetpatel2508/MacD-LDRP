import { Router } from 'express';
import { getUser, login, signUp } from '../controllers/user';
import { errorHandler } from '../../error-handler';

const userRouter = Router();

userRouter.post('/', errorHandler(signUp));
userRouter.get('/', errorHandler(login));

export default userRouter;
