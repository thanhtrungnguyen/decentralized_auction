const UserService = require('../services/UserService')

// get All 
const getAllUser = async (req, res, next) => {
    try {
        var role = req.params.role;
        var index = (req.params.index)
        var list =  await UserService.getAllUser(role,index)
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
}
// 
const getUserById = async(req,res,next) =>{
    try {
        var userId = req.params.userId;
        var user = await UserService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
} 
const updateUser = async(req,res,next) =>{
    try {
        var userId = req.params.userId;
        var user = await UserService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
} 
module.exports = {getAllUser,getUserById,updateUser}