import { Router } from 'express';
import { errorHandler } from '../../error-handler';
import { checkoutFunction, varifyFunction } from '../controllers/razorpay';

const razerpayRouter = Router();

razerpayRouter.post('/checkout', errorHandler(checkoutFunction));
razerpayRouter.post('/verify', errorHandler(varifyFunction));

export default razerpayRouter;
