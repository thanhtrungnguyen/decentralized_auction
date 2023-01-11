import { Request, Response, NextFunction } from 'express';
import {
  getAllAuctionRegistrations,
  getAuctionRegistration,
  createAuctionRegistration,
  updateAuctionRegistration,
  deleteAuctionRegistration
} from '../services/AuctionRegistrationService';

export const getAllAuctionRegistrationsHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllAuctionRegistrations()
    .then((auctionRegistrations) => {
      res.status(200).json({ auctionRegistrations });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getAuctionRegistrationByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auctionRegistrationId = req.params.auctionRegistrationId;
  return await getAuctionRegistration({ _id: auctionRegistrationId })
    .then((auctionRegistration) => {
      res.status(200).json({ auctionRegistration });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createAuctionRegistrationHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auctionRegistration = req.body;
  return await createAuctionRegistration(auctionRegistration)
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

export const deleteAuctionRegistrationHandler = async (req: Request, res: Response, next: NextFunction) => {
  const auctionRegistrationId = req.params.auctionRegistrationId;
  const auctionRegistration = await getAuctionRegistration({ _id: auctionRegistrationId });
  if (!auctionRegistration) {
    return res.status(404).json({ message: "AuctionRegistration isn't found" });
  }
  return await deleteAuctionRegistration({ _id: auctionRegistrationId })
    .then((auctionRegistration) => {
      res.status(201).json({ auctionRegistration, message: 'Deleted auctionRegistration' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
