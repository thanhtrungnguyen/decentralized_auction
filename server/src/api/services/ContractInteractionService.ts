import { database } from '../utils/connectFirebase';
import logger from '../utils/logger';
import { parseEther } from '../utils/ethereumUnitConverter';
import { getAuctionRegistration } from './AuctionRegistrationService';

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

// Here is the service that you need
const getByAuctionId = async (auctionId: string) => {
  try {
    const condition = ['PlacedBid', 'RetractedBid'];
    const logs = await database.collection(COLLECTION_PATH).where('name', 'in', condition).where('auctionId', '==', auctionId).get();
    let list: FirebaseFirestore.DocumentData[] = [];
    logs?.forEach((doc) => {
      list.push(doc.data());
    });

    const auctionRegistration = await getAuctionRegistration({ auction: auctionId });

    let listLogs: any[] = [];
    list?.forEach((log) => {
      const logAny = log as any;
      auctionRegistration?.forEach((regis) => {
        const regisAny = regis as any;
        if (logAny?.bidder === regisAny.walletAddress) {
          const bigLog = { ...logAny, ...regisAny };
          listLogs.push(bigLog);
        }
      });
    });
    return listLogs;
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
    const listsort = bubbleSort(list);
    const auctionRegistration = await getAuctionRegistration({ auction: auctionId });

    let listLogs: any[] = [];
    listsort?.forEach((log) => {
      const logAny = log as any;
      auctionRegistration?.forEach((regis) => {
        const regisAny = regis as any;
        if (logAny?.bidder === regisAny.walletAddress) {
          const bigLog = { ...logAny, ...regisAny };
          listLogs.push(bigLog);
        }
      });
    });
    return listLogs;
  } catch (error) {
    logger.error(error);
  }
};
const bubbleSort = (array: FirebaseFirestore.DocumentData[]) => {
  for (let i = 0; i < array.length; i++) {
    for (let x = 0; x < array.length - 1 - i; x++) {
      if (array[x].blockTimestamp < array[x + 1].blockTimestamp) {
        [array[x], array[x + 1]] = [array[x + 1], array[x]];
      }
    }
  }
  return array;
};
const getAuctionPayment = async (auctionId: string) => {
  const condition = ['ClosedAuctionSuccessful'];
  try {
    const logs = await database.collection(COLLECTION_PATH).where('name', 'in', condition).where('auctionId', '==', auctionId).get();

    let list: FirebaseFirestore.DocumentData[] = [];
    logs?.forEach((doc) => {
      list.push(doc.data());
    });
    const auctionRegistration = await getAuctionRegistration({ auction: auctionId });

    let listLogs: any[] = [];
    list?.forEach((log) => {
      const logAny = log as any;
      auctionRegistration?.forEach((regis) => {
        const regisAny = regis as any;
        if (logAny?.bidder === regisAny.walletAddress) {
          const bigLog = { ...logAny, ...regisAny };
          listLogs.push(bigLog);
        }
      });
    });
    return listLogs[0];
  } catch (error) {
    logger.error(error);
  }
};
const getAuctionRegister = async (auctionId: string) => {
  const condition = ['RegisteredToBid'];
  try {
    const logs = await database.collection(COLLECTION_PATH).where('name', 'in', condition).where('auctionId', '==', auctionId).get();

    let list: FirebaseFirestore.DocumentData[] = [];
    logs?.forEach((doc) => {
      list.push(doc.data());
    });
    const auctionRegistration = await getAuctionRegistration({ auction: auctionId });

    let listLogs: any[] = [];
    list?.forEach((log) => {
      const logAny = log as any;
      auctionRegistration?.forEach((regis) => {
        const regisAny = regis as any;
        if (logAny?.bidder === regisAny.walletAddress) {
          const bigLog = { ...logAny, ...regisAny };
          listLogs.push(bigLog);
        }
      });
    });
    return listLogs;
  } catch (error) {
    logger.error(error);
  }
};
const getHighestBidByAuctionId = async (auctionId: string) => {
  const condition = ['PlacedBid'];
  try {
    const logs = await database.collection(COLLECTION_PATH).where('name', 'in', condition).where('auctionId', '==', auctionId).get();

    let list: FirebaseFirestore.DocumentData[] = [];
    logs?.forEach((doc) => {
      list.push(doc.data());
    });
    var highest = 0;
    list.map((item) => {
      if (parseFloat(parseEther(item.bidAmount)) > highest) {
        highest = parseFloat(parseEther(item.bidAmount));
      }
    });
    return highest;
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

export {
  getAll,
  getCreatedAuctionById,
  getPlacedBidById,
  getCountPlacedBidAndRetracted,
  getHighestBidByAuctionId,
  getByAuctionId,
  getAuctionRegister,
  getAuctionPayment
};
