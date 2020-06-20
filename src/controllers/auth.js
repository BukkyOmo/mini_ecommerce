import User from '../models/user';
import AuthUtils from '../utils/auth';

class AuthController{
    /**
    * signUpUser
    * @param  {object} req - object
    * @param {object} res - response object
    * @return {json} res.json
    */
    static async signUpUser(req, res) {
        const { firstname, lastname, email, password } = req.body;
        try {
            User.findOne({ email }).exec((err, user) => {
                if (user) {
                    return res.status(400).json({
                        message: 'User already exists in database.',
                        statusCode: 400,
                        status: 'Failure'
                    });
                }
                const hashPassword = AuthUtils.hashPassword(password);
                user = new User({
                    firstname,
                    lastname,
                    email,
                    password: hashPassword
                });
                user.save((err, data) => {
                    if (err) {
                        return res.status(400).json({
                            message: 'User failed to save',
                            statusCode: 400,
                            status: 'Failure'
                        });
                    }
                    const token = AuthUtils.encodeToken({
                        id: data._id,
                        firstname,
                        lastname,
                        email
                    });
                    return res.status(201).json({
                        message: 'User created successfully',
                        statusCode: 201,
                        status: 'Success',
                        token
                    });
                });
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                statusCode: 500,
                status: 'Failure'
            });
        }
    }

    /**
    * signInUser
    * @param  {object} req - object
    * @param {object} res - response object
    * @return {json} res.json
    */
    static async signInUser(req, res) {
        const { email, password } = req.body;
        try {
            User.findOne({ email }).exec((error, user) => {
                if (!user) {
                    return res.status(400).json({
                        message: 'User does not exist in database.',
                        statusCode: 400,
                        status: 'Failure'
                    });
                }
                const verifyPassword = AuthUtils.comparePassword(password, user.password);
                if (!verifyPassword) {
                    return res.status(400).json({
                        message: 'Invalid email or password.',
                        statusCode: 400,
                        status: 'Failure'
                    });
                }
                const token = AuthUtils.encodeToken({
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email
                });
                return res.status(200).json({
                    message: 'User signed in successfully',
                    statusCode: 200,
                    status: 'Success',
                    token
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

export default AuthController;
