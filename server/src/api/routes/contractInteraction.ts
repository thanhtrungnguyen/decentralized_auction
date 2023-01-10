import express from 'express';

import { getAllLogsHandler, getAuctionCreatedHandler } from '../controllers/ContractInteractionController';
import { getPlacedBidById } from '../services/ContractInteractionService';

const router = express.Router();

router.get('/logs', getAllLogsHandler);
router.get('/createdAuction/:auctionId', getAuctionCreatedHandler);
router.get('/placedBid/:auctionId', getPlacedBidById);

export default router;
