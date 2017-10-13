var express = require('express');
var configExpress = require('./config/express');
var dotenv = require('dotenv-safe');

dotenv.config();

var app = express();

configExpress(app);


app.use('/api/v1', require('./routes.js'));

module.exports = app;
