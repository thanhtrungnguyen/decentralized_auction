import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Auction, { IAuction, IAuctionDocument } from '../models/Auction';
import logger from '../utils/logger';

const getAllAuctions = async () => {
  try {
    return await Auction.find({}).populate('property');
  } catch (error) {
    logger.error(error);
  }
};
const getListAuctions = async (index: any, status: any, search: any) => {
  var filter;
  const page_size = 8;
  status == 'null' && search == 'null'
    ? (filter = {})
    : status == 'null' && search != 'null'
    ? (filter = { name: { $regex: search, $options: 'i' } })
    : status != 'null' && search == 'null'
    ? (filter = { status: status })
    : (filter = { status: status, name: { $regex: search, $options: 'i' } });

  try {
    var skip = parseInt(index);
    skip = skip == 1 ? 0 : (skip - 1) * page_size;
    var arr = await Auction.find(filter).populate('property').sort({ createdAt: -1 }).skip(skip).limit(page_size);
    var count = await Auction.find(filter);
    return { listAuction: arr, count: count.length };
  } catch (error) {
    logger.error(error);
  }
};
const getListAuctionsForBidder = async (index: any, status: any, search: any) => {
  var filter;
  status == 'null' && search == 'null'
    ? (filter = {})
    : status == 'null' && search != 'null'
    ? (filter = { name: { $regex: search, $options: 'i' } })
    : status != 'null' && search == 'null'
    ? (filter = { status: status })
    : (filter = { status: status, name: { $regex: search, $options: 'i' } });

  try {
    var skip = parseInt(index);
    const page_size = 3;
    skip = skip == 1 ? 0 : (skip - 1) * page_size;
    var arr = await Auction.find(filter).populate('property').sort({ createdAt: -1 }).skip(skip).limit(page_size);
    var count = await Auction.find(filter);
    return { listAuction: arr, count: count.length };
  } catch (error) {
    logger.error(error);
  }
};

const getAuction = async (filter: FilterQuery<IAuctionDocument>, options: QueryOptions = { lean: true }) => {
  try {
    return await Auction.findOne(filter, {}, options).populate({
      path: 'property',
      populate: {
        path: 'category'
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

const createAuction = async (auction: Object) => {
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

export { getAllAuctions, getAuction, createAuction, updateAuction, deleteAuction, getListAuctions, getListAuctionsForBidder };
