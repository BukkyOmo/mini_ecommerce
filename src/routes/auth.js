import { Router } from 'express';
import AuthController from '../controllers/auth';
import AuthMiddleware from '../middlewares/validation/auth';

const router = Router();

router.post('/signup', AuthMiddleware.ValidateSignUp, AuthController.signUpUser);

export default router;
