import { Request, Response, NextFunction } from 'express';
import {
  getAllAuctions,
  getAuction,
  createAuction,
  updateAuction,
  deleteAuction,
  getListAuctions,
  getListAuctionsForBidder,
  getListAuctionsForSeller
} from '../services/AuctionService';
import { getProperty, updateProperty, updatePropertyStatus } from '../services/PropertyService';
import { createAuctionOnContract } from '../utils/runContractFunction';

export const getAllAuctionsHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllAuctions()
    .then((auctions) => {
      res.status(200).json({ auctions });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getListAuctionsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const index = req.params.index;
  const status = req.params.status;
  const search = req.params.search;
  const sellerName = req.params.sellerName;
  return await getListAuctions(index, status, search, sellerName)
    .then((auctions) => {
      res.status(200).json({ auctions });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getListAuctionsByBidderHandler = async (req: Request, res: Response, next: NextFunction) => {
  const index = req.query.page;
  const status = req.query.status;
  const search = req.query.search;
  const sort = req.query.sort;
  const category = req.query.category;
  const minPrice = req.query.minValue;
  const maxPrice = req.query.maxValue;
  return await getListAuctionsForBidder(index, status, search, sort, category, minPrice, maxPrice)
    .then((auctions) => {
      res.status(200).json({ auctions });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getListAuctionsBySellerHandler = async (req: Request, res: Response, next: NextFunction) => {
  const index = req.params.index;
  const status = req.params.status;
  const search = req.params.search;
  const id = res.locals.user._id;
  return await getListAuctionsForSeller(id, index, status, search)
    .then((auctions) => {
      res.status(200).json({ auctions });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getAuctionByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auctionId = req.params.auctionId;
  return await getAuction({ _id: auctionId })
    .then((auction) => {
      res.status(200).json({ auction });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createAuctionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const propertyId = req.body.propertyid;
  const property = await getProperty({ _id: propertyId });
  if (!property) {
    return res.status(404).json({ message: "Property isn't found" });
  }
  await updatePropertyStatus({ _id: propertyId }, { status: 'Request' }, { new: true }).catch((error) => {
    res.status(500).json({ error });
  });
  return await createAuction({ property: propertyId, status: 'Request' })
    .then((auction) => {
      res.status(201).json({ auction });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updateAuctionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auctionId = req.params.auctionId;
  const update = req.body;
  const propertyId = req.body.property;

  const auction = await getAuction({ _id: auctionId });
  if (!auction) {
    return res.status(404).json({ message: "Auction isn't found" });
  }

  const property = await getProperty({ _id: propertyId });
  if (!property) {
    return res.status(404).json({ message: "Property isn't found" });
  }
  return await updateAuction({ _id: auctionId }, update, { new: true })
    .then((auction) => {
      res.status(201).json({ auction });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const approveAuctionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auctionId = req.params.auctionId;
  const update = req.body;
  const propertyId = req.body.property;

  const auction = await getAuction({ _id: auctionId });
  if (!auction) {
    return res.status(404).json({ message: "Auction isn't found" });
  }

  const property = await getProperty({ _id: propertyId });
  if (!property) {
    return res.status(404).json({ message: "Property isn't found" });
  }

  const objectAuction = {
    auctionId: auction?._id,
    startRegistrationTime: auction?.startRegistrationTime,
    endRegistrationTime: auction?.endRegistrationTime,
    startAuctionTime: auction?.startAuctionTime,
    endAuctionTime: auction?.endAuctionTime,
    duePaymentTime: auction?.duePaymentTime,
    registrationFee: auction?.registrationFee,
    depositAmount: property?.depositAmount,
    startBid: property?.startBid,
    priceStep: property?.priceStep
  };
  const tx = await createAuctionOnContract(objectAuction);
  if (tx?.error) {
    res.status(401).json({ message: 'Can not create auction' });
  } else {
    return await updateAuction({ _id: auctionId }, update, { new: true })
      .then(async (auction) => {
        await updatePropertyStatus({ _id: propertyId }, { status: 'Approved' }, { new: true })
          .then((property) => {
            res.status(201).json({ auction, property, tx });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};

export const deleteAuctionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auctionId = req.params.auctionId;
  const auction = await getAuction({ _id: auctionId });
  if (!auction) {
    return res.status(404).json({ message: "Auction isn't found" });
  }
  return await deleteAuction({ _id: auctionId })
    .then((auction) => {
      res.status(201).json({ auction, message: 'Deleted auction' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
