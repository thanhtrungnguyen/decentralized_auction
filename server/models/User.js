const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    UserName:{
        type: String,
        require: true,
        unique: true
    },
    PassWord:{
        type: String,
        require: true,
    },
    CreateAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', UserSchema)