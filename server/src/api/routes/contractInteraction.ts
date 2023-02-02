import express from 'express';
import { roles } from '../../config/roles';

import {
  getAllLogsHandler,
  getAuctionCreatedHandler,
  getAuctionPaymentHandler,
  getAuctionRegisterHandler,
  getAuctionWithDrawHandler,
  getLogsByAuctionIdHandler,
  getPlacedBidHandler
} from '../controllers/ContractInteractionController';
import { requireRole } from '../middleware/requireRole';

const router = express.Router();

router.use(requireRole(roles.ADMIN, roles.MANAGER, roles.SELLER, roles.BIDDER));
router.get('/logs', getAllLogsHandler);
router.get('/:auctionId', getLogsByAuctionIdHandler);
router.get('/createdAuction/:auctionId', getAuctionCreatedHandler);
router.get('/placedBid/:auctionId', getPlacedBidHandler);
router.get('/register/:auctionId', getAuctionRegisterHandler);
router.get('/payment/:auctionId', getAuctionPaymentHandler);
router.get('/withdraw/:auctionId', getAuctionWithDrawHandler);
export default router;
