import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import News, { INews, INewsDocument } from '../models/News';
import logger from '../utils/logger';

const getAllNews = async () => {
  try {
    return await News.find({});
  } catch (error) {
    logger.error(error);
  }
};

const getNewsById = async (filter: FilterQuery<INewsDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await News.findOne(filter, {}, options);
  } catch (error) {
    logger.error(error);
  }
};

const createNews = async (news: INews) => {
  try {
    return await News.create(news);
  } catch (error) {
    logger.error(error);
  }
};

const updateNews = async (filter: FilterQuery<INewsDocument>, update: UpdateQuery<INewsDocument>, options: QueryOptions) => {
  try {
    return await News.findOneAndUpdate(filter, update, options);
  } catch (error) {
    logger.error(error);
  }
};

const deleteNews = async (filter: FilterQuery<INews>) => {
  try {
    return await News.deleteOne(filter);
  } catch (error) {
    logger.error(error);
  }
};

export { getAllNews, getNewsById, createNews, updateNews, deleteNews };
