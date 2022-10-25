const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    CategoryName:{
        type: String       
    }
})

module.exports = mongoose.model('categories', CategorySchema)