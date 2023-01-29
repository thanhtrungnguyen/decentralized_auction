import { Request, Response, NextFunction } from 'express';
import {
  getAllAuctionRegistrations,
  getAuctionRegistration,
  createAuctionRegistration,
  updateAuctionRegistration
} from '../services/AuctionRegistrationService';
import { getAuction } from '../services/AuctionService';

export const getAllAuctionRegistrationsHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllAuctionRegistrations()
    .then((auctionRegistrations) => {
      res.status(200).json({ auctionRegistrations });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getAuctionRegistrationByAuctionIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auctionId = req.params.auctionId;
  return await getAuctionRegistration({ auction: auctionId })
    .then((auctionRegistration) => {
      res.status(200).json({ auctionRegistration });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createAuctionRegistrationHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { walletAddress } = req.body;
  const auctionId = req.params.auctionId;
  const userId = res.locals.user._id;
  const auction = await getAuction({ _id: auctionId });
  if (!auction) {
    return res.status(404).json({ message: 'Auction is not found' });
  }
  return await createAuctionRegistration({ walletAddress: walletAddress, auction: auctionId, user: userId })
    .then((auctionRegistration) => {
      res.status(201).json({ auctionRegistration });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updateAuctionRegistrationHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auctionRegistrationId = req.params.auctionRegistrationId;
  const update = req.body;
  const auctionRegistration = await getAuctionRegistration({ _id: auctionRegistrationId });
  if (!auctionRegistration) {
    return res.status(404).json({ message: "AuctionRegistration isn't found" });
  }
  return await updateAuctionRegistration({ _id: auctionRegistrationId }, update, { new: true })
    .then((auctionRegistration) => {
      res.status(201).json({ auctionRegistration });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
