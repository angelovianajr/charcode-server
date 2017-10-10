var express = require('express');
var router = express.Router();

router.route('/users')
  // Retorna todos os usuários
  .get(function (req, res, next) {

    User.find(function (err, users) {
      if (err)
        res.status(400).send(err);

      res.json(users);
    });
  })
  // Cria um novo usuário
  .post(function (req, res, next) {

    // Faz a validação dos campos recebidos no post
    req.checkBody("name", "Name cannot be empty").notEmpty();
    req.checkBody("email", "Email cannot be empty").notEmpty();
    req.checkBody("email", "Please, use a valid email").isEmail();
    req.checkBody("password", "Password cannot be empty").notEmpty();

    // Retorna caso haja erro
    var errors = req.validationErrors();
    if (errors)
      res.status(400).send(errors);

    // Monta o schema usuário
    var user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Salva o usuário e retorna erros
    user.save(function (err) {
      if (err)
        res.send(err);

      res.status(201).json({ msg: 'User registered', data: user });
    });
  });

module.exports = router;
