const securityConfig = require('./../bin/config.js').security;
var jwt = require('jsonwebtoken');

var authenticated = (req, res, next) => {

    // Busca o token no corpo, na url e no header
    var token = req.headers['x-access-token'] || req.body.token || req.query.token;

    // Verifica se foi achado o token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, securityConfig.secret, function (err, decoded) {
            if (err)
                return res.status(403).json({ msg: 'Invalid token.' });

            // Se deu tudo certo, prossegue com o fluxo
            req.user = decoded;
            next();
        });
    } else {
        // Caso o token não tenha sido informado na requisição
        return res.status(403).json({
            msg: "Token not found. Please do login."
        });
    }
}

module.exports = authenticated;