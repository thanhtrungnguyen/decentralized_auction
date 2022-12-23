const PropertyDAO = require('../dal/PropertyDAO');
const CategoryDAO = require('../dal/CategoryDAO');
const { uploadFile } = require('../s3');
const jwt = require("jsonwebtoken");
const createProperty = async (token, files, viewPropertyTime, categoryName, property) => {
    try {
        var userId, propertyId = null;
        const result = await uploadFile(files.propertyImage1[0]);
        console.log(result);
        const result1 = await uploadFile(files.propertyImage2[0]);
        console.log(result1);
        const result2 = await uploadFile(files.propertyImage3[0]);
        console.log(result2);

        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return next(createError(403, "Token is not valid!"));
            userId = user.id;
        });

        var startViewPropertyTime = new Date(viewPropertyTime.split(",")[0]).toISOString();
        var endViewPropertyTime = new Date(viewPropertyTime.split(",")[1]).toISOString();

        var propertyId = await PropertyDAO.createProperty(categoryName, property, startViewPropertyTime, endViewPropertyTime, userId)

        var mediaUrl = [
            { Name: result.key, Property_DAP_Id__c: propertyId },
            { Name: result1.key, Property_DAP_Id__c: propertyId },
            { Name: result2.key, Property_DAP_Id__c: propertyId },
            { Name: property.propertyVideo, Property_DAP_Id__c: propertyId },
        ];
        await PropertyDAO.createPropertyMedia(mediaUrl);
        return propertyId;
    } catch (error) {
        console.error(error)
    }
}
const updateProperty = async (token, files, viewPropertyTime, categoryName, property) => {
    try {
        var userId, propertyId = null;
        const result = await uploadFile(files.propertyImage1[0]);
        console.log(result);
        const result1 = await uploadFile(files.propertyImage2[0]);
        console.log(result1);
        const result2 = await uploadFile(files.propertyImage3[0]);
        console.log(result2);

        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return next(createError(403, "Token is not valid!"));
            userId = user.id;
        });

        var startViewPropertyTime = new Date(viewPropertyTime.split(",")[0]).toISOString();
        var endViewPropertyTime = new Date(viewPropertyTime.split(",")[1]).toISOString();

        var mediaUrl = [
            { Name: result.key, Property_DAP_Id__c: propertyId },
            { Name: result1.key, Property_DAP_Id__c: propertyId },
            { Name: result2.key, Property_DAP_Id__c: propertyId },
            { Name: property.propertyVideo, Property_DAP_Id__c: propertyId },
        ];
        if (property.status == "Created" || property.status == "Reject" || property.status == "Failed") {
            var propertyId = await PropertyDAO.updateProperty(categoryName, property, startViewPropertyTime, endViewPropertyTime, userId)
            await PropertyDAO.createPropertyMedia(mediaUrl);
            return propertyId;
        } else {
            createError("500", "Can't update property");
        }
    } catch (error) {
        console.error(error)
    }
}
const getPropertiesByUser = async (token,index,status,category,nameProperty) => {
    var userId = null;
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        userId = user.id;
    });
    var data = await PropertyDAO.findPropertiesByUser(userId,index,status,category,nameProperty);
    var categories = await CategoryDAO.getAllCategory()
    return {data:data,categories:categories};
}
const getPropertiesByStatus = async(token,status)=>{
    var userId = null;
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        userId = user.id;
    });
    var properties = await PropertyDAO.findPropertiesByStatus(userId,status);
    return properties;
}
const getPropertyById = async (propertyId) => {
    var property = await PropertyDAO.findPropertyById(propertyId);
    return property;
}

const filterProperty= async (token,propertyName,propertyStatus) => {
    var userId = null;
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        userId = user.id;
    });
    var properties = await PropertyDAO.filterProperty(userId,propertyName,propertyStatus);
    return properties;
}

module.exports = { createProperty, getPropertiesByUser, getPropertyById,updateProperty,getPropertiesByStatus,filterProperty }