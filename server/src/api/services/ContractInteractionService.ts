import { database } from '../utils/connectFirebase';
import logger from '../utils/logger';
import { parseEther } from '../utils/ethereumUnitConverter';

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
    return {
      auctionId: list[0].auctionId,
      startRegistrationTime: list[0].startRegistrationTime,
      endRegistrationTime: list[0].endRegistrationTime,
      startAuctionTime: list[0].startAuctionTime,
      endAuctionTime: list[0].endAuctionTime,
      duePaymentTime: list[0].duePaymentTime,
      registrationFee: parseEther(list[0].registrationFee),
      depositAmount: parseEther(list[0].depositAmount),
      startBid: parseEther(list[0].startBid),
      priceStep: parseEther(list[0].startBid)
    };
  } catch (error) {
    logger.error(error);
  }
};

const getPlacedBidById = async (auctionId: string) => {
  const condition = ['PlacedBid', 'RetractedBid'];
  try {
    const logs = await database.collection(COLLECTION_PATH).where('name', 'in', condition).where('auctionId', '==', auctionId).get();

    let list: FirebaseFirestore.DocumentData[] = [];
    logs?.forEach((doc) => {
      list.push(doc.data());
    });

    return list;
  } catch (error) {
    logger.error(error);
  }
};
const getCountPlacedBidAndRetracted = async () => {
  try {
    const condition = ['PlacedBid', 'RetractedBid'];
    const logs = await database.collection(COLLECTION_PATH).where('name', 'in', condition).get();

    let list: FirebaseFirestore.DocumentData[] = [];
    logs?.forEach((doc) => {
      list.push(doc.data());
    });
    return list.length;
  } catch (error) {
    logger.error(error);
  }
};

export { getAll, getCreatedAuctionById, getPlacedBidById, getCountPlacedBidAndRetracted };
