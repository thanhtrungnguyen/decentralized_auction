import express from 'express';
import {
  getAllAuctionsHandler,
  getAuctionByIdHandler,
  createAuctionHandler,
  updateAuctionHandler,
  deleteAuctionHandler,
  approveAuctionHandler
} from '../controllers/AuctionController';
import { validateResource } from '../middleware/validateResource';
import { AuctionSchema } from '../validations/AuctionSchema';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/auctions', getAllAuctionsHandler);
router.get('/:auctionId', getAuctionByIdHandler);
router.post('/create', createAuctionHandler);
router.patch('/update/:auctionId', validateResource(AuctionSchema.update), updateAuctionHandler);
router.patch('/approve/:auctionId', validateResource(AuctionSchema.update), approveAuctionHandler);
router.delete('/delete/:auctionId', deleteAuctionHandler);
//validateResource(AuctionSchema.create),
export default router;
