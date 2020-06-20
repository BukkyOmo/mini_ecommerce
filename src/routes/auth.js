import { Router } from 'express';
import AuthController from '../controllers/auth';
import AuthMiddleware from '../middlewares/validation/auth';

const router = Router();

router.post('/signup', AuthMiddleware.ValidateSignUp, AuthController.signUpUser);
router.post('/signin', AuthMiddleware.ValidateSignIn, AuthController.signInUser);

export default router;
