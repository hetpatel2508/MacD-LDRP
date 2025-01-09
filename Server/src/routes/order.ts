import { Router } from 'express';
import { errorHandler } from '../../error-handler';
import authMiddleware from '../middlewares/auth';
import {
  createOrders,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/order';

const orderRouter: Router = Router();

orderRouter.post('/', [authMiddleware], errorHandler(createOrders));
orderRouter.get('/', [authMiddleware], errorHandler(getAllOrders));
orderRouter.patch('/:id', [authMiddleware], errorHandler(updateOrderStatus));
orderRouter.get('/:id', [authMiddleware], errorHandler(getOrderById));
orderRouter.delete('/:id', [authMiddleware], errorHandler(deleteOrder));

export default orderRouter;
