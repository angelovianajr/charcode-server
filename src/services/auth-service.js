const authSecret = process.env.SECURITY_SECRET;

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

    return jwt.sign(tokenUser, authSecret, tokenConfig);
}

export default {
    createToken
};