import { match } from 'assert';
import { result } from 'lodash';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Auction, { IAuction, IAuctionDocument } from '../models/Auction';
import Category from '../models/Category';
import logger from '../utils/logger';

const getAllAuctions = async () => {
  try {
    return await Auction.find({}).populate('property');
  } catch (error) {
    logger.error(error);
  }
};
const getListAuctions = async (index: any, status: any, search: any, sellerName: any) => {
  var filter, filterUser, arr;
  const page_size = 8;
  status == 'null' && search == 'null'
    ? (filter = {})
    : status == 'null' && search != 'null'
    ? (filter = { name: { $regex: search, $options: 'i' } })
    : status != 'null' && search == 'null'
    ? (filter = { status: status })
    : (filter = { status: status, name: { $regex: search, $options: 'i' } });
  sellerName != 'null' ? (filterUser = { _id: sellerName }) : (filterUser = {});
  try {
    var skip = parseInt(index);
    skip = skip == 1 ? 0 : (skip - 1) * page_size;
    await Auction.find(filter)
      .populate({
        path: 'property',
        populate: {
          path: 'user',
          match: filterUser
        }
      })
      .sort({ createdAt: -1 })
      .then((result) => {
        arr = result.filter((item) => item.property.user != null).slice((index - 1) * page_size, index * page_size);
      });
    var count = await Auction.find(filter)
      .populate({
        path: 'property',
        populate: {
          path: 'user',
          match: filterUser
        }
      })
      .sort({ createdAt: -1 });

    count = count.filter((item) => item.property.user != null);
    return { listAuction: arr, count: count.length };
  } catch (error) {
    logger.error(error);
  }
};
const getListAuctionsForBidder = async (index: any, status: any, search: any, sort: any, category: any, minPrice: any, maxPrice: any) => {
  var arr, count;
  // status == 'null' && search == 'null'
  //   ? (filterAuction = { status: { $ne: 'Request' } })
  //   : status == 'null' && search != 'null'
  //   ? (filterAuction = { name: { $regex: search, $options: 'i' }, status: { $ne: 'Request' } })
  //   : status != 'null' && search == 'null'
  //   ? (filterAuction = { status: status })
  //   : (filterAuction = { status: status, name: { $regex: search, $options: 'i' } });
  const allStatus = ['Closed', 'Bidding', 'RegistrationTime', 'UpcomingForBid', 'Approved'];
  status === 'all' ? (status = [...allStatus]) : (status = status.split(','));
  if (category === '') {
    await Category.find({}).then((result) => (category = result));
  } else {
    category = category.split(',');
  }
  sort = parseInt(sort);
  try {
    var skip = parseInt(index);
    const page_size = 3;
    skip = skip == 1 ? 0 : (skip - 1) * page_size;
    //var arr = await Auction.find(filterAuction).populate('property').sort({ createdAt: -1 }).skip(skip).limit(page_size);
    await Auction.find({ name: { $regex: search, $options: 'i' }, status: { $ne: 'Request' } })
      .where('status')
      .in([...status])
      .populate({
        path: 'property',
        match: {
          startBid: { $gte: parseInt(minPrice), $lt: parseInt(maxPrice) }
        },
        options: {
          sort: sort === 0 ? {} : { startBid: sort }
        },
        populate: {
          path: 'category',
          match: {
            name: { $in: [...category] }
          }
        }
      })
      .sort(sort === 0 ? { createdAt: -1 } : {})
      .then((result) => {
        arr = result.filter((item) => item.property !== null && item.property.category !== null).slice((index - 1) * page_size, index * page_size);
      });
    await Auction.find({ name: { $regex: search, $options: 'i' }, status: { $ne: 'Request' } })
      .where('status')
      .in([...status])
      .populate({
        path: 'property',
        match: {
          startBid: { $gte: parseInt(minPrice), $lt: parseInt(maxPrice) }
        },
        options: {
          sort: sort === 0 ? {} : { startBid: sort }
        },
        populate: {
          path: 'category',
          match: {
            name: { $in: [...category] }
          }
        }
      })
      .sort(sort === 0 ? { createdAt: -1 } : {})
      .then((result) => {
        count = result.filter((item) => item.property !== null && item.property.category !== null).length;
      });
    return { listAuction: arr, count: count };
  } catch (error) {
    logger.error(error);
  }
};
const getListAuctionsForSeller = async (id: any, index: any, status: any, search: any) => {
  var filter, arr, count;
  status == 'null' && search == 'null'
    ? (filter = {})
    : status == 'null' && search != 'null'
    ? (filter = { name: { $regex: search, $options: 'i' } })
    : status != 'null' && search == 'null'
    ? (filter = { status: status })
    : (filter = { status: status, name: { $regex: search, $options: 'i' } });

  try {
    var skip = parseInt(index);
    const page_size = 8;
    skip = skip == 1 ? 0 : (skip - 1) * page_size;
    await Auction.find(filter)
      .populate({ path: 'property', match: { user: id }, populate: { path: 'category' } })
      .sort({ createdAt: -1 })
      .then((result) => {
        arr = result.filter((element) => element.property !== null).slice((index - 1) * page_size, index * page_size);
      });
    await Auction.find(filter)
      .populate({ path: 'property', match: { user: id }, populate: { path: 'category' } })
      .sort({ createdAt: -1 })
      .then((result) => {
        count = result.filter((element) => element.property !== null).length;
      });
    return { listAuction: arr, count: count };
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

export {
  getAllAuctions,
  getAuction,
  createAuction,
  updateAuction,
  deleteAuction,
  getListAuctions,
  getListAuctionsForBidder,
  getListAuctionsForSeller
};
