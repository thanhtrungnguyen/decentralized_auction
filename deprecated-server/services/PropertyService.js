const PropertyDAO = require('../dal/PropertyDAO');
const CategoryDAO = require('../dal/CategoryDAO');
const { uploadFile } = require('../s3');
const jwt = require("jsonwebtoken");
const { createError } = require('../utils/error');
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
        var startViewPropertyTime = new Date(viewPropertyTime.split(",")[0]);
        var startViewPropertyTimeVN = startViewPropertyTime.setTime(startViewPropertyTime.getTime() + 7 * 60 * 60 * 1000);
        var startViewPropertyTimeFN = new Date(startViewPropertyTimeVN).toISOString();

        var endViewPropertyTime = new Date(viewPropertyTime.split(",")[1]);
        var endViewPropertyTimeVN = endViewPropertyTime.setTime(endViewPropertyTime.getTime() + 7 * 60 * 60 * 1000);
        var endViewPropertyTimeFN = new Date(endViewPropertyTimeVN).toISOString();


        var propertyId = await PropertyDAO.createProperty(categoryName, property, startViewPropertyTimeFN, endViewPropertyTimeFN, userId)

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
        var result = null;
        if (files.propertyImage1 !== undefined) {
            result = await uploadFile(files.propertyImage1[0]);
            console.log(result);
        }
        var result1= null;
        if (files.propertyImage2 !== undefined) {
            result1 = await uploadFile(files.propertyImage2[0]);
            console.log(result1);
        }
        var result2 = null;
        if (files.propertyImage3 !== undefined) {
            result2 = await uploadFile(files.propertyImage3[0]);
            console.log(result2);
        }




        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return next(createError(403, "Token is not valid!"));
            userId = user.id;
        });
        var time = viewPropertyTime.split(",")[0];
        var startViewPropertyTimeFN , endViewPropertyTimeFN ;
        if(!isNaN(time)){
            var startViewPropertyTime = new Date(parseInt(viewPropertyTime.split(",")[0]));
            var startViewPropertyTimeVN = startViewPropertyTime.setTime(startViewPropertyTime.getTime() + 7 * 60 * 60 * 1000);
            startViewPropertyTimeFN = new Date(startViewPropertyTimeVN).toISOString();
            var endViewPropertyTime = new Date(parseInt(viewPropertyTime.split(",")[1]));
            var endViewPropertyTimeVN = endViewPropertyTime.setTime(endViewPropertyTime.getTime() + 7 * 60 * 60 * 1000);
            endViewPropertyTimeFN = new Date(endViewPropertyTimeVN).toISOString();
        }else{
            var startViewPropertyTime = new Date((viewPropertyTime.split(",")[0]));
            var startViewPropertyTimeVN = startViewPropertyTime.setTime(startViewPropertyTime.getTime() + 7 * 60 * 60 * 1000);
            var startViewPropertyTimeFN = new Date(startViewPropertyTimeVN).toISOString();
    
            var endViewPropertyTime = new Date(viewPropertyTime.split(",")[1]);
            var endViewPropertyTimeVN = endViewPropertyTime.setTime(endViewPropertyTime.getTime() + 7 * 60 * 60 * 1000);
            var endViewPropertyTimeFN = new Date(endViewPropertyTimeVN).toISOString();
            
        }

        var propertyu = await PropertyDAO.findPropertyById(property.Id);
       
        if(result!=null){
           const a = propertyu.Properties_Media__r.records[0].Name;
           await PropertyDAO.updatePropertyMedia(a,property.Id,result.key);
        }
        if(result1!=null){
            const b = propertyu.Properties_Media__r.records[1].Name;
           await PropertyDAO.updatePropertyMedia(b,property.Id,result1.key);
        }
        if(result2!=null){
            const c = propertyu.Properties_Media__r.records[2].Name;
            await PropertyDAO.updatePropertyMedia(c,property.Id,result2.key);
        }
        const d = propertyu.Properties_Media__r.records[3].Name;
        if(property.propertyVideo != d){
            await PropertyDAO.updatePropertyMedia(d,property.Id,property.propertyVideo);
        }
        if (property.status == "Created" || property.status == "Reject" || property.status == "Failed") {
            var propertyId = await PropertyDAO.updateProperty(categoryName, property, startViewPropertyTimeFN, endViewPropertyTimeFN, userId)
     
            return propertyId;
        } else {
            createError("500", "Can't update property");
        }
    } catch (error) {
        console.error(error)
    }
}
const getPropertiesByUser = async (token, index, status, category, nameProperty) => {
    var userId = null;
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        userId = user.id;
    });
    var data = await PropertyDAO.findPropertiesByUser(userId, index, status, category, nameProperty);
    var categories = await CategoryDAO.getAllCategory()
    return { data: data, categories: categories };
}
const getPropertiesByStatus = async (token, status) => {
    var userId = null;
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        userId = user.id;
    });
    var properties = await PropertyDAO.findPropertiesByStatus(userId, status);
    return properties;
}
const getPropertyById = async (propertyId) => {
    var property = await PropertyDAO.findPropertyById(propertyId);
    return property;
}

const filterProperty = async (token, propertyName, propertyStatus) => {
    var userId = null;
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        userId = user.id;
    });
    var properties = await PropertyDAO.filterProperty(userId, propertyName, propertyStatus);
    return properties;
}

module.exports = { createProperty, getPropertiesByUser, getPropertyById, updateProperty, getPropertiesByStatus, filterProperty }