const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    AccountName:{
        type: String
    },
    Tax:{
        type: String
    },
    Phone:{
        type: String
    },
    Website:{
        type: String
    },
    Employees:{
        type: Number
    },
    Tax:{
        type: String
    },
    TaxCodeGrantedDate:{
        type: Date
    },
    TaxCodeGrantedPlace:{
        type: String
    },
    SpecificAddress:{
        type: String
    },
    CompanyCertificate:{
        type: String
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'users'  
    }
})

module.exports = mongoose.model('accounts', AccountSchema)