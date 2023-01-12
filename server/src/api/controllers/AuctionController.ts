import { Request, Response, NextFunction } from 'express';
import { getAllAuctions, getAuction, createAuction, updateAuction, deleteAuction } from '../services/AuctionService';
import { getProperty, updateProperty } from '../services/PropertyService';

export const getAllAuctionsHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllAuctions()
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
  await updateProperty({ _id: propertyId }, { status: 'Request' }, { new: true }).catch((error) => {
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
  await updateProperty({ _id: propertyId }, { status: 'Approved' }, { new: true }).catch((error) => {
    res.status(500).json({ error });
  });

  return await updateAuction({ _id: auctionId }, update, { new: true })
    .then((auction) => {
      res.status(201).json({ auction });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
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
