import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { uploadFile } from '../../s3';
import News, { INews, INewsDocument } from '../models/News';
import logger from '../utils/logger';

const getAllNews = async (index: any, status: any, search: any) => {
  const pase_size = 4;
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
    var arr = await News.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pase_size);
    var count = await News.find(filter).count();
    return { listNews: arr, count: count };
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

const createNews = async (news: INews, files: { [fieldName: string]: Express.Multer.File[] }) => {
  var img1;
  try {
    const file1 = files['avatar'][0];
    if (file1) {
      img1 = await (await uploadFile(file1)).data;
      news.avatar = img1;
    } else {
      return { success: false, message: 'Upload avatar fail!!!' };
    }
    return await News.create(news);
  } catch (error) {
    logger.error(error);
  }
};
function isEmptyObject(obj: Object) {
  return JSON.stringify(obj) === '{}';
}
const updateNews = async (
  filter: FilterQuery<INewsDocument>,
  update: UpdateQuery<INewsDocument>,
  options: QueryOptions,
  files: { [fieldName: string]: Express.Multer.File[] }
) => {
  var img1;
  try {
    if (files) {
      const file1 = files['avatar'];
      if (file1) {
        img1 = await (await uploadFile(file1[0])).data;
        update.avatar = img1;
        if (!img1) {
          return { success: false, message: 'Upload avatar fail!!!' };
        }
      }
    }
    return await News.findOneAndUpdate(filter, update, options);
  } catch (error) {
    logger.error(error);
  }
};
const changeStatus = async (filter: FilterQuery<INewsDocument>, update: UpdateQuery<INewsDocument>, options: QueryOptions) => {
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

export { getAllNews, getNews, createNews, updateNews, deleteNews, changeStatus };
