import { Router } from 'express';
import { errorHandler } from '../../error-handler';
import authMiddleware from '../middlewares/auth';
import { addAddress, deleteAddress, listAddress, updateUser } from '../controllers/users';
import {
  addItemToCart,
  addMealToCart,
  changeQuantity,
  clearCart,
  deleteItemToCart,
  getCart,
} from '../controllers/cart';

const cartRouter: Router = Router();

cartRouter.post('/', [authMiddleware], errorHandler(addItemToCart));
cartRouter.post('/meal', [authMiddleware], errorHandler(addMealToCart));
cartRouter.get('/', [authMiddleware], errorHandler(getCart));
cartRouter.delete('/:id', [authMiddleware], errorHandler(deleteItemToCart));
cartRouter.delete('/', [authMiddleware], errorHandler(clearCart));
cartRouter.put('/:id', [authMiddleware], errorHandler(changeQuantity));

export default cartRouter;
