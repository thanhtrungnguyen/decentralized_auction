const UserService = require("../services/UserService.js")

// get All 
const getAllUserController = async (req, res, next) => {
    try {
        var role = req.params.role;
        var index = (req.params.index)
        var list =  await UserService.getAllUserService(role,index)
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
}
module.exports = {getAllUserController}