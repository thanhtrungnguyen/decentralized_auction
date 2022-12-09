const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    //Logs information
    _id: { type: String },
    name: { type: String },
    logIndex: { type: Number },
    transactionHash: { type: String },
    address: { type: String },
    blockHash: { type: String },
    blockTimestamp: { type: Number },
    blockNumber: { type: Number },
    confirmed: { type: Boolean },
    chainId: { type: Number },
    _created_at: { type: Date },
    _updated_at: { type: Date },
    //Auction Information
    auctionId: { type: String },
    startRegistrationTime: { type: String },
    endRegistrationTime: { type: String },
    startAuctionTime: { type: String },
    endAuctionTime: { type: String },
    duePaymentTime: { type: String },
    registrationFee: { type: Number },
    depositAmount: { type: Number },
    startBid: { type: Number },
    priceStep: { type: Number },
    //Bid Information
    bidder: { type: String },
    bidAmount: { type: Number },
    bidderState: { type: String },
    //TestDB
    k: { type: Number },
});

let ContractInteraction = mongoose.model("ContractInteraction", userSchema, "AuctionLogs");

module.exports = ContractInteraction;
