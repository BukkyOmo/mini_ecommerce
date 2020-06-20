import User from '../models/user';
import AuthUtils from '../utils/auth';
import ResponseFormat from '../utils/responseFormat';

const { SuccessResponseFormat, FailureResponseFormat } = ResponseFormat;

class AuthController{
    static async signUpUser(req, res) {
        const { firstname, lastname, email, password } = req.body;
        try {
            User.findOne({ email }).exec((err, user) => {
                if (user) {
                    return res.status(400).json({
                        message: 'User already exists in database.',
                        statusCode: 400,
                        status: 'Failure'
                    })
                }
                const hashPassword = AuthUtils.hashPassword(password);
                user = new User({
                    firstname,
                    lastname,
                    email,
                    password: hashPassword
                });
                user.save(async (err, data) => {
                    if (err) {
                        return res.status(400).json({
                            message: 'User failed to saved',
                            statusCode: 400,
                            status: 'Failure'
                        });
                    }
                    const token = await AuthUtils.encodeToken({
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
}

export default AuthController;
