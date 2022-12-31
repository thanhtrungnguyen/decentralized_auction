import pino from 'pino';

const logger = pino(
  {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:yyyy-mm-dd HH:mm:ss',
        ignore: 'pid,hostname'
      }
    }
  },
  pino.destination(`${__dirname}/logger.log`)
);

export default logger;
