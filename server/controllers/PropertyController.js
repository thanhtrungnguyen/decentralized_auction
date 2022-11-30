import Category from "../models/Category.js";
import Property from "../models/Property.js";
import { uploadFile } from "../s3.js";
import { conn } from "../server.js";
import jwt from "jsonwebtoken";


//create property
export const createProperty = async (req, res, next) => {
    const token = req.cookies.access_token;
    var category, property, propertyId, userId = null;

    // var files = req.files;
    // const result = await uploadFile(files.propertyImage0[0]);
    // console.log(result);
    // const result1 = await uploadFile(files.propertyImage1[0]);
    // console.log(result1);
    // const result2 = await uploadFile(files.propertyImage2[0]);
    // console.log(result2);
    // const result3 = await uploadFile(files.propertyVideo[0]);
    // console.log(result3);
    // const newPro = new Property(req.body);

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        userId = user.id;
    })

    try {
        // find category 
        await conn.sobject("Category__c").findOne({
            Id: req.body.CategoryId
        }, (err, result) => {
            if (err) return console.error(err)
            category = result.Id
        });

        await conn.sobject("Property_DAP__c").create({
            Name: req.body.PropertyName,
            Category_Id__c: category,
            Description__c: req.body.propertyDescription,
            Deposit_Amount__c: req.body.DepositAmount,
            Start_View_Property_Time__c: req.body.StartViewPropertyTime+"+07:00",
            End_View_Property_Time__c: req.body.EndViewPropertyTime+"+07:00",
            Place_View_Property__c: req.body.PlaceViewProperty,
            Price_Step__c: req.body.PriceStep,
            Start_Bid__c: req.body.StartBid,
            //User_Id__c: req.body.userId
            User_Id__c: userId
        }, (err, result) => {
            if (err) console.error(err)
            property = result.id
        })
        // await conn.sobject("Property_DAP__c").findOne({
        //     Property_Id__c: property
        // }, (err, result) => {
        //     if (err) console.error(err)
        //     propertyId = result.id
        // })
        // var mediaUrl = [{ Name: result.key, Property_Id__c: propertyId }, { Name: result1.key, Property_Id__c: propertyId },
        // { Name: result2.key, Property_Id__c: propertyId }, { Name: result3.Key, Property_Id__c: propertyId }]

        // await conn.bulk.load("Property_Media__c", "insert", mediaUrl, function (err, rets) {
        //     if (err) { return console.error(err); }
        //     for (var i = 0; i < rets.length; i++) {
        //         if (rets[i].success) {
        //             console.log("#" + (i + 1) + " loaded successfully, id = " + rets[i].id);
        //         } else {
        //             console.log("#" + (i + 1) + " error occurred, message = " + rets[i].errors.join(', '));
        //         }
        //     }
        //     // ...
        // });
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

}

// get all property
export const getAllPropertyByUser = async (req, res, next) => {

    try {
        const token = req.cookies.access_token;
        var userId, properties;
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return next(createError(403, "Token is not valid!"));
            userId = user.id;
        })

        await conn.sobject("Property_DAP__c").find({User_Id__c:`${userId}`}, (err, result) => {
            if (err) console.error(err)
            properties = result
        })
        res.status(200).json(properties).send();

    } catch (error) {
        next(error);
    }
}


//update property
export const updateProperty = async (req, res, next) => {
    const token = req.cookies.access_token;
    var category, property, userId = null;

    // var files = req.files;
    // const result = await uploadFile(files.propertyImage0[0]);
    // console.log(result);
    // const result1 = await uploadFile(files.propertyImage1[0]);
    // console.log(result1);
    // const result2 = await uploadFile(files.propertyImage2[0]);
    // console.log(result2);
    // const result3 = await uploadFile(files.propertyVideo[0]);
    // console.log(result3);
    // const newPro = new Property(req.body);

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        userId = user.id;
        
    })


    try {
        await conn.sobject("Category__c").findOne({
            Id: req.body.CategoryId
        }, (err, result) => {
            if (err) return console.error(err)
            category = result.Id
        });
        var status = req.body.status;
        if (status == "Created" || status == "Reject" || status == "Failed") {
            await conn.sobject("Property_DAP__c")
                .find({ Id: req.params.id })
                .update({
                    Name: req.body.PropertyName,
                    Category_Id__c: category,
                    Description__c: req.body.propertyDescription,
                    Deposit_Amount__c: req.body.DepositAmount,
                    Start_View_Property_Time__c: req.body.StartViewPropertyTime+"+07:00",
                    End_View_Property_Time__c: req.body.EndViewPropertyTime+"+07:00",
                    Place_View_Property__c: req.body.PlaceViewProperty,
                    Price_Step__c: req.body.PriceStep,
                    Start_Bid__c: req.body.StartBid,
                    //User_Id__c: req.body.userId
                    User_Id__c: userId
                }, (err, result) => {
                    if (err) console.error(err)
                    property=result
                })
            res.status(200).json(property);
        }
    } catch (error) {
        next(error);
    }
}
//find property by id
export const findPropertyByID = async (req, res, next) => {
    try {
        var property;
        // const updateProperty = await Property.findById(req.params.id);
        // res.status(200).json(updateProperty);
        await conn.sobject("Property_DAP__c").find({ Id: req.params.id }, (err, ret) => {
            if (err) console.error(err)
            property = ret
        })
        res.status(200).json(property);
    } catch (error) {
        next(error);
    }
}



// create category
export const createCate = async (req, res, next) => {
    var category;

    try {
        await conn.sobject("Category__c").create({
            Name: req.body.name
        }, (err, ret) => {
            if (err) console.error(err)
            category = ret
        })
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
}

// get all category
export const getAllCate = async (req, res, next) => {
    var category;
    try {
        await conn.sobject("Category__c").find({}, (err, ret) => {
            if (err) console.error(err)
            category = ret
        })
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
}
