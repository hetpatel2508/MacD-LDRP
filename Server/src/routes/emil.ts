import { Router } from 'express';
import { errorHandler } from '../../error-handler';
import { createEmail } from '../controllers/email';
import authMiddleware from '../middlewares/auth';

const emailRouter: Router = Router();

emailRouter.post('/', [authMiddleware], errorHandler(createEmail));

export default emailRouter;
