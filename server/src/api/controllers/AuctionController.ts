import { Request, Response, NextFunction } from 'express';
import { getAllAuctions, getAuctionById, createAuction, updateAuction, deleteAuction } from '../services/AuctionService';
import { getPropertyById } from '../services/PropertyService';

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
  return await getAuctionById({ _id: auctionId })
    .then((auction) => {
      res.status(200).json({ auction });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createAuctionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auction = req.body;
  const propertyId = req.body.property;
  const property = await getPropertyById({ _id: propertyId });
  if (!property) {
    return res.status(404).json({ message: "Property isn't found" });
  }
  return await createAuction(auction)
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

  const auction = await getAuctionById({ _id: auctionId });
  if (!auction) {
    return res.status(404).json({ message: "Auction isn't found" });
  }

  const property = await getPropertyById({ _id: propertyId });
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

export const deleteAuctionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auctionId = req.params.auctionId;
  const auction = await getAuctionById({ _id: auctionId });
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
