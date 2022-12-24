const CategoryService = require('../services/CategoryService')


// create category
const createCate = async (req, res, next) => {
    var categoryName = req.body.name;
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
        var index = req.params.index;
        var status = req.params.status;
        var name = req.params.name;
        var data = await CategoryService.getAllCate(index, status, name);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};
const getAllCategory = async (req, res, next) => {
    try {
        var data = await CategoryService.getAllCategory();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};
//get category by Id
const getCategoryById = async (req, res, next) => {
    try {
        var id = req.params.id;
        var data = await CategoryService.getCategoryById(id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};
//update Category
const updateCategory = async (req, res, next) => {
    try {
        var id = req.params.id;
        var name = req.body.name;
        var status = req.body.status;
        var data = await CategoryService.updateCategory(id, name, status);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};
const changedStatus = async (req, res, next) => {
    try {
        var id = req.params.id;
        var status = req.body.status;
        var data = await CategoryService.changedStatus(id, status);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};
module.exports = { createCate, getAllCate,updateCategory,changedStatus,getCategoryById,getAllCategory }