const NewsService = require("../services/NewsService");
// Create News
const createNews = async (req, res, next) => {
    try {
        var title = req.body.title;
        var files = req.files; 
        var content = req.body.content;
        var created = await NewsService.create(title, content,files);
        if (created) res.status(200).send("News has been created.");
    } catch (error) {
        next(error);
    }
};
// Update News
function isEmptyObject(obj){
    return JSON.stringify(obj) === '{}';
}
const updateNews = async (req, res, next) => {
    try {
        var id = req.params.id;
        var title = req.body.title;
        var content = req.body.content;
        var files = req.files;
        isEmptyObject(files)?files = null : files =  req.files;
        var updated = await NewsService.update(id, title, content,files);
        if (updated) res.status(200).send("News has been updated.");
    } catch (error) {
        next(error);
    }
};
// Change Status News
const changeStatusNews = async (req, res, next) => {
    try {
        await NewsService.changeStatus(req.params.id, req.body.status);
        res.status(200).send("News has been changed status.");
    } catch (error) {
        next(error);
    }
};
// Get All News
const getAllNews = async (req, res, next) => {
    try {
        var index = req.params.index;
        var status = req.params.status;
        var title = req.params.title;
        var list = await NewsService.getAll(index, status, title);
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};
// Filter News
const filterNews = async (req, res, next) => {
    try {
        var title = req.body.title;
        var index = req.params.index;
        var status = req.params.status;
        var listNews = await NewsService.filter(title, index, status);
        res.status(200).json(listNews);
    } catch (error) {
        next(error);
    }
};
// Get News By Status
const getByStatus = async (req, res, next) => {
    try {
        var index = req.params.index;
        var status = req.params.status;
        var listNews = await NewsService.getByStatus(index, status);
        res.status(200).json(listNews);
    } catch (error) {
        next(error);
    }
};

const getNewsById = async (req, res, next) => {
    var newsId = req.params.id;
    var news = await NewsService.getById(newsId);
    res.status(200).json(news);
};
const sortNews = async (req, res, next) => {
    var type = req.params.type;
    var index = req.params.index;
    var listNews = await NewsService.sortNews(index, type);
    res.status(200).json(listNews);
};

module.exports = { changeStatusNews, createNews, updateNews, getAllNews, filterNews, getByStatus, getNewsById, sortNews };
