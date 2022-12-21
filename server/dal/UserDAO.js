const conn = require('./connectSF')

const perPage = 10;


const getAllUser = async (role, index) => {
    var listUser, total;
    var num = (parseInt(index) - 1) * perPage;
    var connection = await conn();
    try {
        if (role === "MANAGER") {
            await connection.query(`Select User_DAP__r.Id, User_DAP__r.Name, User_DAP__r.Status__c from Role_Right__c where Role_Id__r.Name = '${role}' order by CreatedDate desc limit ${perPage} offset ${num} `, (err, result) => {
                if (err) console.log(err)
                listUser = result.records
            })
            await connection.query(`select id from Role_Right__c where Role_Id__r.Name = '${role}' `, (err, result) => {
                if (err) console.log(err)
                total = result.totalSize;
            })
        } else {
            await connection.query(`Select User_Id__c, Name, Phone__c,Email__c,User_Id__r.Status__c from Contact__c Where User_Id__c IN (select User_DAP__c from Role_Right__c where Role_Id__r.Name = '${role}') order by CreatedDate desc limit ${perPage} offset ${num} `, (err, result) => {
                if (err) console.log(err)
                listUser = result.records
            })
            await connection.query(`select id from Role_Right__c where Role_Id__r.Name = '${role}' `, (err, result) => {
                if (err) console.log(err)
                total = result.totalSize;
            })
        }
        return { listUser: listUser, total: total }
    } catch (error) {

    }
}
const getUserById = async (userId) => {
    var connection = await conn();
    var role = await getUserRole(userId);
    var user = null;
    if (role === 'MANAGER') {
        await connection.sobject('User__c').find({ Id: userId }, (err, result) => {
            if (err) console.err(err)
            user = result
        })
    }
    else {
        await connection.sobject('Contact__c').find({User_Id__c: userId},(err,result)=>{
            if (err) console.err(err)
            user = result
        })
    }
    return user;
}
const getUserRole = async (userId) => {
    var connection = await conn();
    var role = null;
    await connection.query(`select User_DAP__r.Id,Role_Id__r.Name from Role_Right__c where User_DAP__r.Id = '${userId}'`, (err, result) => {
        if (err) console.log(err)
        role = result.records[0].Role_Id__r.Name;
    })
    return role;
}
const updateUser = async(user) =>{
    
}
module.exports = { getAllUser, getUserById }