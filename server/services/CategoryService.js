const CategoryDAO = require('../dal/CategoryDAO')

const createCategory = async(categoryName)=>{
    var category = await CategoryDAO.createCategory(categoryName);
    return category
}
const getAllCategory = async(index,status,name)=>{
    var data = CategoryDAO.getAllCategory(index,status,name);
    return data
}
const getCategoryById = async(id)=>{
    var category = await CategoryDAO.getCategoryById(id);
    return category;
}
const updateCategory = async(id,name,status)=>{
    var rs = await CategoryDAO.updateCategory(id,name,status);
    return rs;
}
const changedStatus = async(id,status)=>{
    var rs = await CategoryDAO.changedStatus(id,status);
    return rs;
}

module.exports = {getAllCategory,createCategory,getCategoryById,updateCategory,changedStatus}