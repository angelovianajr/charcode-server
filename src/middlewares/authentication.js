import jwt from 'jsonwebtoken';
import authService from '../services/auth-service';

export default function authenticated(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
        res.status(403).json({
            message: 'Token not found'
        })
    }

    authService.verifyToken(token).then((decodedToken) => {
        req.user = decoded;
        next();
    }).catch((error) => {
        res.status(403).json({
            message: 'Invalid token.'
        });
    });
};