import express from 'express';

import { getAllLogsHandler, getAuctionCreatedHandler, getPlacedBidHandler } from '../controllers/ContractInteractionController';

const router = express.Router();

router.get('/logs', getAllLogsHandler);
router.get('/createdAuction/:auctionId', getAuctionCreatedHandler);
router.get('/placedBid/:auctionId', getPlacedBidHandler);

export default router;
