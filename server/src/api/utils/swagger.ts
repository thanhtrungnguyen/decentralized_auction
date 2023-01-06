import { Express, Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../../package.json';
import logger from './logger';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DAP - REST API Document',
      version: version,
      description: 'REST API Document for the Decentralized Auction Platform Project'
    },
    component: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/api/routes/*.ts']
};

const swaggerSpecification = swaggerJsDoc(options);

const swaggerDocs = (app: Express, port: number) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));

  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpecification);
  });

  logger.info(`API Documentation available at http://localhost:${port}/api-docs, http://localhost:${port}/api-docs.json`);
};

export default swaggerDocs;
