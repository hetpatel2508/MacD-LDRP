import { Router } from 'express';
import userRouter from './user';
import productRouter from './product';
import categoryRouter from './category';
import cartRouter from './cart';
import razerpayRouter from './razorpay';

const rootRouter: Router = Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/product', productRouter);
rootRouter.use('/category', categoryRouter);
rootRouter.use('/cart', cartRouter);
rootRouter.use('/payment', razerpayRouter);

rootRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

export default rootRouter;
