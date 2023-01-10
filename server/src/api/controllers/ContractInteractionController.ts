import { NextFunction, Request, Response } from 'express';
import { getAll, getCreatedAuctionById, getPlacedBidById } from '../services/ContractInteractionService';

export const getAllLogsHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAll()
    .then((logs) => {
      res.status(200).json({ logs });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getAuctionCreatedHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getCreatedAuctionById(req.params.auctionId)
    .then((createdAuction) => {
      res.status(200).json({ createdAuction });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPlacedBidHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getPlacedBidById(req.params.auctionId)
    .then((placedBid) => {
      res.status(200).json({ placedBid });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
