import { Router } from 'express';
import userRouter from './user';

const rootRouter: Router = Router();

rootRouter.use('/user', userRouter);

rootRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

export default rootRouter;
