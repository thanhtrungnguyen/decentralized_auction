import mongoose from "mongoose";
const Schema = mongoose.Schema

const LotSchema = new Schema({
    PropertyId:{
        type: Schema.Types.ObjectId,
        ref: 'properties'       
    },
})
export default mongoose.model('lots', LotSchema)