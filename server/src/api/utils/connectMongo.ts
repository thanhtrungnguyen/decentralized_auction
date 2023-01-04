import mongoose from 'mongoose';
import { config } from '../../config/config';
import logger from '../utils/logger';

export default async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error(error);
  }
};
