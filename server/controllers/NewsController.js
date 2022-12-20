const NewsService = require('../services/NewsService');
// Create News
const createNews = async (req, res, next) => {
    try {
        var title = req.body.title;
        var description = req.body.description;
        var created = await NewsService.create(title,description);
        if(created) res.status(200).send("News has been created.");
    } catch (error) {
        next(error)
    }
}
// Update News
const updateNews = async (req, res, next) => {
    try {
        var id =  req.params.id;
        var title = req.body.title;
        var description = req.body.description;
        var status = req.body.status;
        var updated = await NewsService.update(id,title,description,status)
        if(updated) 
        res.status(200).send("News has been updated.");
    } catch (error) {
        next(error)
    }
}
// Change Status News
const changeStatusNews = async (req, res, next) => {
    try {         
        await NewsService.changeStatus(req.params.id, req.body.status)
        res.status(200).send("News has been changed status.");
    } catch (error) {
        next(error)
    }
}
// Get All News
const getAllNews = async (req, res, next) => {
    try {
        var index = req.params.index;
        var status = req.params.status;
        var title = req.params.title;
        var list = await NewsService.getAll(index,status,title);
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
}
// Filter News
const filterNews = async (req, res, next) => {
    try {
        var title = req.body.title;
        var index = req.params.index;
        var status = req.params.status;
        var listNews = await NewsService.filter(title,index,status)
        res.status(200).json(listNews);
    } catch (error) {
        next(error)
    }
}
// Get News By Status
const getByStatus = async (req, res, next) => {
    try {
        var index = req.params.index;
        var status = req.params.status;
        var listNews = await NewsService.getByStatus(index,status)
        res.status(200).json(listNews);
    } catch (error) {
        next(error)
    }
}

const getNewsById = async(req,res,next)=>{
    res.status(200).json(listNews);
}

module.exports = {changeStatusNews,createNews,updateNews,getAllNews,filterNews,getByStatus}