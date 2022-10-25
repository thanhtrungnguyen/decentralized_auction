const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PropertySchema = new Schema({
    PropertyInformation:{
        type: String       
    },
    RelatedDocument:{
        type: String       
    },
    ImgURL:{
        type: Array(String)       
    },
    VideoURL:{
        type: String       
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'users'       
    },
    CategoryId:{
        type: Schema.Types.ObjectId,
        ref: 'categories'       
    },
})

module.exports = mongoose.model('properties', PropertySchema)