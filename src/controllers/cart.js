import Cart from '../models/cart';
import Product from '../models/product';

class CartController {
    static async addToCart(req, res) {
        const { quantity } = req.body;
        const { id: user_id } = req.user;
        const { product_id } = req.params;
        try {
            Product.findById(product_id).exec((err, product) => {
                if (!product) {
                    return res.status(400).json({
                        message: 'Product you are trying to add to cart does not exist in database',
                        statusCode: 400,
                        status: 'Failure'
                    });
                }
                Cart.findOne({ product_id }).exec((err, item) => {
                    if (item) {
                        return res.status(400).json({
                            message: 'Product already added to cart',
                            statusCode: 400,
                            status: 'Failure'
                        });
                    }
                    const cart = new Cart({
                        product_id,
                        quantity,
                        user_id
                    });
                    cart.save((err, cart) => {
                        if (err) {
                            return res.status(400).json({
                                message: 'Product failed to add to cart',
                                statusCode: 400,
                                status: 'Failure'
                            });
                        }
                        return res.status(201).json({
                            message: 'Product successfully saved in cart',
                            statusCode: 201,
                            status: 'Success',
                            cart
                        });
                    });
                });
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                statusCode: 500,
                status: 'Failure'
            });
        }
    }
}

export default CartController;
