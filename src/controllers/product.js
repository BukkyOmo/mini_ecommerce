import Product from '../models/product';

class ProductController {
    /**
    * create a product
    * @param  {object} req - object
    * @param {object} res - response object
    * @return {json} res.json
    */
    static async createProduct(req, res) {
        const { name, price, description, image_url } = req.body;
        const { id: created_by } = req.user;
        try {
            Product.findOne({ name, created_by }).exec((err, product) => {
                if (product) {
                    return res.status(400).json({
                        message: 'Product already created by you.',
                        statusCode: 400,
                        status: 'Failure'
                    });
                }
                product = new Product({
                    name,
                    price,
                    description,
                    image_url,
                    created_by
                });
                product.save((err, data) => {
                    if (err) {
                        return res.status(400).json({
                            message: 'Product failed to save',
                            statusCode: 400,
                            status: 'Failure'
                        });
                    }
                    return res.status(201).json({
                        message: 'Product created successfully',
                        statusCode: 201,
                        status: 'Success',
                        data
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
    * get products to buy
    * @param  {object} req - object
    * @param {object} res - response object
    * @return {json} res.json
    */
    static async getProductsToBuy(req, res) {
        const { id: created_by } = req.user;
        try {
            Product.find({})
                .where('created_by').ne(created_by)
                .exec((err, product) => {
                    if (err) {
                        return res.status(400).json({
                            message: 'Products failed to fetch',
                            statusCode: 400,
                            status: 'Failure'
                        });
                    }
                    return res.status(200).json({
                        message: 'Products created by other users fetched successfully',
                        statusCode: 200,
                        status: 'Success',
                        product
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
    * get my products
    * @param  {object} req - object
    * @param {object} res - response object
    * @return {json} res.json
    */
    static async getProductsByUser(req, res) {
        const { id: created_by } = req.user;
        try {
            Product.find({})
                .where('created_by', created_by)
                .exec((err, product) => {
                    if (err) {
                        return res.status(400).json({
                            message: 'Products failed to fetch',
                            statusCode: 400,
                            status: 'Failure'
                        });
                    }
                    return res.status(200).json({
                        message: 'Your products have been fetched successfully',
                        statusCode: 200,
                        status: 'Success',
                        product
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
    * get one product
    * @param  {object} req - object
    * @param {object} res - response object
    * @return {json} res.json
    */
    static async getOneProduct(req, res) {
        const { product_id } = req.params;
        try {
            Product.findById(product_id)
                .exec((err, product) => {
                    if (err) {
                        return res.status(400).json({
                            message: `Product with id ${product_id} failed to fetch`,
                            statusCode: 400,
                            status: 'Failure'
                        });
                    }
                    if (!product) {
                        return res.status(400).json({
                            message: 'Product does not exist in database',
                            statusCode: 400,
                            status: 'Failure'
                        });
                    }
                    return res.status(200).json({
                        message: 'Product fetched successfully',
                        statusCode: 200,
                        status: 'Success',
                        product
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

export default ProductController;
