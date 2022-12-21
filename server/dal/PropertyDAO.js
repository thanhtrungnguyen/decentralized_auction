const conn = require('./connectSF')

const createProperty = async (categoryName, property, startViewPropertyTime, endViewPropertyTime, userId) => {
    var connection = await conn();
    try {
        var propertyId = null
        var categoryId = await findCategory(categoryName);
        await connection.sobject("Property_DAP__c").create(
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
const createPropertyMedia = async (mediaUrl) => {
    var connection = await conn();
    await connection.bulk.load("Property_Media__c", "insert", mediaUrl, function (err, rets) {
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
const findPropertyById = async (propertyId) => {
    var connection = await conn();
    try {
        var property = null;
        await connection.query(
            "Select Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Description__c, Name, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name from Properties_Media__r) from Property_DAP__c Where Id ='" +
            propertyId +
            "'",
            (err, res) => {
                if (err) return console.error(err);
                property = res.records[0];
            }
        );
        return property;
    } catch (error) {
        console.error(error)
    }
}
const findCategory = async (categoryName) => {
    var connection = await conn();
    var categoryId = null;
    await connection.query(`Select Id, Name from Category_DAP__c where Name = '${categoryName}'`, (err, result) => {
        if (err) return console.error(err);
        categoryId = result.records[0].Id;
    });
    return categoryId
}
const findPropertiesByUser = async (userId) => {
    var properties = null;
    var connection = await conn();
    await connection.query(`Select Id, Name,Status__c, Category_Id__r.Name,Start_Bid__c from Property_DAP__c where User_Id__c = '${userId}' `, (err, result) => {
        if (err) console.error(err);
        properties = result.records;
    });
    return properties;
}
const updateProperty = async (categoryName, property, startViewPropertyTime, endViewPropertyTime, userId) => {
    try {
        var connection = await conn();
        var propertyId = null
        var categoryId = await findCategory(categoryName);
        await connection
            .sobject("Property_DAP__c")
            .find({Id: property.Id})
            .update(
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
                    propertyId = result.Id;
                }
            );
            return propertyId;
    } catch (error) {
        console.error(error)
    }
}
const findPropertiesByStatus = async(userId,status)=>{
    var properties = null;
    var connection = await conn();
    await connection.query(
        `Select Id, Name,Status__c, Category_Id__r.Name,Start_Bid__c from Property_DAP__c where User_Id__c = '${userId}' And Status__c = '${status}'`,
        (err, result) => {
            if (err) console.error(err);
            properties = result.records;
        }
    );
    return properties;
}
const filterProperty = async(userId,propertyName,propertyStatus)=>{
    var properties = null;
     var connection = await conn();
    await connection.query(
        `Select Id, Name,Status__c, Category_Id__r.Name,Start_Bid__c from Property_DAP__c where User_Id__c = '${userId}' And Name like '%${propertyName}%' And Status__c = '${propertyStatus}'`,
        (err, result) => {
            if (err) console.error(err);
            properties = result.records;
        }
    );
    return properties;
}

module.exports = { createProperty, createPropertyMedia, findPropertiesByUser, findPropertyById, updateProperty,findPropertiesByStatus,filterProperty }