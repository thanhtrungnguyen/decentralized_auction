const router = require("express").Router();

const { getAuctionInformationById } = require("../../controllers/ContractInteractionController");

router.get("/:auctionId", getAuctionInformationById);

module.exports = router;
