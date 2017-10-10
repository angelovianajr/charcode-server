const config = require('./../bin/config.js');
const securityConfig = config.security;
var router = require('express').Router();
var User = require('./../models/user');
var jwt = require('jsonwebtoken');

// users route 
router.post("/signin", function (req, res, next) {

    // TODO: Adicionar outras validações
    req.checkBody("email", "Please, use a valid email").isEmail();
    req.checkBody("password", "Password have at least 8 digits").isLength({ min: 8 })

    // Faz a validação
    var validationErrors = req.validationErrors();
    // Caso tenha erros, retorna os erros para o cliente
    if (validationErrors)
        return res.status(400).send(validationErrors);

    // cria um objeto usuário para login
    var user = new User({
        email: req.body.email,
        password: req.body.password
    });

    // Procura pelo usuário no banco
    User.findOne({ email: user.email }, (err, searchedUser) => {
        if (err)
            return res.send(err);

        // Verifica se nanhum usuário foi encontrado, ou seja o email é unico
        if (searchedUser) {
            // Compara a senha do usuário
            searchedUser.comparePassword(user.password, (err, isMatch) => {
                if (err)
                    return res.send(err);

                // A senha está correta
                if (isMatch) {
                    // Gera o token JWT
                    var token = jwt.sign({
                        id: searchedUser._id,
                        name: searchedUser.name,
                        email: searchedUser.email,
                        roles: searchedUser.roles
                    },
                        securityConfig.secret,
                        {
                            expiresIn: config.app.tokenExpiresTime * 60 * 60
                        })
                    // Retorna o token para o usuário que logou com sucesso
                    res.status(200).json({
                        msg: "logged with sucess",
                        token: token
                    });
                } else {
                    res.status(400).json({ msg: "Incorrect password" })
                }
            });
            // Caso o email não seja unico, 
        } else {
            res.status(400).json({ msg: 'User not found' })
        }

    });
});


router.route("/signup")
    // Create new user
    .post(function (req, res, next) {

        // TODO: Adicionar outras validações
        req.checkBody("name", "Name cannot be empty").notEmpty();
        req.checkBody("email", "Please, use a valid email").isEmail();
        req.checkBody("password", "Password cannot be empty").notEmpty();

        var errors = req.validationErrors();
        if (errors)
            return res.status(400).send(errors);

        var user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        User.findOne({ email: user.email }, function (err, searchedUser) {
            if (err)
                return res.send(err);

            // Verifica se nanhum usuário foi encontrado, ou seja o email é unico
            if (!searchedUser) {
                // Salva o usuário e retorna erros
                user.save(function (err) {
                    if (err)
                        return res.send(err);

                    res.status(201).json({ msg: 'User registered', data: user });
                });
                // Caso o email não seja unico, 
            } else {
                res.status(400).json({ msg: 'Email alredy in use.' })
            }
        })
    });

module.exports = router;