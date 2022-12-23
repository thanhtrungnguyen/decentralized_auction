const conn = require('./connectSF')

const createContact = async (user, contact, role, filesImg) => {
    var contactId = null;
    var userId = await createUser(user);
    var connection = await conn();
    await connection.sobject("Contact__c").create(
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
            //console.log("Created contact : " + ret);
        }
    );
    await addRoleForUser(role, userId);
    return contactId;
}
const createAccount = async (user, contact, role, filesImg, account) => {
    try {
        var accountId = null;
        var userId = await createUser(user);
        var contactId = await createContact(user, contact, role, filesImg)
        var connection = await conn();
        await connection.sobject("Account__c").create(
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
        await addRepresentativeAccount(accountId, contactId, account.Position);
        return accountId;
    } catch (error) {
        console.error(error)
    }
}
const createManager = async (user, role) => {
    try {
        var userId = await createUser(user);
        await addRoleForUser(role,userId);
        return userId;
    } catch (error) {
        console.error(error)
    }
}
const createUser = async (user) => {
    try {
        var userId = null;
        var connection = await conn();
        // add new user
        await connection.sobject("User__c").create(
            {
                Name: user.userName,
                Password__c: user.password,
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
const addRoleForUser = async (role, userId) => {
    try {
        var connection = await conn();
        await connection.sobject("Role__c").findOne(
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
        await connection.sobject("Role_Right__c").create(
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
const addRepresentativeAccount = async (accountId, contactId, position) => {
    try {
        var connection = await conn();
        await connection.sobject("Representative_Account_DAP__c").create(
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
const getUserByName = async (user) => {
    var findUser, role, data = null;
    var connection = await conn();

    await connection.sobject("User__c").findOne({ Name: user.userName }, async (err, ret) => {
        if (ret==null||err) {
            console.error(err);
        } else{
            findUser = ret;
            await connection.query(`Select Role_Id__r.Name from Role_Right__c where User_DAP__r.Id = '${findUser.Id}'`, (err, result) => {
                if (ret==null||err) {
                    console.error(err);
                }
                role = result.records[0].Role_Id__r.Name;
                
            })
            data = { userName: findUser.Name, password: findUser.Password__c, role: role, status: findUser.Status__c, Id: findUser.Id };
        }
      
       
    });
    
    return data;

}
const getUserById = async (user) => {
    try {
        var findUser, role = null;
        var connection = await conn();
        await connection.sobject("User__c").findOne({ Id: user.Id }, (err, ret) => {
            if (err) console.error(err);
            findUser = ret;
        });
        await connection.query(`Select Role_Id__r.Name from Role_Right__c where User_DAP__r.Id = '${findUser.Id}'`, (err, result) => {
            if (err) console.error(err);
            role = result.records[0].Role_Id__r.Name;
        })
        return { userName: findUser.Name, password: findUser.Password__c, role: role, status: findUser.Status__c, Id: findUser.Id };
    } catch (error) {
        console.error(error)
    }
}
const changePassword = async (user, password) => {
    try {
        var connection = await conn();
        await connection.sobject("User__c").update(
            {
                Id: user.Id,
                Password__c: password,
            }, (err, result) => {
                if (err) return console.error(err);
            }
        );
        return true;
    } catch (error) {
        console.error(error)
    }
}

module.exports = { createContact, createAccount, createManager, getUserByName, changePassword, getUserById , createUser}