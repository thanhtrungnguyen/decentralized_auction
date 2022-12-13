const AuthService = require('../services/AuthService');

//define role
const BIDDER = "BIDDER";
const SELLER = "SELLER";
const MANAGER = "MANAGER";
const ADMIN = "ADMIN";
const CONTACT = "CONTACT";
const ACCOUNT = "ACCOUNT";
//register new Bidder
const register = async (req, res, next) => {
    try {
        const user = { userName: req.body.username, password: req.body.password };
        const role = req.body.role;
        const files = req.files;
        const contact = {
            Name: req.body.firstName + " " + req.body.lastName,
            First_Name__c: req.body.firstName,
            Last_Name__c: req.body.lastName,
            Gender__c: req.body.gender,
            Email__c: req.body.email,
            Date_Of_Birth__c: req.body.dateOfBirth,
            Phone__c: req.body.phone,
            Wards__c: req.body.ward,
            City__c: req.body.city,
            District__c: req.body.district,
            Address__c: req.body.specificAddress,
            Card_Number__c: req.body.cardNumber,
            Card_Granted_Date__c: req.body.dateRangeCard,
            Card_Granted_Place__c: req.body.cardGrantedPlace,
        }
        const account = {
            Name: req.body.organizationName,
            //Company_Certificate__c: req.body.certificateCompany,
            //Employees__c:
            //Phone__c:
            Specific_Address__c: req.body.specificAddressOrganization,
            Tax_Code__c: req.body.taxCode,
            Tax_Code_Granted_Date__c: req.body.taxCodeGrantedDate,
            Tax_Code_Granted_Place__c: req.body.taxCodeGrantedPlace,
            //Website__c:
            Position: req.body.position,
        }
        if (req.body.usertype === CONTACT) {
            //add contact
            var newContact = await AuthService.createContact(user, contact, role, files)

        }
        if (req.body.usertype === ACCOUNT) {
            //add new account
            var newAccount = await AuthService.createAccount(user, contact, role, files, account)
        }
        if (newAccount || newContact) {
            res.status(200).send("User has been created.");
        }
    } catch (error) {
        next(error);
    }
};
//register new Seller
const registerSeller = async (req, res, next) => {
    try {
        const user = { userName: req.body.username, password: req.body.password };
        const role = SELLER;
        const files = req.files;
        const contact = {
            Name: req.body.firstName + " " + req.body.lastName,
            First_Name__c: req.body.firstName,
            Last_Name__c: req.body.lastName,
            Gender__c: req.body.gender,
            Email__c: req.body.email,
            Date_Of_Birth__c: req.body.dateOfBirth,
            Phone__c: req.body.phone,
            Wards__c: req.body.ward,
            City__c: req.body.city,
            District__c: req.body.district,
            Address__c: req.body.specificAddress,
            Card_Number__c: req.body.cardNumber,
            Card_Granted_Date__c: req.body.dateRangeCard,
            Card_Granted_Place__c: req.body.cardGrantedPlace,
        }
        const account = {
            Name: req.body.organizationName,
            //Company_Certificate__c: req.body.certificateCompany,
            //Employees__c:
            //Phone__c:
            Specific_Address__c: req.body.specificAddressOrganization,
            Tax_Code__c: req.body.taxCode,
            Tax_Code_Granted_Date__c: req.body.taxCodeGrantedDate,
            Tax_Code_Granted_Place__c: req.body.taxCodeGrantedPlace,
            //Website__c:
            Position: req.body.position,
        }
        var accountId = await AuthService.createAccount(user, contact, role, files, account)
        if (accountId)
            res.status(200).send("Seller has been created.");
    } catch (error) {
        next(error);
    }
};
//register new Manager
const registerManager = async (req, res, next) => {
    try {
        const user = { userName: req.body.userName, password: req.body.password };
        const role = MANAGER;
        var userId = await AuthService.createManager(user, role)
        if (userId)
            res.status(200).send("Manager has been created.");
    } catch (error) {
        next(error);
    }
};
//login
const login = async (req, res, next) => {
    try {
        const user = { userName: req.body.userName, password: req.body.password };
        var data = await AuthService.loginService(user);
        if(data.user==null){
            next(createError(data.error,data.message))
        }else{
            res.cookie("access_token", data.token)
            .status(200)
            .json({ userId: data.user.Id, userName: data.user.userName, role: data.user.role, token: data.token })
            .send();
        }

        
        // return res.redirect("/");
    } catch (error) {
        next(error);
    }
};

//change the password
const changePassword = async (req, res, next) => {
    try {
        var user = { userName: req.body.userName }
        var oldPassword = req.body.oldPassword
        var newPassword = req.body.newPassword
        var isChange = await AuthService.changePassword(user, oldPassword, newPassword);
        if (isChange) res.status(200).send("Changed successful !!!");
    } catch (error) {
        next(error);
    }
};
//logout and clear cookie
const logout = async (req, res, next) => {
    try {
        res.clearCookie("access_token").status(200).json({ message: "Log out successfully!!" });
    } catch (error) {
        next(error);
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        var user = { userName: req.body.userName }
        var link = await AuthService.forgotPassword(user);
        res.status(200).json({
            link: link,
        });
    } catch (error) {
        next(error);
    }
};
const resetPassword = async (req, res, next) => {
    try {
        var user = { Id: req.body.userId }
        var password1 = req.body.password1;
        var password2 = req.body.password2;
        var token = req.body.token;
        var isChange = await AuthService.resetPassword(user, password1, password2, token);
        if (isChange) res.status(200).send("Changed successful !!!");

    } catch (error) {
        next(err);
    }
};
module.exports = { resetPassword, forgotPassword, logout, changePassword, login, register, registerSeller, registerManager };
