const express = require("express");
const {
    createAuctionRequest,
    getAllAuction,
    getAuctionDetailByID,
    updateAuction,
    uploadImage,
    approveAuction,
    rejectAuction,
    filterAuction,
    getAllAuctionBidder,
    getAuctionForSeller,
} = require("../controllers/AuctionController.js");
const { verifySeller } = require("../utils/verifyToken.js");

const router = express.Router();

router.post("/request/:id", createAuctionRequest);

router.put("/approve/:id", approveAuction);

router.put("/reject/:id", rejectAuction);

router.put("/:id", verifySeller, updateAuction);

router.get("/getAll/:index/:name/:category/:status", getAllAuction);

router.get("/getAuctionForSeller/:index/:name/:category/:status", getAuctionForSeller);

router.get("/", getAllAuctionBidder);

router.get("/auctiondetail/:auctionId/:propertyId", getAuctionDetailByID);

//router.get("/auction")

router.get("/images/:key", uploadImage);

router.get("/filter/:index/:status/:price/:sort/:name",filterAuction);

module.exports = router;
