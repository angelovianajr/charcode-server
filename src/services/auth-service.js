var authSecret = process.env.SECURITY_SECRET;

function createToken(user) {
    var tokenUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles
    };

    var tokenConfig = {
        expiresIn: config.app.tokenExpiresTime * 60 * 60
    };

    return jwt.sign(tokenUser, authSecret, tokenConfig);
}

module.exports = {
    createToken
};