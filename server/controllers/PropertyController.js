import Category from "../models/Category.js";
import Property from "../models/Property.js";
import { uploadFile } from "../s3.js";
import { conn } from "../server.js";

//create property
export const createProperty = async (req, res, next) => {
    var category,property,propertyId = null;
    var files = req.files;
    const result = await uploadFile(files.propertyImage0);
    console.log(result);
    const result1 = await uploadFile(files.propertyImage1);
    console.log(result1);
    const result2 = await uploadFile(files.propertyImage2);
    console.log(result2);
    const result3 = await uploadFile(files.propertyImage3);
    console.log(result3);
    const result4 = await uploadFile(files.propertyVideo);
    console.log(result4);
    // const newPro = new Property(req.body);
    

    try {
        // const savedProperty = await newPro.save();
        // res.status(200).json(savedProperty);

        // find category 
        await conn.sobject("Category__c").findOne({
            Name: req.body.category
        },(err,result)=>{
            if(err) return console.error(err)
            category = result.Id
        });

        await conn.sobject("Property_DAP__c").create({
            Name: req.body.propertyName,
            Category_Id__c: category,
            Property_Information__c: req.body.propertyDescription,
            User_Id__c: req.body.userId
        },(err,result)=>{
            if(err) console.error(err)
            property = result.Id
        })
        await conn.sobject("Property_DAP__c").findOne({
            Property_Id__c: property
        },(err,result)=>{
            if(err) console.error(err)
            propertyId = result.Id
        })
        var mediaUrl = [{Name:result.key,Property_Id__c:propertyId},{Name:result1.key,Property_Id__c:propertyId},
            {Name:result2.key,Property_Id__c:propertyId},{Name:result3.key,Property_Id__c:propertyId},{Name:result4.key,Property_Id__c:propertyId}]
        await conn.sobject("Property_Media__c").insertBulk(mediaUrl,(err,result)=>{
            if(err) console.error(err)
            result.map(item=>{
                console.log(item)
            })
        })


    } catch (error) {
        next(error);
    }

}
    

//update property
export const updateProperty = async (req, res, next) => {
    

    try {
        const updateProperty = await Property.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updateProperty);

    } catch (error) {
        next(error);
    }
}
//find property by id
export const findPropertyByID = async (req, res, next) => {
    

    try {
        const updateProperty = await Property.findById(req.params.id);
        res.status(200).json(updateProperty);

    } catch (error) {
        next(error);
    }
}



// create category
export const createCate = async (req, res, next) => {
    const newCate = new Category(req.body);

    try {
        const savedCate = await newCate.save();
        res.status(200).json(savedCate);

    } catch (error) {
        next(error);
    }
}

// get all category
export const getAllCate = async (req, res, next) => {
    

    try {
        const categories = await Category.find();
        res.status(200).json(categories);

    } catch (error) {
        next(error);
    }
}
