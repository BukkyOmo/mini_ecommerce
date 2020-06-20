import { Router } from 'express';
import CartController from '../controllers/cart';
import CartMiddleware from '../middlewares/validation/cart';
import verifyToken from '../middlewares/authenticate';

const router = Router();

router.post('/:product_id', verifyToken, CartMiddleware.ValidateCartProduct, CartController.addToCart);

export default router;
