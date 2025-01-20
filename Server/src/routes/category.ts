import { Router } from 'express';
import { getUser, login, resetPassword, signUp } from '../controllers/user';
import { errorHandler } from '../../error-handler';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getSpecificCategories,
  updateCategory,
} from '../controllers/category';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const categoryRouter = Router();

categoryRouter.post('/', [authMiddleware, adminMiddleware], errorHandler(createCategory));
categoryRouter.get('/', [authMiddleware], errorHandler(getCategories));
categoryRouter.get('/:id', [authMiddleware], errorHandler(getSpecificCategories));
categoryRouter.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteCategory));
categoryRouter.patch('/:id', [authMiddleware, adminMiddleware], errorHandler(updateCategory));

export default categoryRouter;
