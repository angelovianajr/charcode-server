var Router = require('express').Router;
var auth = require('../../middlewares/authentication');
var authentication = require('./authentication');
var users = require('./users');

var router = Router();

router.use(authentication);
route.use(auth);
router.use(users);

module.exports = router;