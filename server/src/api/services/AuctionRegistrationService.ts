import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import AuctionRegistration, { IAuctionRegistration, IAuctionRegistrationDocument } from '../models/AuctionRegistration';
import logger from '../utils/logger';

const getAllAuctionRegistrations = async () => {
  try {
    return await AuctionRegistration.find({});
  } catch (error) {
    logger.error(error);
  }
};

const getAuctionRegistration = async (filter: FilterQuery<IAuctionRegistrationDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await AuctionRegistration.find(filter, {}, options).populate('user');
  } catch (error) {
    logger.error(error);
  }
};

const createAuctionRegistration = async (auctionRegistration: IAuctionRegistration) => {
  try {
    return await AuctionRegistration.create(auctionRegistration);
  } catch (error) {
    logger.error(error);
  }
};

const updateAuctionRegistration = async (
  filter: FilterQuery<IAuctionRegistrationDocument>,
  update: UpdateQuery<IAuctionRegistrationDocument>,
  options: QueryOptions
) => {
  try {
    return await AuctionRegistration.findOneAndUpdate(filter, update, options);
  } catch (error) {
    logger.error(error);
  }
};

export { getAllAuctionRegistrations, getAuctionRegistration, createAuctionRegistration, updateAuctionRegistration };
