const CategoryService = require('../services/CategoryService')


// create category
const createCate = async (req, res, next) => {
    var categoryName  = req.body.name;
    try {
        var category = await CategoryService.createCategory(categoryName);
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};
// get all category
const getAllCate = async (req, res, next) => {
    try {
        var categories = await CategoryService.getAllCategory();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

module.exports ={createCate, getAllCate}