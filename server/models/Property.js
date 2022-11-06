import mongoose from "mongoose";
const Schema = mongoose.Schema

const PropertySchema = new Schema({
    PropertyName:{
        type: String
    },
    PropertyInformation:{
        type: String       
    },
    MediaURL:{
        type: Array(String)       
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

export default mongoose.model('properties', PropertySchema)