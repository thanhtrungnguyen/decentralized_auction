const router = require("express").Router();

const {
    getAuctionInformationById,
    getRegisteredToBidById,
    getPlacedBidById,
    findByAuctionId,
    createAuctionRegistration,
    getLogsByAuctionId,
} = require("../../controllers/ContractInteractionController");

router.get("/:auctionId", getAuctionInformationById);
router.get("/:auctionId/registered", getRegisteredToBidById);
router.get("/:auctionId/placedBid", getPlacedBidById);
router.get("/:auctionId/auctionRegistration", findByAuctionId);
router.post("/auctionRegistration", createAuctionRegistration);
router.get("/:auctionId/logs", getLogsByAuctionId);

module.exports = router;
