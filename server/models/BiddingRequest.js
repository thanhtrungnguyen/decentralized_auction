import mongoose from "mongoose";
const Schema = mongoose.Schema

const BiddingRequestSchema = new Schema({
    Status:{
        type: String,
    },
    Deposit:{
        type: Double,
    },
    RegistrationFee:{
        type: Double,
    },
    DepositPaid:{
        type: Double,
    },
    RegistrationFeePaid:{
        type: Double,
    },
    CustomerKey:{
        type: String,
    },
    DateCreate:{
        type: Date,
        default: Date.now
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'users'       
    },
    AuctionId:{
        type: Schema.Types.ObjectId,
        ref: 'auctions'       
    },
    PropertyId:{
        type: Schema.Types.ObjectId,
        ref: 'properties'       
    },
    
})

export default mongoose.model('biddingRequests', BiddingRequestSchema)