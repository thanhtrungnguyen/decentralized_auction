import express from 'express';
import {
  getAllAuctionsHandler,
  getAuctionByIdHandler,
  createAuctionHandler,
  updateAuctionHandler,
  deleteAuctionHandler
} from '../controllers/AuctionController';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/auctions', getAllAuctionsHandler);
router.get('/:auctionId', getAuctionByIdHandler);
router.post('/create', createAuctionHandler);
router.patch('/update/:auctionId', updateAuctionHandler);
router.delete('/delete/:auctionId', deleteAuctionHandler);

export default router;
