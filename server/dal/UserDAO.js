const jsforce = require("jsforce");
const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL
})
conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
    if (err) {
        console.error(err)
    } else {
       // console.log(res.id)
    }
})

const perPage = 10;


const getAllUserDAO = async(role,index) =>{
    var listUser,total;
    var num = (parseInt(index) - 1)  * perPage;
    try {
        if(role==="MANAGER"){
            await conn.query(`Select User_DAP__r.Id, User_DAP__r.Name, User_DAP__r.Status__c from Role_Right__c where Role_Id__r.Name = '${role}' order by CreatedDate desc limit ${perPage} offset ${num} `,(err, result) => {
                if (err) console.log(err)
                listUser = result.records
            }) 
            await conn.query(`select id from Role_Right__c where Role_Id__r.Name = '${role}' `,(err, result) => {
                if (err) console.log(err)
                total = result.totalSize;
            })  
        }else{
            await conn.query(`Select User_Id__c, Name, Phone__c,Email__c,User_Id__r.Status__c from Contact__c Where User_Id__c IN (select User_DAP__c from Role_Right__c where Role_Id__r.Name = '${role}') order by CreatedDate desc limit ${perPage} offset ${num} `,(err, result) => {
                if (err) console.log(err)
                listUser = result.records
            }) 
            await conn.query(`select id from Role_Right__c where Role_Id__r.Name = '${role}' `,(err, result) => {
                if (err) console.log(err)
                total = result.totalSize;
            })  
        }  
    return {listUser: listUser,total:total}
    } catch (error) {
        
    }
}
module.exports = {getAllUserDAO}