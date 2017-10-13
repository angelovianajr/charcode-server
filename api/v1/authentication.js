var router = require('express').Router();
var jwt = require('jsonwebtoken');

const securityConfig = process.env.SECURITY_SECRET;
var User = require('../../models/user');
var authService = require('../../services/auth-service');
var userService = require('../../services/user-service');

function signin(req, res) {
    // TODO: Adicionar outras validações
    req.checkBody('email', 'Please, use a valid email').isEmail();
    req.checkBody('password', 'Password have at least 8 digits').isLength({ min: 8 })

    if (req.validationErrors()) {
        res.status(400).send(validationErrors);
    }

    // cria um objeto usuário para login
    var user = new User({
        email: req.body.email,
        password: req.body.password
    });

    userService.findByEmail(user.email).then(function (userFind) {
        return new Promisse(function (resolve, reject) {
            userFind.comparePassword(user.password, function (err, match) {
                if (err) reject(err);

                resolve(userFind);
            });
        });
    }).then(function (userFind) {
        var token = authService.createToken(userFind);
        res.status(200).json({ token });
    }).catch(function (error) {
        res.status(500).send(error);
    });
};

function signup() {
    // TODO: Adicionar outras validações
    req.checkBody('name', 'Name cannot be empty').notEmpty();
    req.checkBody('email', 'Please, use a valid email').notEmpty().isEmail();
    req.checkBody('password', 'Password cannot be empty').notEmpty();

    if (req.validationErrors()) {
        return res.status(400).send(errors);
    }

    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    userService.findByEmail(newUser.email).then(function (user) {
        return new Promise(function (resolve, reject) {
            newUser.save(function (err) {
                if (err) reject(err);

                resolve();
            });
        });
    }).then(function () {
        res.status(201).json({ user });
    }).catch(function (error) {
        res.status(500).send(error);
    });
};

router.route('/signin').post(signin);
router.route('/signup').post(signup);

module.exports = router;