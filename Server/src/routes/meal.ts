import { Router } from 'express';
import { errorHandler } from '../../error-handler';
import authMiddleware from '../middlewares/auth';
import { createMeal, deleteMeal, getMealByMealCategory, getMeals } from '../controllers/meal';

const mealRouter: Router = Router();

mealRouter.post('/', [authMiddleware], errorHandler(createMeal));
mealRouter.get('/', [authMiddleware], errorHandler(getMeals));
mealRouter.get('/:id', [authMiddleware], errorHandler(getMealByMealCategory));
mealRouter.delete('/:id', [authMiddleware], errorHandler(deleteMeal));

export default mealRouter;
