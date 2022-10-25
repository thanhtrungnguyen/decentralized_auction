const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    RoleName:{
        type: String       
    }
})

module.exports = mongoose.model('roles', RoleSchema)