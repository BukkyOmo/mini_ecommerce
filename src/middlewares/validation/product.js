import Joi from 'joi';

const createProductSchema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().required(),
    description: Joi.string().min(10).max(255).required(),
    image_url: Joi.string().required()
});

class ProductMiddleware {
    static async ValidateCreateProduct(req, res, next) {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: 'Please fill all fields',
                statusCode: 400,
                status: 'Failure'
            });
        }
        try {
            await Joi.validate(req.body, createProductSchema);
            return next();
        } catch (error) {
            return res.status(400).json({
                message: error.details[0].message.replace(/"/g, ''),
                statusCode: 400,
                status: 'Failure'
            });
        }
    }
}

export default ProductMiddleware;
