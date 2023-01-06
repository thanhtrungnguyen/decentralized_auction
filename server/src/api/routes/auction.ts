import express from 'express';
import {
  getAllAuctionsHandler,
  getAuctionByIdHandler,
  createAuctionHandler,
  updateAuctionHandler,
  deleteAuctionHandler
} from '../controllers/AuctionController';
import { validateResource } from '../middleware/validateResource';
import { AuctionSchema } from '../validations/AuctionSchema';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/auctions', getAllAuctionsHandler);
router.get('/:auctionId', getAuctionByIdHandler);
router.post('/create', validateResource(AuctionSchema.create), createAuctionHandler);
router.patch('/update/:auctionId', validateResource(AuctionSchema.update), updateAuctionHandler);
router.delete('/delete/:auctionId', deleteAuctionHandler);

export default router;
