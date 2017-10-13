var Router = require('express').Router;
var v1 = require('./v1/index');

var basePath = '/api';

var router = Router();

router.use(`${basePath}/v1`, v1);

module.exports = router;