import { Router } from 'express';
import userRouter from './user';
import productRouter from './product';
import categoryRouter from './category';

const rootRouter: Router = Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/product', productRouter);
rootRouter.use('/category', categoryRouter);

rootRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

export default rootRouter;
