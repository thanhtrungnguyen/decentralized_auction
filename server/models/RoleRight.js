const mongoose = require('mongoose');
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

module.exports = mongoose.model('roleRights', RoleRightSchema)