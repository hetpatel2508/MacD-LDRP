import { Router } from 'express';
import { errorHandler } from '../../error-handler';
import authMiddleware from '../middlewares/auth';
import { createFeedback, getAllFeedback, getFeedbackByOrderId } from '../controllers/feedback';

const feedbackRouter: Router = Router();

feedbackRouter.post('/', [authMiddleware], errorHandler(createFeedback));
feedbackRouter.get('/', [authMiddleware], errorHandler(getAllFeedback));
feedbackRouter.get('/:id', [authMiddleware], errorHandler(getFeedbackByOrderId));

export default feedbackRouter;
