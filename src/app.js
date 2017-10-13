import express from 'express';
import dotenv from 'dotenv-safe';
import configExpress from './config/express';
import configDatabase from './config/database';
import router from './api/index';

dotenv.config();

const app = express();

configExpress(app);
configDatabase.connectToDatabase(process.env.DB_BASE, process.env.DB_HOST, process.env.DB_USER, process.env.DB_PWD);

app.use(router);

app.listen(process.env.PORT);
