const express = require("express");
const {
    createAuctionRequest,
    getAllAuction,
    getAuctionDetailByID,
    updateAuction,
    uploadImage,
    approveAuction,
    rejectAuction,
} = require("../controllers/AuctionController.js");
const { verifySeller } = require("../utils/verifyToken.js");

const router = express.Router();

router.post("/request/:id", createAuctionRequest);

router.put("/approve/:id", approveAuction);

router.put("/reject/:id", rejectAuction);

router.put("/:id", verifySeller, updateAuction);

router.get("/", getAllAuction);

router.get("/auctiondetail/:auctionId/:propertyId", getAuctionDetailByID);

// router.get("/auction")

router.get("/images/:key", uploadImage);

module.exports = router;
