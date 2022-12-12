const AuthDAO = require('../dal/AuthDAO');
const { uploadFile } = require('../s3');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utils/mailer.js");
const createContactService = async (user, contact, role, files) => {
    try {
        const result = await uploadFile(files.cardFront[0]);
        const result1 = await uploadFile(files.cardBack[0]);
        const filesImg = { result: result, result1: result1 }
        var contactId = await AuthDAO.createContactDAO(user, contact, role, filesImg)
        return contactId;
    } catch (error) {
        console.error(error)
    }
}
const createAccountService = async (user, contact, role, files, account) => {
    try {
        const result = await uploadFile(files.cardFront[0]);
        const result1 = await uploadFile(files.cardBack[0]);
        const filesImg = { result: result, result1: result1 }
        var accountId = await AuthDAO.createAccountDAO(user, contact, role, filesImg, account)
        return accountId;
    } catch (error) {
        console.error(error)
    }
}
const createManagerService = async (user, role) => {
    try {
        var userId = await AuthDAO.createManagerDAO(user, role)
        return userId;
    } catch (error) {
        console.error(error)
    }
}
const loginService = async (user) => {
    
        //Status__c: "Activate"
        var findUser = await AuthDAO.getUserByNameDAO(user)

        if (!findUser)  return { user:null, error: '404', success: 'Failed', message: "User Not Found !!!" }
           

        const isPasswordCorrect = await bcrypt.compare(user.password, findUser.password);

        if (!isPasswordCorrect) return { user:null, error: '400', success: 'Failed', message: "Password incorrect !!!" }

        const token = jwt.sign({ id: findUser.Id, role: findUser.role, userName: findUser.userName }, process.env.JWT);

        return { user: findUser, token: token };

}
const changePasswordService = async (user, oldPassword, newPassword) => {
    try {
        var findUser = await AuthDAO.getUserByNameDAO(user);

        if (!findUser) return false;
        //next(createError(404, "User not found!"));

        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, findUser.password);

        if (!isOldPasswordCorrect) return false;
        //next(createError(400, "Wrong password or username!!"));

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(newPassword, salt);
        var isChange = await AuthDAO.changePasswordDAO(findUser, hash);
        if (isChange) return true;
    } catch (error) {
        console.error(error)
    }
}
const forgotPasswordService = async (user) => {
    try {
        var findUser = await AuthDAO.getUserByNameDAO(user);
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
const resetPasswordService = async (user, password1, password2, token) => {
    try {
        var findUser = await AuthDAO.getUserByNameDAO(user);
        const secret = process.env.JWT + findUser.password;

        const payload = jwt.verify(token, secret);

        if (findUser.Id !== payload.id && findUser.userName !== payload.email) {
            console.log("Invalid user");
            return;
        }

        if (password1 !== password2) return false;

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password1, salt);
        var isChange = await AuthDAO.changePasswordDAO(findUser, hash);
        if (isChange) return true;

    } catch (error) {
        console.error(error)
    }
}

module.exports = { createContactService, createAccountService, createManagerService, loginService, changePasswordService, forgotPasswordService, resetPasswordService }