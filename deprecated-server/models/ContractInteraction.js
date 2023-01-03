const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
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
    registrationFee: { type: String },
    depositAmount: { type: String },
    startBid: { type: String },
    priceStep: { type: String },
    //Bid Information: RegisteredToBid, PlaceBid
    bidder: { type: String },
    bidAmount: { type: String },
    bidderState: { type: String },
    //
});

let ContractInteraction = mongoose.model("ContractInteraction", logsSchema, "AuctionLogs");

module.exports = ContractInteraction;
