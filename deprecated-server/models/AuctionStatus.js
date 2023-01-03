const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
    //Logs information
   
 
    auctionId: { type: String },
    status:{type: String},
    //
});

let AuctionStatus = mongoose.model("AuctionStatus", auctionSchema);

module.exports = AuctionStatus;
