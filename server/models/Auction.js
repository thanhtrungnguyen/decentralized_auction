import mongoose from "mongoose";
const Schema = mongoose.Schema

const AuctionSchema = new Schema({
    RegistrationStartTime:{
        type: Date       
    },
    RegistrationFinishTime:{
        type: Date       
    },
    RegistrationFee:{
        type: Number       
    },
    MinimumPiceStep:{
        type: Number       
    },
    MaximumStep:{
        type: Number       
    },
    Deposit:{
        type: Number       
    },
    AuctionType:{
        type: String
    },
    PropertyPlace:{
        type: String
    },
    TimeView:{
        type: Date
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