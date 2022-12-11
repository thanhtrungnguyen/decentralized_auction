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

const createProperty = async(categoryName,property,startViewPropertyTime,endViewPropertyTime,userId)=>{
    try {
        var propertyId = null
        var categoryId = await findCategory(categoryName);
        await conn.sobject("Property_DAP__c").create(
            {
                Name: property.Name,
                Category_Id__c: categoryId,
                Description__c: property.Description__c,
                Deposit_Amount__c: property.Deposit_Amount__c,
                Start_View_Property_Time__c: startViewPropertyTime,
                End_View_Property_Time__c: endViewPropertyTime,
                Place_View_Property__c: property.Place_View_Property__c,
                Price_Step__c: property.Price_Step__c,
                Start_Bid__c: property.Start_Bid__c,
                //User_Id__c: req.body.userId
                User_Id__c: userId,
            },
            (err, result) => {
                if (err) console.error(err);
                propertyId = result.id;
            }
        );
        return propertyId;
    } catch (error) {
        console.error(error)
    }
}
const createPropertyMedia = async(mediaUrl)=>{
    await conn.bulk.load("Property_Media__c", "insert", mediaUrl, function (err, rets) {
        if (err) {
            return console.error(err);
        }
        for (var i = 0; i < rets.length; i++) {
            if (rets[i].success) {
                console.log("#" + (i + 1) + " loaded successfully, id = " + rets[i].id);
            } else {
                console.log("#" + (i + 1) + " error occurred, message = " + rets[i].errors.join(", "));
            }
        }
        // ...
    });
}
const findPropertyByID = async(propertyId)=>{
    try {
        var property=null;
        await conn.sobject("Property_DAP__c").findOne(
            {
                Id: propertyId,
            },
            (err, result) => {
                if (err) console.error(err);
                property = result.Id;
            }
        );
        return property;
    } catch (error) {
        console.error(error)
    }
}
const findCategory = async(categoryName)=>{
    var categoryId=null;
    await conn.query(`Select Id, Name from Category_DAP__c where Name = '${categoryName}'`, (err, result) => {
        if (err) return console.error(err);
        categoryId = result.records[0].Id;
    });
    return categoryId
}
// const createPropertyDAO = async()=>{
//     try {
        
//     } catch (error) {
//         console.error(error)
//     }
// }
module.exports = {createProperty,createPropertyMedia}