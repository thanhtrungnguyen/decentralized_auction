const router = require("express").Router();

router.use("/auctionInformation", require("./contractInteraction"));

module.exports = router;
