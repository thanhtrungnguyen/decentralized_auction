const NewsDAO = require('../dal/NewsDAO');

const getAll = async(index,status,title)=>{
    try {
       var list =  await NewsDAO.getAll(index,status,title);
       return list;
    } catch (error) {
        console.error(error);
    }
}
const getByStatus = async(index,status)=>{
    try {
        var list = await NewsDAO.getByStatus(index,status);
        return list;
    } catch (error) {
        console.error(error)
    }
}
const getById = async(newsId)=>{

}
const filter = async(title,index,status)=>{
    try {
        var list = await NewsDAO.filter(title,index,status);
        return list;
    } catch (error) {
        console.error(error)
    }
}
const changeStatus = async(id,status)=>{
    try {
        var changedStatus = await NewsDAO.changeStatus(id,status);
        return changedStatus;
    } catch (error) {
        console.error(error)
    }
}
const update = async(id,title,description,status)=>{
    try {
        var updated = await NewsDAO.update(id,title,description,status);
        return updated;
    } catch (error) {
        console.error(error)
    }
}
const create = async(title,description)=>{
    try {
        var created = await NewsDAO.create(title,description);
        return created;
    } catch (error) {
        console.error(error)
    }
}

module.exports = {getAll,getByStatus,filter,changeStatus,update,create,getById}