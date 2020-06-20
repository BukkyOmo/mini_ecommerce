import { Router } from 'express';
import ProductController from '../controllers/product';
import ProductMiddleware from '../middlewares/validation/product';
import verifyToken from '../middlewares/authenticate';

const router = Router();

router.post('/', verifyToken, ProductMiddleware.ValidateCreateProduct, ProductController.createProduct);
router.get('/', verifyToken, ProductController.getProductsToBuy);
router.get('/mine', verifyToken, ProductController.getProductsByUser);
router.get('/:product_id', verifyToken, ProductController.getOneProduct);
router.patch('/:product_id', verifyToken, ProductMiddleware.ValidateCreateProduct, ProductController.updateProduct);
router.delete('/:product_id', verifyToken, ProductController.deleteProduct);

export default router;
