import Cart from '../models/cart';
import Product from '../models/product';

class CartController {
    /**
    * user add product to cart
    * @param  {object} req - object
    * @param {object} res - response object
    * @return {json} res.json
    */
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
                Cart.findOne({ product_id, user_id }).exec((err, item) => {
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

    /**
    * user remove product from cart
    * @param  {object} req - object
    * @param {object} res - response object
    * @return {json} res.json
    */
    static async removeFromCart(req, res) {
        const { product_id } = req.params;
        const { id: user_id } = req.user;
        try {
            Cart.findByIdAndDelete(product_id)
                .where('user_id', user_id)
                .exec((err, product) => {
                    if (err) {
                        return res.status(400).json({
                            message: 'Product failed to remove from cart',
                            statusCode: 400,
                            status: 'Failure'
                        });
                    }
                    if (!product) {
                        return res.status(400).json({
                            message: 'Product does not exist in your cart',
                            statusCode: 400,
                            status: 'Failure'
                        });
                    }
                    return res.status(200).json({
                        message: 'Product successfully removed from cart',
                        statusCode: 200,
                        status: 'Success'
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

    /**
    * user get all product in their cart
    * @param  {object} req - object
    * @param {object} res - response object
    * @return {json} res.json
    */
    static async getAllProductsInCart(req, res) {
        const { id: user_id } = req.user;
        Cart.find({})
            .where('user_id', user_id)
            .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    message: 'Products in cart failed to fetch',
                    statusCode: 400,
                    status: 'Failure'
                });
            }
            return res.status(200).json({
                message: 'Products successfully fetched from cart',
                statusCode: 200,
                status: 'Success',
                products
            });
        })
    }
}

export default CartController;
