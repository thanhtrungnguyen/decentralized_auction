const NewsDAO = require('../dal/NewsDAO');

const getAllService = async(index)=>{
    try {
       var list =  await NewsDAO.getAllDAO(index);
       return list;
    } catch (error) {
        console.error(error);
    }
}
const getByStatusService = async(index,status)=>{
    try {
        var list = await NewsDAO.getByStatusDAO(index,status);
        return list;
    } catch (error) {
        console.error(error)
    }
}
const filterService = async(title,index,status)=>{
    try {
        var list = await NewsDAO.filterDAO(title,index,status);
        return list;
    } catch (error) {
        console.error(error)
    }
}
const changeStatusService = async(id,status)=>{
    try {
        var changedStatus = await NewsDAO.changeStatusDAO(id,status);
        return changedStatus;
    } catch (error) {
        console.error(error)
    }
}
const updateService = async(id,title,description,status)=>{
    try {
        var updated = await NewsDAO.updateDAO(id,title,description,status);
        return updated;
    } catch (error) {
        console.error(error)
    }
}
const createService = async(title,description)=>{
    try {
        var created = await NewsDAO.createDAO(title,description);
        return created;
    } catch (error) {
        console.error(error)
    }
}

module.exports = {getAllService,getByStatusService,filterService,changeStatusService,updateService,createService}