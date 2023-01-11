import express from 'express';
import {
  getAllAuctionRegistrationsHandler,
  getAuctionRegistrationByIdHandler,
  createAuctionRegistrationHandler,
  updateAuctionRegistrationHandler,
  deleteAuctionRegistrationHandler
} from '../controllers/AuctionRegistrationController';
import { validateResource } from '../middleware/validateResource';
import { AuctionRegistrationSchema } from '../validations/AuctionRegistrationSchema';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/auctionRegistrations', getAllAuctionRegistrationsHandler);
router.get('/:auctionRegistrationId', getAuctionRegistrationByIdHandler);
router.post('/create', validateResource(AuctionRegistrationSchema.create), createAuctionRegistrationHandler);
// router.patch('/update/:auctionRegistrationId', validateResource(AuctionRegistrationSchema.update), updateAuctionRegistrationHandler);
router.delete('/delete/:auctionRegistrationId', deleteAuctionRegistrationHandler);

export default router;