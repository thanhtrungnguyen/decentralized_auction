const conn = require("./connectSF");

const perPage = 10;

const getAllUser = async (role, index, status, name) => {
    var listUser, totalUser, total;
    var num = (parseInt(index) - 1) * perPage;
    var query,
        queryCount = null;
    var connection = await conn();
    try {
        // role Manager
        if (role === "MANAGER") {
            //get all manager
            if (status == "" && name == "") {
                query =
                    `Select User_DAP__r.Id, User_DAP__r.Name, User_DAP__r.Status__c from Role_Right__c where Role_Id__r.Name = '${role}' order by ` +
                    `CreatedDate desc limit ${perPage} offset ${num}`;
                queryCount =
                    `Select User_DAP__r.Id, User_DAP__r.Name, User_DAP__r.Status__c from Role_Right__c where Role_Id__r.Name = '${role}' order by ` +
                    `CreatedDate desc`;
            }
            //get all manager with userName content name
            else if (status == "") {
                query =
                    `Select User_DAP__r.Id, User_DAP__r.Name, User_DAP__r.Status__c from Role_Right__c where User_DAP__r.Name like '%${name}%' ` +
                    `and Role_Id__r.Name = '${role}' order by CreatedDate desc limit ${perPage} offset ${num}`;
                queryCount =
                    `Select User_DAP__r.Id, User_DAP__r.Name, User_DAP__r.Status__c from Role_Right__c where User_DAP__r.Name like '%${name}%' ` +
                    `and Role_Id__r.Name = '${role}' order by CreatedDate desc`;
            }
            //get all manager with status = status
            else if (name == "") {
                query =
                    `Select User_DAP__r.Id, User_DAP__r.Name, User_DAP__r.Status__c from Role_Right__c where User_DAP__r.Status__c = '${status}' ` +
                    `and Role_Id__r.Name = '${role}' order by CreatedDate desc limit ${perPage} offset ${num}`;
                queryCount =
                    `Select User_DAP__r.Id, User_DAP__r.Name, User_DAP__r.Status__c from Role_Right__c where User_DAP__r.Status__c = '${status}' ` +
                    `and Role_Id__r.Name = '${role}' order by CreatedDate desc `;
            }
            //get all manager with userName content name and status = status
            else {
                query =
                    `Select User_DAP__r.Id, User_DAP__r.Name, User_DAP__r.Status__c from Role_Right__c where User_DAP__r.Name like '%${name}%' ` +
                    `and User_DAP__r.Status__c = '${status}' and Role_Id__r.Name = '${role}' order by CreatedDate desc limit ${perPage} offset ${num}`;
                queryCount =
                    `Select User_DAP__r.Id, User_DAP__r.Name, User_DAP__r.Status__c from Role_Right__c where User_DAP__r.Name like '%${name}%' ` +
                    `and User_DAP__r.Status__c = '${status}' and Role_Id__r.Name = '${role}' order by CreatedDate desc `;
            }
            await connection.query(query, (err, result) => {
                if (err) console.log(err);
                listUser = result.records;
            });
            await connection.query(queryCount, (err, result) => {
                if (err) console.log(err);
                total = result.totalSize;
            });
            await connection.query(`select id from Role_Right__c where Role_Id__r.Name = '${role}' `, (err, result) => {
                if (err) console.log(err);
                totalUser = result.totalSize;
            });
        }

        // role Bidder or Seller
        else {
            //get all Bidder or Seller
            if (status == "" && name == "") {
                query =
                    `Select User_Id__c, Name, Phone__c,Email__c,User_Id__r.Status__c from Contact__c Where User_Id__c IN ` +
                    `(select User_DAP__c from Role_Right__c where Role_Id__r.Name = '${role}') order by CreatedDate desc limit ${perPage} offset ${num} `;

                queryCount =
                    `Select User_Id__c, Name, Phone__c,Email__c,User_Id__r.Status__c from Contact__c Where User_Id__c IN ` +
                    `(select User_DAP__c from Role_Right__c where Role_Id__r.Name = '${role}') order by CreatedDate desc `;
            }
            //get all Bidder or Seller with userName content name
            else if (status == "") {
                query =
                    `Select User_Id__c, Name, Phone__c,Email__c,User_Id__r.Status__c from Contact__c Where User_Id__c IN ` +
                    `(select User_DAP__c from Role_Right__c where Role_Id__r.Name = '${role}') and ` +
                    `(Email__c like '%${name}%' or Name like '%${name}%') order by CreatedDate desc limit ${perPage} offset ${num} `;
                queryCount =
                    `Select User_Id__c, Name, Phone__c,Email__c,User_Id__r.Status__c from Contact__c Where User_Id__c IN ` +
                    `(select User_DAP__c from Role_Right__c where Role_Id__r.Name = '${role}') and ` +
                    `(Email__c like '%${name}%' or Name like '%${name}%') order by CreatedDate desc `;
            }
            //get all Bidder or Seller with status = status
            else if (name == "") {
                query =
                    `Select User_Id__c, Name, Phone__c,Email__c,User_Id__r.Status__c from Contact__c Where User_Id__c IN ` +
                    `(select User_DAP__c from Role_Right__c where Role_Id__r.Name = '${role}') and User_Id__r.Status__c = '${status}' ` +
                    `order by CreatedDate desc limit ${perPage} offset ${num} `;
                queryCount =
                    `Select User_Id__c, Name, Phone__c,Email__c,User_Id__r.Status__c from Contact__c Where User_Id__c IN ` +
                    `(select User_DAP__c from Role_Right__c where Role_Id__r.Name = '${role}') and User_Id__r.Status__c = '${status}' ` +
                    `order by CreatedDate desc `;
            }
            //get all Bidder or Seller with userName content name and status = status
            else {
                query =
                    `Select User_Id__c, Name, Phone__c,Email__c,User_Id__r.Status__c from Contact__c Where User_Id__c IN ` +
                    `(select User_DAP__c from Role_Right__c where Role_Id__r.Name = '${role}') and User_Id__r.Status__c = '${status}' and ` +
                    `(Email__c like '%${name}%' or Name like '%${name}%') order by CreatedDate desc limit ${perPage} offset ${num} `;

                queryCount =
                    `Select User_Id__c, Name, Phone__c,Email__c,User_Id__r.Status__c from Contact__c Where User_Id__c IN ` +
                    `(select User_DAP__c from Role_Right__c where Role_Id__r.Name = '${role}') and User_Id__r.Status__c = '${status}' and ` +
                    `(Email__c like '%${name}%' or Name like '%${name}%') order by CreatedDate desc `;
            }
            await connection.query(query, (err, result) => {
                if (err) console.log(err);
                listUser = result.records;
            });
            await connection.query(queryCount, (err, result) => {
                if (err) console.log(err);
                total = result.totalSize;
            });
            await connection.query(`select id from Role_Right__c where Role_Id__r.Name = '${role}' `, (err, result) => {
                if (err) console.log(err);
                totalUser = result.totalSize;
            });
        }
        return { listUser: listUser, total: total, totalUser: totalUser };
    } catch (error) { }
};
const getUserById = async (userId) => {
    var connection = await conn();
    var role = await getUserRole(userId);
    var type, user, contact, account = null;
    if (role === 'MANAGER') {
        await connection.sobject('User__c').find({ Id: userId }, (err, result) => {
            if (err) console.err(err)
            user = result
        })
    }
    else {
        await connection.sobject('User__c').find({ Id: userId }, (err, result) => {
            if (err) console.err(err)
            user = result[0]
        })
        await connection.sobject('Contact__c').find({ User_Id__c: userId }, (err, result) => {
            if (err) console.err(err)
            contact = result[0]
        })
        await connection.sobject('User__c').find({ Id: userId }, (err, result) => {
            if (err) console.err(err)
            type = result[0].Type__c;
        })
        if (type === 'ACCOUNT') {
            await connection.sobject('Account__c').find({ User_Id__c: userId }, (err, result) => {
                if (err) console.err(err)
                account = result[0]
            })
        }
    }
    return { user: user, contact: contact, account: account };
}
const getUserRole = async (userId) => {
    var connection = await conn();
    var role = null;
    await connection.query(`select User_DAP__r.Id,Role_Id__r.Name from Role_Right__c where User_DAP__r.Id = '${userId}'`, (err, result) => {
        if (err) console.log(err);
        role = result.records[0].Role_Id__r.Name;
    });
    return role;
};
const updateProfileBidder = async (userId, contact, account, filesImg) => {
    var isUpdate = false;
    var type,contactId,accountId;
    var connection = await conn();
   
    
    await connection.sobject("Contact__c").find({ User_Id__c: userId }, (err, result) => {
        if (err) console.error(err)
        contactId = result[0].Id
    })
    
    var profile = {
        Id:contactId,
        //User_Id__c: userId,
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
        // Font_Side_Image__c: filesImg.result.key,
        // Back_Side_Image__c: filesImg.result1.key,
        // User_Id__c: userId,
    }
    if (filesImg.result !== null) {
        profile.Font_Side_Image__c = filesImg.result.key
    }
    if (filesImg.result1 !== null) {
        profile.Font_Side_Image__c = filesImg.result1.key
    }
    await connection.sobject("Contact__c").update(profile,
        (err, ret) => {
            if (err || !ret.success) {
                return console.error(err, ret);
            }
            if (ret) isUpdate = true;
        }
    );
    await connection.sobject("User__c").find({ Id: userId }, (err, result) => {
        if (err) console.error(err)
        type = result[0].Type__c
    })
    if (type === 'ACCOUNT') {
        await connection.sobject("Account__c").find({ User_Id__c: userId }, (err, result) => {
            if (err) console.error(err)
            accountId = result[0].Id
        })
        await connection.sobject("Account__c").update(
            {
                Id:accountId,
                User_Id__c: userId,
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
    }

    return isUpdate
};
const changeStatus = async (userId) => {
    var connection = await conn();
    var findUser = await getUserById(userId);
    var status = 'Activate';
    status === findUser.user.Status__c ? status = 'Deactivate' : status = status;
    var isChange = false;
    await connection.sobject('User__c').update({
        Id: userId,
        Status__c: status
    }, (err, result) => {
        if (err) console.error(err);
        if (result) isChange = true;
    })
    return isChange
}
module.exports = { getAllUser, getUserById, updateProfileBidder, changeStatus };
