const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AuctionBidderSchema = new Schema({
    AuctionLotId:{
        type: Schema.Types.ObjectId,
        ref: 'auctionLots'       
    },
    CustomerKey:{
        type: String        
    }
})

module.exports = mongoose.model('auctionBidders', AuctionBidderSchema)