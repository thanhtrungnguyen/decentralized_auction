const UserDAO = require("../dal/UserDAO");
const { uploadFile } = require("../s3");

const getAllUser = async (role, index, status, name) => {
    try {
        status == "null" ? (status = "") : status;
        name == "null" ? (name = "") : name;
        var data = await UserDAO.getAllUser(role, index, status, name);
        return data;
    } catch (error) {}
};

const getUserById = async (userId) => {
    var user = await UserDAO.getUserById(userId);
    return user;
};
const updateProfileBidder = async (userId, contact, account, files) => {
    const result = await uploadFile(files.cardFront[0]);
    const result1 = await uploadFile(files.cardBack[0]);
    const filesImg = { result: result, result1: result1 };
};
const changedStatus = async(userId)=>{
    const isChange = await UserDAO.changeStatus(userId);
    return isChange;
}
module.exports = { getAllUser, getUserById, updateProfileBidder,changedStatus };
