import mongoose from "mongoose";
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

export default mongoose.model('properties', PropertySchema)