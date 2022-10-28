import mongoose from "mongoose";
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
export default mongoose.model('auctionLots', AuctionLotSchema)