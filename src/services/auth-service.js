import jwt from 'jsonwebtoken';

const { SECURITY_SECRET, TOKEN_EXPIRE_TIME } = process.env;

function createToken(user) {
    const tokenUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles
    };

    const tokenConfig = {
        expiresIn: config.app.tokenExpiresTime * 60 * 60
    };

    return jwt.sign(tokenUser, SECURITY_SECRET, tokenConfig);
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECURITY_SECRET, function (err, decoded) {
            if (err) reject(err);

            resolve(decoded);
        });
    });
}

export default {
    createToken,
    verifyToken
};