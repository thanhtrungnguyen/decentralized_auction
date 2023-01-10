import { database } from '../utils/connectFirebase';
import logger from '../utils/logger';

const COLLECTION_PATH = '/moralis/events/Auction';

const getAll = async () => {
  try {
    const logs = await database.collection(COLLECTION_PATH).get();
    let list: FirebaseFirestore.DocumentData[] = [];
    logs.forEach((doc) => {
      list.push(doc.data());
    });
    return list;
  } catch (error) {
    logger.error(error);
  }
};

const getCreatedAuctionById = async (auctionId: string) => {
  try {
    const logs = await database.collection(COLLECTION_PATH).where('name', '==', 'CreatedAuction').where('auctionId', '==', auctionId).get();
    let list: FirebaseFirestore.DocumentData[] = [];
    logs.forEach((doc) => {
      list.push(doc.data());
    });
    return list;
  } catch (error) {
    logger.error(error);
  }
};

const getPlacedBidById = async (auctionId: string) => {
  try {
    const logs = await database.collection(COLLECTION_PATH).where('name', '==', 'PlacedBid').where('auctionId', '==', auctionId).get();
    let list: FirebaseFirestore.DocumentData[] = [];
    logs?.forEach((doc) => {
      list.push(doc.data());
    });
    return list;
  } catch (error) {
    logger.error(error);
    return {};
  }
};

export { getAll, getCreatedAuctionById, getPlacedBidById };
