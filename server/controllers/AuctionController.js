// const Auction = require("../models/Auction.js");
// const AuctionBidder = require("../models/AuctionBidder.js");
// const Property = require("../models/Property.js");
const { getFileStream } = require("../s3.js");
const jsforce = require("jsforce");
const { createAuction } = require("../services/callContractFunction.js");
const  auctionService  = require("../services/AuctionService.js");
const { createError } = require("../utils/error.js");
const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL,
});

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
    if (err) {
        console.error(err);
    } else {
      //  console.log(res.id);
    }
});

const createAuctionRequest = async (req, res, next) => {
    
    await auctionService.createRequestAuction(req.params.id);

   
    res.status(200).json("create auction successfully!");
};

const rejectAuction = async (req, res, next) => {
    await auctionService.updateRejectAuction(req.params.id,req.body.propertyId);

    res.status(200).json("Reject auction !!!");
};
//
const approveAuction = async (req, res, next) => {

    var auction ={
        timeSTRegist : req.body.timeRegistration[0],
        timeENRegist : req.body.timeRegistration[1],
        timeSTAuction : req.body.auctionTime[0],
        timeENAuction : req.body.auctionTime[1],
        auctionId : req.params.id,
        auctionName : req.body.name,
        registrationFee : req.body.registrationFee,
        propertyId: req.body.propertyId,
    }


   await auctionService.approveAuction(auction);


  

    res.status(200).json("Approve Successfully!!");
};
const updateAuction = async (req, res, next) => {
    await conn.sobject("Auction__c").update(
        {
            Id: req.params.id,
            Name: req.body.name,
            Status__c: req.body.status,
            Start_Registration_Time__c: req.body.startRegistrationTime,
            Start_Aution_Time__c: req.body.startAuctionTime,
            RegistrationFee__c: req.body.registrationFee,
            End_Registration_Time__c: req.body.endRegistrationTime,
            End_Auction_Time__c: req.body.endAuctionTime,
            Due_Payment_Time__c: req.body.duePaymentTime,
        },
        (err, ret) => {
            if (err || !ret.success) {
                return console.error(err);
            }
            res.status(200).json(ret);
        }
    );
};
const getAllAuction = async (req, res, next) => {
    try {
        var auctionlist = await auctionService.getAllAuction();

        res.status(200).json(auctionlist);
    } catch (error) {
        next(error);
    }
};
const getAuctionDetailByID = async (req, res, next) => {
    var auctionId = req.params.auctionId;
    var propertyId = req.params.propertyId;
    try {
        var data = await auctionService.getAuctionDetailByID(auctionId,propertyId);
   
            res.status(200).json(data);
        
        
    } catch (error) {
        next(createError('500','không tìm thấy auction'));
    }
};
const uploadImage = async (req, res, next) => {
    console.log(req.params);
    const key = req.params.key;
    const readStream = getFileStream(key);

    await readStream.pipe(res);
};
//add BidderAuction

//  const addBidderAuction = async (req, res, next ) => {
//     try {
//          const ab = new AuctionBidder(req.body);

//          const newBidderAuction = await ab.save();
//     } catch (error) {
//        next(error);
//     }
// }

module.exports = { uploadImage, getAuctionDetailByID, getAllAuction, rejectAuction, approveAuction, createAuctionRequest, updateAuction };
