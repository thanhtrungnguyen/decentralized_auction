import mongoose from "mongoose";
const Schema = mongoose.Schema

const RoleRightSchema = new Schema({
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'users'       
    },
    RoleId:{
        type: Schema.Types.ObjectId,
        ref: 'roles'  
    }
})

export default mongoose.model('roleRights', RoleRightSchema)