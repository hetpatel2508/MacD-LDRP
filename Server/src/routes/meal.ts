import { Router } from 'express';
import { errorHandler } from '../../error-handler';
import authMiddleware from '../middlewares/auth';
import {
  createMeal,
  createMealWithPrice,
  deleteMeal,
  getMealByMealCategory,
  getMeals,
  updateMeal,
} from '../controllers/meal';
import adminMiddleware from '../middlewares/admin';

const mealRouter: Router = Router();

mealRouter.post('/', [authMiddleware], errorHandler(createMeal));
mealRouter.post('/special', [authMiddleware, adminMiddleware], errorHandler(createMealWithPrice));
mealRouter.get('/', [authMiddleware], errorHandler(getMeals));
mealRouter.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateMeal));
mealRouter.get('/:id', [authMiddleware], errorHandler(getMealByMealCategory));
mealRouter.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteMeal));

export default mealRouter;
