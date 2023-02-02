import express from 'express';
import { defaultConfig } from '../../config/constant-variables';
import { roles } from '../../config/roles';
import {
  getAllAuctionsHandler,
  getAuctionByIdHandler,
  createAuctionHandler,
  updateAuctionHandler,
  deleteAuctionHandler,
  approveAuctionHandler,
  getListAuctionsHandler,
  getListAuctionsByBidderHandler,
  getListAuctionsBySellerHandler,
  rejectAuctionHandler,
  getListMessageRejectedHandler
} from '../controllers/AuctionController';
import { requireRole } from '../middleware/requireRole';
import { validateResource } from '../middleware/validateResource';
import { AuctionSchema } from '../validations/AuctionSchema';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/auctions', getAllAuctionsHandler);
router.get('/auctions/manager/:index/:status/:search/:sellerName', requireRole(roles.MANAGER), getListAuctionsHandler);
router.get('/auctions/bidder', getListAuctionsByBidderHandler);
router.get('/auctions/seller/:index/:status/:search', requireRole(roles.SELLER), getListAuctionsBySellerHandler);
router.get('/:auctionId', requireRole(roles.MANAGER, roles.SELLER), getAuctionByIdHandler);

router.post('/create', requireRole(roles.SELLER), createAuctionHandler);
router.patch('/update/:auctionId', requireRole(roles.MANAGER), validateResource(AuctionSchema.update), updateAuctionHandler);
router.patch('/approve/:auctionId', requireRole(roles.MANAGER), validateResource(AuctionSchema.approve), approveAuctionHandler);
router.patch('/reject/:auctionId', requireRole(roles.MANAGER), validateResource(AuctionSchema.reject), rejectAuctionHandler);
router.delete('/delete/:auctionId', deleteAuctionHandler);
router.get('/rejectmessage/:propertyId', getListMessageRejectedHandler);
//validateResource(AuctionSchema.create),
export default router;
