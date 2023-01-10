import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import News, { INews, INewsDocument } from '../models/News';
import logger from '../utils/logger';

const getAllNews = async (index: any, status: any, search: any) => {
  const pase_size = 8;
  try {
    var filter;
    var skip = parseInt(index);
    skip = skip == 1 ? 0 : (skip - 1) * pase_size;
    status == 'null' && search == 'null'
      ? (filter = {})
      : status == 'null' && search != 'null'
      ? (filter = { title: { $regex: search, $options: 'i' } })
      : status != 'null' && search == 'null'
      ? (filter = { status: status })
      : (filter = { status: status, title: { $regex: search, $options: 'i' } });
    var arr = await News.find(filter).skip(skip).limit(pase_size);
    var count = await News.find(filter);
    return { listNews: arr, count: count.length };
  } catch (error) {
    logger.error(error);
  }
};

const getNews = async (filter: FilterQuery<INewsDocument>, options: QueryOptions = { lean: true }) => {
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

export { getAllNews, getNews, createNews, updateNews, deleteNews };
