const router = require("express").Router();

const { getAuctionInformationById, getRegisteredToBidById, getPlacedBidById } = require("../../controllers/ContractInteractionController");

router.get("/:auctionId", getAuctionInformationById);
router.get("/:auctionId/registered", getRegisteredToBidById);
router.get("/:auctionId/placedBid", getPlacedBidById);

module.exports = router;
