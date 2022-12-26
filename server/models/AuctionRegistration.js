const mongoose = require("mongoose");

const auctionRegistrationSchema = new mongoose.Schema({
    auctionId: { type: String },
    bidderId: { type: String },
    wallet: { type: String },
});

let AuctionStatus = mongoose.model("AuctionRegistration", auctionRegistrationSchema, "AuctionRegistration");

module.exports = AuctionStatus;
