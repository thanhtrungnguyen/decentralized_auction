import mongoose from "mongoose";
const Schema = mongoose.Schema

const AuctionSchema = new Schema({
    

    StartBid:{
        type: Number
    },
    TimeStart:{
        type: Date
    },
    TimeFinish:{
        type: Date
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'users'       
    }
})

export default mongoose.model('auctions', AuctionSchema)