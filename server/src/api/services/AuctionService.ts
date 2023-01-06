import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Auction, { IAuction, IAuctionDocument } from '../models/Auction';
import logger from '../utils/logger';

const getAllAuctions = async () => {
  try {
    return await Auction.find({});
  } catch (error) {
    logger.error(error);
  }
};

const getAuctionById = async (filter: FilterQuery<IAuctionDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Auction.findOne(filter, {}, options).populate('property');
  } catch (error) {
    logger.error(error);
  }
};

const createAuction = async (auction: IAuction) => {
  try {
    return await Auction.create(auction);
  } catch (error) {
    logger.error(error);
  }
};

const updateAuction = async (filter: FilterQuery<IAuctionDocument>, update: UpdateQuery<IAuctionDocument>, options: QueryOptions) => {
  try {
    return await Auction.findOneAndUpdate(filter, update, options);
  } catch (error) {
    logger.error(error);
  }
};

const deleteAuction = async (filter: FilterQuery<IAuction>) => {
  try {
    return await Auction.deleteOne(filter);
  } catch (error) {
    logger.error(error);
  }
};

export { getAllAuctions, getAuctionById, createAuction, updateAuction, deleteAuction };
