const NewsDAO = require("../dal/NewsDAO");
const { uploadFile } = require("../s3");

const getAll = async (index, status, title) => {
    try {
        status == "null" ? (status = "") : status;
        title == "null" ? (title = "") : title;
        var list = await NewsDAO.getAll(index, status, title);
        return list;
    } catch (error) {
        console.error(error);
    }
};
const getByStatus = async (index, status) => {
    try {
        var list = await NewsDAO.getByStatus(index, status);
        return list;
    } catch (error) {
        console.error(error);
    }
};
const getById = async (newsId) => {
    var news = await NewsDAO.getById(newsId);
    return news;
};
const sortNews = async (index, type) => {
    var news = await NewsDAO.sort(index, type);
    return news;
};
const filter = async (title, index, status) => {
    try {
        var list = await NewsDAO.filter(title, index, status);
        return list;
    } catch (error) {
        console.error(error);
    }
};
const changeStatus = async (id, status) => {
    try {
        var changedStatus = await NewsDAO.changeStatus(id, status);
        return changedStatus;
    } catch (error) {
        console.error(error);
    }
};
const update = async (id, title, content,files) => {
    try {
        var result = null;
        if (files != null) {
            if (files.avatar !== undefined) { result = await uploadFile(files.avatar[0]); }    
        }
        const filesImg = { result: result };
        var updated = await NewsDAO.update(id, title, content, filesImg);
        return updated;
    } catch (error) {
        console.error(error);
    }
};
const create = async (title, content, files) => {
    try {
        var result = await uploadFile(files.avatar[0])
        const filesImg = { result: result };
        var created = await NewsDAO.create(title, content, filesImg);
        return created;
    } catch (error) {
        console.error(error);
    }
};

module.exports = { getAll, getByStatus, filter, changeStatus, update, create, getById, sortNews };
