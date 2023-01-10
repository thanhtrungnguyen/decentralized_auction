import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import User, { IUser, IUserDocument } from '../models/User';
import logger from '../utils/logger';
import { omit } from 'lodash';

const getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (error) {
    logger.error(error);
  }
};

const validatePassword = async ({ email, password }: { email: string; password: string }) => {
  try {
    const user = await User.findOne({ email });
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

export { getAllUsers, findUser, createUser, updateUser, deleteUser, validatePassword };
