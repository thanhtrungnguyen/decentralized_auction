import mongoose from "mongoose";
const Schema = mongoose.Schema

const AuctionHistorySchema = new Schema({
    CustomerKey:{
        type: String           
    },
   AuctionLotId:{
        type: Schema.Types.ObjectId,
        ref: 'auctionLots'       
    },
    Paid:{
        type: Double
    },
    TimePaid:{
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('auctionHistory', AuctionHistorySchema)