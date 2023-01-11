import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import User, { IUser, IUserDocument } from '../models/User';
import logger from '../utils/logger';
import { omit } from 'lodash';
import Individual from '../models/Individual';
import Organization from '../models/Organization';
const page_size = 8;
const getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (error) {
    logger.error(error);
  }
};
const validatePassword = async ({ username, password }: { username: string; password: string }) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return false;
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return false;
    }
    return omit(user.toJSON(), 'password');
  } catch (error) {
    logger.error(error);
  }
};

const findUser = async (filter: FilterQuery<IUserDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await User.findOne(filter, {}, options);
  } catch (error) {
    logger.error(error);
  }
};

const createUser = async (user: IUser) => {
  try {
    const userCreated = await User.create(user);
    return omit(userCreated.toJSON(), 'password');
  } catch (error) {
    logger.error(error);
  }
};

const updateUser = async (filter: FilterQuery<IUserDocument>, update: UpdateQuery<IUserDocument>, options: QueryOptions) => {
  try {
    return await User.findOneAndUpdate(filter, update, options);
  } catch (error) {
    logger.error(error);
  }
};

const deleteUser = async (filter: FilterQuery<IUser>) => {
  try {
    return await User.deleteOne(filter);
  } catch (error) {
    logger.error(error);
  }
};
const getBidderFilter = async (index: any, status: any, search: any) => {
  const role = 'bidder';
  try {
    var filterUser, filter, arr;
    status == 'null' ? (filterUser = { role: role }) : (filterUser = { role: role, status: status });
    search == 'null' ? (filter = {}) : (filter = { email: { $regex: search, $options: 'i' } });
    await Individual.find(filter)
      .populate({
        path: 'user',
        match: filterUser
      })
      .sort({ createdAt: -1 })
      .then((result) => {
        arr = result.filter((element) => element.user !== null).slice((index - 1) * page_size, index * page_size);
      });
    var count = await Individual.find(filter)
      .populate({
        path: 'user',
        match: filterUser
      })
      .exec();
    count = count.filter((element) => element.user !== null);
    return { listUser: arr, count: count.length };
  } catch (error) {
    logger.error(error);
  }
};
const getSellerFilter = async (index: any, status: any, search: any) => {
  const role = 'seller';
  try {
    var filterUser, filter;
    status == 'null' ? (filterUser = { role: role }) : (filterUser = { role: role, status: status });
    search == 'null' ? (filter = {}) : (filter = { email: { $regex: search, $options: 'i' } });
    var arr = await Individual.find(filter)
      .populate({
        path: 'user',
        match: filterUser
      })
      .sort({ createdAt: -1 })
      .exec();
    arr = arr.filter((element) => element.user !== null).slice((index - 1) * page_size, index * page_size);
    var count = await Individual.find(filter)
      .populate({
        path: 'user',
        match: filterUser
      })
      .exec();
    count = count.filter((element) => element.user !== null);
    return { listUser: arr, count: count.length };
  } catch (error) {
    logger.error(error);
  }
};
const getManagerFilter = async (index: any, status: any, search: any) => {
  const role = 'manager';
  try {
    var filterUser, filter, arr;
    status == 'null' ? (filterUser = { role: role }) : (filterUser = { role: role, status: status });
    search == 'null' ? (filter = {}) : (filter = { email: { $regex: search, $options: 'i' } });
    await Individual.find({ filter })
      .populate({
        path: 'user',
        match: filterUser
      })
      .sort({ createdAt: -1 })
      .then((result) => {
        arr = result.filter((element) => element.user !== null).slice((index - 1) * page_size, index * page_size);
      });
    var count = await User.find({ role: role });
    return { listUser: arr, count: count.length };
  } catch (error) {
    logger.error(error);
  }
};

export { getAllUsers, findUser, createUser, updateUser, deleteUser, validatePassword, getBidderFilter, getSellerFilter, getManagerFilter };
