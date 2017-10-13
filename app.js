var express = require('express');
var configExpress = require('./config/express');
var configDatabase = require('./config/database');
var dotenv = require('dotenv-safe');

dotenv.config();

var app = express();

configExpress(app);

configDatabase.connectToDatabase(process.env.DB_BASE, process.env.DB_HOST, process.env.DB_USER, process.env.DB_PWD);

app.use('/api/v1', require('./routes.js'));

app.listen(process.env.PORT);
