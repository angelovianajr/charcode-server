var helmet = require('helmet');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var validator = require('express-validator');
var cookieParser = require('cookie-parser');

function configureMiddlewares(app) {
    const logger = morgan(process.env.LOGGER_TYPE);

    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(logger);
    app.use(validator());
    app.use(cookieParser());
}

module.exports = configureMiddlewares;