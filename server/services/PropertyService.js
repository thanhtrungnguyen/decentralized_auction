const PropertyDAO = require('../dal/PropertyDAO')

const createProperty = async (token, files, viewPropertyTime, categoryName, property) => {
    try {
        var userId, propertyId = null;
        const result = await uploadFile(files.propertyImage0[0]);
        console.log(result);
        const result1 = await uploadFile(files.propertyImage1[0]);
        console.log(result1);
        const result2 = await uploadFile(files.propertyImage2[0]);
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
module.exports = { createProperty }