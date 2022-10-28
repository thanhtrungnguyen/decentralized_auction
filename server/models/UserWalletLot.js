import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserWalletLotSchema = new Schema({
    AuctionLotId:{
        type: Schema.Types.ObjectId,
        ref: 'auctionLots'       
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'users'       
    },
    ContractAddress:{
        type: String
    }
})

export default mongoose.model('userWalletLots', UserWalletLotSchema)