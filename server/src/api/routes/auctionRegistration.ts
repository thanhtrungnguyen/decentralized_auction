import express from 'express';
import { roles } from '../../config/roles';
import {
  getAllAuctionRegistrationsHandler,
  getAuctionRegistrationByAuctionIdHandler,
  createAuctionRegistrationHandler
} from '../controllers/AuctionRegistrationController';
import { requireRole } from '../middleware/requireRole';
import { validateResource } from '../middleware/validateResource';
import { AuctionRegistrationSchema } from '../validations/AuctionRegistrationSchema';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/auctionRegistrations', getAllAuctionRegistrationsHandler);
router.get('/:auctionId', getAuctionRegistrationByAuctionIdHandler);
router.post('/:auctionId/registration', requireRole(roles.BIDDER), validateResource(AuctionRegistrationSchema.create), createAuctionRegistrationHandler);

export default router;
