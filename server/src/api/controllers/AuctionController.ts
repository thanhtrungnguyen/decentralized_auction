import { Request, Response, NextFunction } from 'express';
import { getAllAuctions, getAuctionById, createAuction, updateAuction, deleteAuction } from '../services/AuctionService';

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
  return await getAuctionById({ auctionId })
    .then((auction) => {
      res.status(200).json({ auction });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createAuctionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auction = req.body;
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
  const auction = await getAuctionById({ auctionId });
  if (!auction) {
    return res.status(404).json({ message: "Auction isn't found" });
  }
  return await updateAuction({ auctionId }, update, { new: true })
    .then((auction) => {
      res.status(201).json({ auction });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deleteAuctionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auctionId = req.params.auctionId;
  const auction = await getAuctionById({ auctionId });
  if (!auction) {
    return res.status(404).json({ message: "Auction isn't found" });
  }
  return await deleteAuction({ auctionId })
    .then((auction) => {
      res.status(201).json({ auction, message: 'Deleted auction' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
