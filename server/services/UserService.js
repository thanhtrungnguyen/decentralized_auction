const  UserDAO  = require ("../dal/UserDAO")

const getAllUser= async(role,index)=>{
    try {
        var list = await UserDAO.getAllUser(role,index);
        return list
    } catch (error) {
        
    }
}

const getUserById = async (userId) =>{
    var user = await UserDAO.getUserById(userId);
    return user
} 
const updateUser = async(userId)=>{
    
}
module.exports = {getAllUser,getUserById}
