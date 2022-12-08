const jsforce = require("jsforce");
const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL
})

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
    if (err) {
        console.error(err)
    } else {
       // console.log(res.id)
    }
})
const perPage = 10;
const NewsService = require('../services/NewsService');
// Create News
const createNews = async (req, res, next) => {
    try {
        var title = req.body.title;
        var description = req.body.description;
        var created = await NewsService.createService(title,description);
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
        var updated = await NewsService.updateService(id,title,description,status)
        if(updated) 
        res.status(200).send("News has been updated.");
    } catch (error) {
        next(error)
    }
}
// Change Status News
const changeStatusNews = async (req, res, next) => {
    try {         
        await NewsService.changeStatusService(req.params.id, req.body.status)
        res.status(200).send("News has been changed status.");
    } catch (error) {
        next(error)
    }
}
// Get All News
const getAllNews = async (req, res, next) => {
    try {
        var index = req.params.index;
        var list = await NewsService.getAllService(index);
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
        var listNews = await NewsService.filterService(title,index,status)
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
        var listNews = await NewsService.getAllService(index,status)
        res.status(200).json(listNews);
    } catch (error) {
        next(error)
    }
}


module.exports = {changeStatusNews,createNews,updateNews,getAllNews,filterNews,getByStatus}