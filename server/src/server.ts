import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import logger from './api/utils/logger';
import routes from './api/routes';
import swaggerDocs from './api/utils/swagger';
import connectMongo from './api/utils/connectMongo';
import deserializeUser from './api/middleware/deserializeUser';
import { connectSocket } from './socketio';
import { config } from './config/custom-environment-variables';
const app = express();

connectMongo()
  .then(() => {
    startServer();
  })
  .catch((error) => {
    logger.error(error);
  });

const startServer = () => {
  app.use((req, res, next) => {
    const info = `- IP: [${req.socket.remoteAddress}] - METHOD: [${req.method}] - URL: [${req.url}] `;
    logger.info(`Request  ${info}`);
    res.on('finish', () => {
      logger.info(`Response ${info} - STATUS: [${res.statusCode}]`);
    });
    next();
  });

  app.use(
    cors({
      origin: config.client.address,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
      credentials: true
    })
  );
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(deserializeUser);
  app.disable('etag');
  app.use('/api', routes);

  swaggerDocs(app, config.server.port);

  ///

  app.use((req, res, next) => {
    const error = new Error('Not found');
    logger.error(error);
    res.status(404).json({
      name: error.name,
      message: error.message
    });
  });

  connectSocket(app);
};
