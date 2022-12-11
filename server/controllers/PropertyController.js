// const Category = require("../models/Category.js");
// const Property = require("../models/Property.js");
const { uploadFile } = require("../s3.js");
const jsforce = require("jsforce");
const jwt = require("jsonwebtoken");
const PropertyService = require('../services/PropertyService')
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
//create property
const createProperty = async (req, res, next) => {
    const token = req.cookies.access_token;
    const viewPropertyTime = req.body.viewPropertyTime;
    const categoryName = req.body.category;
    const files = req.files;
    const property = {
        Name: req.body.propertyName,
        Description__c: req.body.propertyDescription,
        Deposit_Amount__c: req.body.deposit,
        Place_View_Property__c: req.body.placeViewProperty,
        Price_Step__c: req.body.priceStep,
        Start_Bid__c: req.body.startBid,
        propertyVideo: req.body.propertyVideo
    }
    try {
        var data = await PropertyService.createProperty(token, files, viewPropertyTime, categoryName, property)
        if (data) {
            res.status(200).send("Property has been created.");
        }

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
// get list property by status
const getListByStatus = async (req, res, next) => {
    try {
        // var property;
        // const updateProperty = await Property.findById(req.params.id);
        // res.status(200).json(updateProperty);
        const token = req.cookies.access_token;
        var userId, properties;
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return next(createError(403, "Token is not valid!"));
            userId = user.id;
        });
        await conn.query(
            `Select Id, Name,Status__c, Category_Id__r.Name,Start_Bid__c from Property_DAP__c where User_Id__c = '${userId}' And Status__c = '${req.params.status}'`,
            (err, result) => {
                if (err) console.error(err);
                properties = result.records;
            }
        );
        console.log(properties);
        res.status(200).json(properties);
    } catch (error) {
        next(error);
    }
};
// get list property by PropertyName and status
const filterProperty = async (req, res, next) => {
    try {
        // var property;
        // const updateProperty = await Property.findById(req.params.id);
        // res.status(200).json(updateProperty);
        const token = req.cookies.access_token;
        var userId, properties;
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return next(createError(403, "Token is not valid!"));
            userId = user.id;
        });
        await conn.query(
            `Select Id, Name,Status__c, Category_Id__r.Name,Start_Bid__c from Property_DAP__c where User_Id__c = '${userId}' And Name like '%${req.params.name}%' And Status__c = '${req.params.status}'`,
            (err, result) => {
                if (err) console.error(err);
                properties = result.records;
            }
        );
        console.log(properties);
        res.status(200).json(properties);
    } catch (error) {
        next(error);
    }
};
module.exports = { getAllCate, createCate, findPropertyByID, updateProperty, getAllPropertyByUser, createProperty, getListByStatus, filterProperty };
