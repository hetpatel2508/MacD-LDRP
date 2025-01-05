import { Router } from 'express';
import { getUser, login, resetPassword, signUp } from '../controllers/user';
import { errorHandler } from '../../error-handler';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';
import {
  createProduct,
  deleteProduct,
  getProductByCategory,
  getProducts,
  updateProduct,
} from '../controllers/product';

const productRouter = Router();

productRouter.post('/', [authMiddleware, adminMiddleware], errorHandler(createProduct));
productRouter.get('/', [authMiddleware], errorHandler(getProducts));
productRouter.get('/:id', [authMiddleware], errorHandler(getProductByCategory));
productRouter.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteProduct));
productRouter.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateProduct));

export default productRouter;
