const  UserDAO  = require ("../dal/UserDAO")

const getAllUserService = async(role,index)=>{
    try {
        var list = await UserDAO.getAllUserDAO(role,index);
        return list
    } catch (error) {
        
    }
}

module.exports = {getAllUserService}
