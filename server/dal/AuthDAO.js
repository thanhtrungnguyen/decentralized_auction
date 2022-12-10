const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jsforce = require("jsforce");

const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL,
});

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        // console.log(res.id);
    }
});

const createContactDAO = async (user, contact, role, filesImg) => {
    var contactId = null;
    var userId = await createUserDAO(user);
    await conn.sobject("Contact__c").create(
        {
            Name: contact.Name,
            First_Name__c: contact.First_Name__c,
            Last_Name__c: contact.Last_Name__c,
            Gender__c: contact.Gender__c,
            Email__c: contact.Email__c,
            Date_Of_Birth__c: contact.Date_Of_Birth__c,
            Phone__c: contact.Phone__c,
            Wards__c: contact.Wards__c,
            City__c: contact.City__c,
            District__c: contact.District__c,
            Address__c: contact.Address__c,
            Card_Number__c: contact.Card_Number__c,
            Card_Granted_Date__c: contact.Card_Granted_Date__c,
            Card_Granted_Place__c: contact.Card_Granted_Place__c,
            Font_Side_Image__c: filesImg.result.key,
            Back_Side_Image__c: filesImg.result1.key,
            User_Id__c: userId,
        }, (err, ret) => {
            if (err || !ret.success) {
                return console.error(err, ret);
            }
            contactId = ret.id;
            console.log("Created contact : " + ret);
        }
    );
    await addRoleForUserDAO(role, userId);
    return contactId;
}
const createAccountDAO = async (user, contact, role, filesImg, account) => {
    try {
        var accountId = null;
        var userId = await createUserDAO(user);
        var contactId = await createContactDAO(user, contact, role, filesImg)
        await conn.sobject("Account__c").create(
            {
                Name: account.Name,
                //Company_Certificate__c: req.body.certificateCompany,
                //Employees__c:
                //Phone__c:
                Specific_Address__c: account.Specific_Address__c,
                Tax_Code__c: account.Tax_Code__c,
                Tax_Code_Granted_Date__c: account.Tax_Code_Granted_Date__c,
                Tax_Code_Granted_Place__c: account.Tax_Code_Granted_Place__c,
                //Website__c:
                User_Id__c: userId,
                Contact_DAP__c: contactId,
            },
            (err, result) => {
                if (err) return console.error(err);
                accountId = result.id;
                // console.log("Created account id : " + result.id);
            }
        );
        await addRepresentativeAccount(accountId,contactId,account.Position);
        return accountId;
    } catch (error) {
        console.error(error)
    }
}
const createManagerDAO = async (user,role) =>{
    try {
        var userId = await createUserDAO(user);
        await addRoleForUserDAO(role);
        return userId;
    } catch (error) {
        console.error(error)
    }
}
const createUserDAO = async (user) => {
    try {

        var userId = null;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);
        // add new user
        await conn.sobject("User__c").create(
            {
                Name: user.userName,
                Password__c: hash,
                Status__c: "Activate"
            }, (err, ret) => {
                if (err || !ret.success) {
                    return console.error(err, ret);
                }
                console.log("Created record id : " + ret.id);
                userId = ret.id;
            }
        );
        return userId;
    } catch (error) {
        console.error(error)
    }
}
const addRoleForUserDAO = async (role, userId) => {
    try {
        await conn.sobject("Role__c").findOne(
            {
                Name: role,
            },
            (err, ret) => {
                if (err) {
                    return console.error(err, ret);
                } else {
                    role = ret.Id;
                    console.log("Role Id : " + ret.Id);
                }
            }
        );
        await conn.sobject("Role_Right__c").create(
            {
                Role_Id__c: role,
                User_DAP__c: userId,
            },
            (err, ret) => {
                if (err || !ret.success) {
                    return console.error(err, ret);
                }
                console.log("Created role right : " + ret);
            }
        );
    } catch (error) {
        console.error(error)
    }
}
const addRepresentativeAccount = async(accountId,contactId,position)=>{
    try {
        await conn.sobject("Representative_Account_DAP__c").create(
            {
                Account_DAP__c: accountId,
                Contact_DAP__c: contactId,
                Name: position
            },
            (err, result) => {
                if (err || !result.success) {
                    return console.error(err, result);
                }
                console.log("Created Representative Account DAP : " + result);
            }
        );
    } catch (error) {
        console.error(error);
    }
}
const getUserByNameDAO = async(user)=>{
    try {
        var findUser,role = null;
        await conn.sobject("User__c").findOne({ Name: user.userName}, (err, ret) => {
            if (err) console.error(err);
            findUser = ret;
        });
        await conn.query(`Select Role_Id__r.Name from Role_Right__c where User_DAP__r.Id = '${findUser.Id}'`,(err,result)=>{
            if (err) console.error(err);
            role = result.records[0].Role_Id__r.Name;
        })
        return {userName:findUser.Name,password: findUser.Password__c, role:role,status:findUser.Status__c,Id:findUser.Id};
    } catch (error) {
        console.error(error)
    }
}
const getUserByIdDAO = async(user)=>{
    try {
        var findUser,role = null;
        await conn.sobject("User__c").findOne({ Id: user.Id}, (err, ret) => {
            if (err) console.error(err);
            findUser = ret;
        });
        await conn.query(`Select Role_Id__r.Name from Role_Right__c where User_DAP__r.Id = '${findUser.Id}'`,(err,result)=>{
            if (err) console.error(err);
            role = result.records[0].Role_Id__r.Name;
        })
        return {userName:findUser.Name,password: findUser.Password__c, role:role,status:findUser.Status__c,Id:findUser.Id};
    } catch (error) {
        console.error(error)
    }
}
const changePasswordDAO =async(user,password)=>{
    try {
        await conn.sobject("User__c").update(
            {
                Id: user.Id,
                Password__c: password,
            },(err, result) => {
                if (err) return console.error(err);
            }
        );
        return true;
    } catch (error) {
        console.error(error)
    }
}

module.exports = { createContactDAO, createAccountDAO,createManagerDAO,getUserByNameDAO,changePasswordDAO,getUserByIdDAO }