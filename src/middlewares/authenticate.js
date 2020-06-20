import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object
 */
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({
            message: 'Access denied, no token provided',
            statusCode: 403,
            status: 'Failure'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid token. Please provide a valid token',
            statusCode: 400,
            status: 'Failure'
        });
    }
}

export default verifyToken;
