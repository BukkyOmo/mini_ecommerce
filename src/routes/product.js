import { Router } from 'express';
import ProductController from '../controllers/product';
import ProductMiddleware from '../middlewares/validation/product';
import verifyToken from '../middlewares/authenticate';

const router = Router();

router.post('/', verifyToken, ProductMiddleware.ValidateCreateProduct, ProductController.createProduct);
router.get('/', verifyToken, ProductController.getProductsToBuy);

export default router;
