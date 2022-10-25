const mongoose = require('mongoose');
const Schema = mongoose.Schema

const LotSchema = new Schema({
    PropertyId:{
        type: Schema.Types.ObjectId,
        ref: 'properties'       
    },
})

module.exports = mongoose.model('lots', LotSchema)