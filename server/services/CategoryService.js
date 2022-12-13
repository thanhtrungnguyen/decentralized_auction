const CategoryDAO = require('../dal/CategoryDAO')

const createCategory = async(categoryName)=>{
    var category = await CategoryDAO.createCategory(categoryName);
    return category
}
const getAllCategory = async()=>{
    var category = CategoryDAO.getAllCategory();
    return category
}

module.exports = {getAllCategory,createCategory}