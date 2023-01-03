import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import User, { IUser, IUserDocument } from '../models/User';
import logger from '../utils/logger';

const getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (error) {
    logger.error(error);
  }
};

const getUserById = async (filter: FilterQuery<IUserDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await User.findOne(filter, {}, options);
  } catch (error) {
    logger.error(error);
  }
};

const createUser = async (user: IUser) => {
  try {
    return await User.create(user);
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

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
