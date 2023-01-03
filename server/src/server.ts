import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import logger from './api/utils/logger';
import { config } from './config/config';
import routes from './api/routes';

const app = express();

mongoose.set('strictQuery', false);
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then()
  .then(() => {
    logger.info('Connected to MongoDB');
    StartServer();
  })
  .catch((error) => {
    logger.error(error);
  });

const StartServer = () => {
  app.use((req, res, next) => {
    logger.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
      logger.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });
    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });

  app.use('/api', routes);

  app.use((req, res, next) => {
    const error = new Error('Not found');
    logger.error(error);
    res.status(404).json({
      message: error.message
    });
  });
  http.createServer(app).listen(config.server.port, () => logger.info(`Server is running on port ${config.server.port}`));
};
