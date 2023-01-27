import express from 'express';
import { roles } from '../../config/roles';

import { getAllLogsHandler, getAuctionCreatedHandler, getPlacedBidHandler } from '../controllers/ContractInteractionController';
import { requireRole } from '../middleware/requireRole';

const router = express.Router();

router.use(requireRole(roles.ADMIN, roles.MANAGER, roles.SELLER, roles.BIDDER));
router.get('/logs', getAllLogsHandler);
router.get('/createdAuction/:auctionId', getAuctionCreatedHandler);
router.get('/placedBid/:auctionId', getPlacedBidHandler);

export default router;
