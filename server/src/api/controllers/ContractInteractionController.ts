import { NextFunction, Request, Response } from 'express';
import {
  getAll,
  getAuctionPayment,
  getAuctionRegister,
  getByAuctionId,
  getCreatedAuctionById,
  getPlacedBidById
} from '../services/ContractInteractionService';

export const getAllLogsHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAll()
    .then((logs) => {
      res.status(200).json({ logs });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getLogsByAuctionIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getByAuctionId(req.params.auctionId)
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
export const getAuctionRegisterHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAuctionRegister(req.params.auctionId)
    .then((registers) => {
      res.status(200).json({ registers });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getAuctionPaymentHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAuctionPayment(req.params.auctionId)
    .then((payment) => {
      res.status(200).json({ payment });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
