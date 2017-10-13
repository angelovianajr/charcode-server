var express = require('express');
var dotenv = require('dotenv-safe');
var configExpress = require('./config/express');
var configDatabase = require('./config/database');
var router = require('./api/index');

dotenv.config();

var app = express();

configExpress(app);
configDatabase.connectToDatabase(process.env.DB_BASE, process.env.DB_HOST, process.env.DB_USER, process.env.DB_PWD);

app.use(router);

app.listen(process.env.PORT);
