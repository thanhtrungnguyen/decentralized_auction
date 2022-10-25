const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AuctionLotSchema = new Schema({
    LotId:{
        type: Schema.Types.ObjectId,
        ref: 'lots'       
    },
   AuctionId:{
        type: Schema.Types.ObjectId,
        ref: 'auctions'       
    },
    ContractAddress:{
        type: String
    }
})

module.exports = mongoose.model('auctionLots', AuctionLotSchema)