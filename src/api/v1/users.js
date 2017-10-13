var express = require('express');
var router = express.Router();

var userService = require('../../services/user-service');

function listAll(req, res) {
  userService.listAll().then(function (users) {
    res.json(users);
  }).catch(function (error) {
    res.status(400).send(err);
  });
}

router.route('/users')
  .get(listAll);

module.exports = router;
