const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RepresentativeAccountSchema = new Schema({
    AccountId:{
        type: Schema.Types.ObjectId,
        ref: 'accounts'  
    },
    ContactId:{
        type: Schema.Types.ObjectId,
        ref: 'contacts'  
    }
})

module.exports = mongoose.model('representativeAccounts', RepresentativeAccountSchema)