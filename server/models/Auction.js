const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AuctionSchema = new Schema({
    RegistrationStartTime:{
        type: Date       
    },
    RegistrationFinishTime:{
        type: Date       
    },
    RegistrationFee:{
        type: Double       
    },
    MinimumPiceStep:{
        type: Double       
    },
    MaximumStep:{
        type: Double       
    },
    Deposit:{
        type: Double       
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
})

module.exports = mongoose.model('auctions', AuctionSchema)