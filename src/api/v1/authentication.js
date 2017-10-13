import { Router } from 'express';
import jwt from 'jsonwebtoken';

import User from '../../models/user';
import authService from '../../services/auth-service';
import userService from '../../services/user-service';

const securityConfig = process.env.SECURITY_SECRET;

const router = Router();

function signin(req, res) {
    // TODO: Adicionar outras validações
    req.checkBody('email', 'Please, use a valid email').isEmail();
    req.checkBody('password', 'Password have at least 8 digits').isLength({ min: 8 })

    if (req.validationErrors()) {
        res.status(400).send(validationErrors);
    }

    // cria um objeto usuário para login
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    userService.findByEmail(user.email).then((userFind) => {
        return new Promisse((resolve, reject) => {
            userFind.comparePassword(user.password, (err, match) => {
                if (err) reject(err);

                resolve(userFind);
            });
        });
    }).then((userFind) => {
        const token = authService.createToken(userFind);
        res.status(200).json({ token });
    }).catch((error) => {
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

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    userService.findByEmail(newUser.email).then((user) => {
        return new Promise((resolve, reject) => {
            newUser.save((err) => {
                if (err) reject(err);

                resolve();
            });
        });
    }).then(() => {
        res.status(201).json({ user });
    }).catch((error) => {
        res.status(500).send(error);
    });
};

router.route('/signin').post(signin);
router.route('/signup').post(signup);

export default router;