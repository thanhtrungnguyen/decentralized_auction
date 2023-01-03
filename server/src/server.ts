import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './api/utils/logger';
import { config } from './config/config';
import routes from './api/routes';
import swaggerDocs from './api/utils/swagger';

const app = express();

mongoose.set('strictQuery', false);
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
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
  app.use(cors());

  app.use('/api', routes);

  swaggerDocs(app, config.server.port);

  app.use((req, res, next) => {
    const error = new Error('Not found');
    logger.error(error);
    res.status(404).json({
      name: error.name,
      message: error.message
    });
  });

  http.createServer(app).listen(config.server.port, async () => {
    logger.info(`Server is running at http://localhost:${config.server.port}`);
  });
};
