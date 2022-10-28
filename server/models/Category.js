import mongoose from "mongoose";
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    CategoryName:{
        type: String       
    }
})

export default mongoose.model('categories', CategorySchema)