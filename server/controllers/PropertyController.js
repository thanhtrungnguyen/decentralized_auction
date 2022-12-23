// const Category = require("../models/Category.js");
// const Property = require("../models/Property.js");

const PropertyService = require('../services/PropertyService')

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
        var token = req.cookies.access_token;
        var index = req.params.index;
        var status = req.params.status;
        var category = req.params.category;
        var nameProperty = req.params.name;
        var data = await PropertyService.getPropertiesByUser(token, index, status, category, nameProperty);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};
//update property
const updateProperty = async (req, res, next) => {
    const token = req.cookies.access_token;
    const viewPropertyTime = req.body.viewPropertyTime;
    const categoryName = req.body.category;
    const files = req.files;
    const property = {
        Id: req.params.id,
        Name: req.body.propertyName,
        Description__c: req.body.propertyDescription,
        Deposit_Amount__c: req.body.deposit,
        Place_View_Property__c: req.body.placeViewProperty,
        Price_Step__c: req.body.priceStep,
        Start_Bid__c: req.body.startBid,
        propertyVideo: req.body.propertyVideo,
        status: req.body.status
    }
    try {
        var propertyId = await PropertyService.updateProperty(token, files, viewPropertyTime, categoryName, property)
        if (propertyId) res.status(200).send("Update successfully !!!")
    } catch (error) {
        next(error);
    }
};
//find property by id
const findPropertyByID = async (req, res, next) => {
    try {
        var propertyId = req.params.id;
        // const updateProperty = await Property.findById(req.params.id);
        // res.status(200).json(updateProperty);
        var property = await PropertyService.getPropertyById(propertyId);
        console.log(property);
        res.status(200).json(property);
    } catch (error) {
        next(error);
    }
};
// get list property by status
const getListByStatus = async (req, res, next) => {
    try {

        const token = req.cookies.access_token;
        const status = req.params.status;
        var properties = await PropertyService.getPropertiesByStatus(token, status)
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
        const propertyName = req.params.name;
        const propertyStatus = req.params.status;
        var properties = await PropertyService.filterProperty(token, propertyName, propertyStatus);
        console.log(properties);
        res.status(200).json(properties);
    } catch (error) {
        next(error);
    }
};
module.exports = { findPropertyByID, updateProperty, getAllPropertyByUser, createProperty, getListByStatus, filterProperty };
