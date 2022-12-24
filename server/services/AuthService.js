const AuthDAO = require('../dal/AuthDAO');
const { uploadFile } = require('../s3');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utils/mailer.js");


const createContact = async (user, contact, role, files) => {
    try {
        const result = await uploadFile(files.cardFront[0]);
        const result1 = await uploadFile(files.cardBack[0]);
        const filesImg = { result: result, result1: result1 }
        var userHashPassword = await hashPassword(user)
        var contactId = await AuthDAO.createContact(userHashPassword, contact, role, filesImg)
        return contactId;
    } catch (error) {
        console.error(error)
    }
}
const createAccount = async (user, contact, role, files, account) => {
    try {
        const result = await uploadFile(files.cardFront[0]);
        const result1 = await uploadFile(files.cardBack[0]);
        const filesImg = { result: result, result1: result1 }
        var userHashPassword = await hashPassword(user)
        var accountId = await AuthDAO.createAccount(userHashPassword, contact, role, filesImg, account)
        return accountId;
    } catch (error) {
        console.error(error)
    }
}
const createManager = async (user, role) => {
    try {
        var userHashPassword = await hashPassword(user)

        var userId = await AuthDAO.createManager(userHashPassword, role)
        return userId;
    } catch (error) {
        console.error(error)
    }
}
const hashPassword = async (user) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    return { userName: user.userName, password: hash, type: user.type }
}
const login = async (user) => {

    //Status__c: "Activate"
    var findUser = await AuthDAO.getUserByName(user)

    if (!findUser) return { user: null, error: '404', success: 'Failed', message: "User Not Found !!!" }


    const isPasswordCorrect = await bcrypt.compare(user.password, findUser.password);

    if (!isPasswordCorrect) return { user: null, error: '400', success: 'Failed', message: "Password incorrect !!!" }

    const token = jwt.sign({ id: findUser.Id, role: findUser.role, userName: findUser.userName, type: findUser.type }, process.env.JWT);

    return { user: findUser, token: token };


}
const changePassword = async (user, oldPassword, newPassword) => {
    try {
        var findUser = await AuthDAO.getUserByName(user);

        if (!findUser) return false;
        //next(createError(404, "User not found!"));

        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, findUser.password);

        if (!isOldPasswordCorrect) return false;
        //next(createError(400, "Wrong password or username!!"));

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(newPassword, salt);
        var isChange = await AuthDAO.changePassword(findUser, hash);
        if (isChange) return true;
    } catch (error) {
        console.error(error)
    }
}
const forgotPassword = async (user) => {
    try {
        var findUser = await AuthDAO.getUserByName(user);
        if (!findUser) return false;
        //next(createError(404, "Email not found!"));

        const secret = process.env.JWT + findUser.password;
        const payload = {
            email: findUser.userName,
            id: findUser.Id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "15m" });
        const link = `http://localhost:3000/newPassword/${findUser.Id}/${token}`;
        console.log(link);
        sendMail(findUser.userName, "Reset Password", `<a href="${link}"> Reset Password </a>`);
        return { link: link }
    } catch (error) {
        console.error(error)
    }
}
const resetPassword = async (user, password1, password2, token) => {
    try {
        var findUser = await AuthDAO.getUserByName(user);
        const secret = process.env.JWT + findUser.password;

        const payload = jwt.verify(token, secret);

        if (findUser.Id !== payload.id && findUser.userName !== payload.email) {
            console.log("Invalid user");
            return;
        }

        if (password1 !== password2) return false;

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password1, salt);
        var isChange = await AuthDAO.changePassword(findUser, hash);
        if (isChange) return true;

    } catch (error) {
        console.error(error)
    }
}

module.exports = { createContact, createAccount, createManager, login, changePassword, forgotPassword, resetPassword }