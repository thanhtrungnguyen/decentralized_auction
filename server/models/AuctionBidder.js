import mongoose from "mongoose";
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
export default mongoose.model('auctionBidders', AuctionBidderSchema)