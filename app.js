var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var morgan = require('morgan');
var dotenv = require('dotenv-safe');

dotenv.config();

var app = express();

// Activate bodyparser to convert json to js object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Activate validation to all requests
app.use(validator());
// Activte cookieparser to convert cookies on request and insert in req.cookies
app.use(cookieParser());
// Log requests on terminal
app.use(morgan('dev'));


app.use('/api/v1', require('./routes.js'));

module.exports = app;
