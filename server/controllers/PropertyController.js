// const Category = require("../models/Category.js");
// const Property = require("../models/Property.js");
const { uploadFile } = require("../s3.js");
const jsforce = require("jsforce");
const jwt = require("jsonwebtoken");

const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL,
});

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log(res.id);
    }
});
//create property
const createProperty = async (req, res, next) => {
    const token = req.cookies.access_token;
    var category,
        propertyId,
        userId = null;
    var property;

    var files = req.files;
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

    var startViewPropertyTime = new Date(req.body.viewPropertyTime.split(",")[0]).toISOString();
    var endViewPropertyTime = new Date(req.body.viewPropertyTime.split(",")[1]).toISOString();

    try {
        // find category
        await conn.query(`Select Id, Name from Category_DAP__c where Name = '${req.body.category}'`, (err, result) => {
            if (err) return console.error(err);
            category = result.records[0].Id;
        });

        await conn.sobject("Property_DAP__c").create(
            {
                Name: req.body.propertyName,
                Category_Id__c: category,
                Description__c: req.body.propertyDescription,
                Deposit_Amount__c: req.body.deposit,
                Start_View_Property_Time__c: startViewPropertyTime,
                End_View_Property_Time__c: endViewPropertyTime,
                Place_View_Property__c: req.body.placeViewProperty,
                Price_Step__c: req.body.priceStep,
                Start_Bid__c: req.body.startBid,
                //User_Id__c: req.body.userId
                User_Id__c: userId,
            },
            (err, result) => {
                if (err) console.error(err);
                property = result.id;
            }
        );
        await conn.sobject("Property_DAP__c").findOne(
            {
                Id: property,
            },
            (err, result) => {
                if (err) console.error(err);
                propertyId = result.Id;
            }
        );
        var mediaUrl = [
            { Name: result.key, Property_DAP_Id__c: propertyId },
            { Name: result1.key, Property_DAP_Id__c: propertyId },
            { Name: result2.key, Property_DAP_Id__c: propertyId },
            { Name: req.body.propertyVideo, Property_DAP_Id__c: propertyId },
        ];

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
        // await conn.sobject("Property_Media__c").insertBulk(mediaUrl, (err, result) => {
        //     if (err) console.error(err)
        //     result.map(item => {
        //         console.log(item)
        //     })
        // })
        res.status(200).send("Property has been created.");
    } catch (error) {
        next(error);
    }
};
// get all property by user
const getAllPropertyByUser = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        var userId, properties;
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return next(createError(403, "Token is not valid!"));
            userId = user.id;
        });
        await conn.query("Select Id, Name,Status__c, Category_Id__r.Name,Start_Bid__c from Property_DAP__c ", (err, result) => {
            if (err) console.error(err);
            properties = result.records;
        });
        // await conn.sobject("Property_DAP__c").find({User_Id__c:`${userId}`}, (err, result) => {
        //     if (err) console.error(err)
        //     properties = result
        // })
        //console.log(properties);
        res.status(200).json(properties);
    } catch (error) {
        next(error);
    }
};
//update property
const updateProperty = async (req, res, next) => {
    const token = req.cookies.access_token;
    var category,
        property,
        userId = null;

    var files = req.files;
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

    try {
        await conn.query(`Select Id, Name from Category_DAP__c where Name = '${req.body.category}'`, (err, result) => {
            if (err) return console.error(err);
            category = result.records[0].Id;
        });
        var status = req.body.status;
        if (status == "Created" || status == "Reject" || status == "Failed") {
            await conn
                .sobject("Property_DAP__c")
                .find({ Id: req.params.id })
                .update(
                    {
                        Name: req.body.propertyName,
                        Category_Id__c: category,
                        Description__c: req.body.propertyDescription,
                        Deposit_Amount__c: req.body.deposit,
                        Start_View_Property_Time__c: startViewPropertyTime,
                        End_View_Property_Time__c: endViewPropertyTime,
                        Place_View_Property__c: req.body.placeViewProperty,
                        Price_Step__c: req.body.priceStep,
                        Start_Bid__c: req.body.startBid,
                        //User_Id__c: req.body.userId
                        User_Id__c: userId,
                    },
                    (err, result) => {
                        if (err) console.error(err);
                        property = result;
                    }
                );
            res.status(200).json(property);
        }
    } catch (error) {
        next(error);
    }
};
//find property by id
const findPropertyByID = async (req, res, next) => {
    try {
        var property;
        // const updateProperty = await Property.findById(req.params.id);
        // res.status(200).json(updateProperty);
        await conn.query(
            "Select Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Description__c, Name, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name from Properties_Media__r) from Property_DAP__c Where Id ='" +
                req.params.id +
                "'",
            (err, res) => {
                if (err) return console.error(err);
                property = res.records[0];
            }
        );
        console.log(property);
        res.status(200).json(property);
    } catch (error) {
        next(error);
    }
};
// create category
const createCate = async (req, res, next) => {
    var category;

    try {
        await conn.sobject("Category__c").create(
            {
                Name: req.body.name,
            },
            (err, ret) => {
                if (err) console.error(err);
                category = ret;
            }
        );
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};
// get all category
const getAllCate = async (req, res, next) => {
    var category;
    try {
        await conn.sobject("Category_DAP__c").find({}, (err, ret) => {
            if (err) console.error(err);
            category = ret;
        });
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllCate, createCate, findPropertyByID, updateProperty, getAllPropertyByUser, createProperty };
