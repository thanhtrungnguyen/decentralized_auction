const Auction = require("../models/Auction.js");
const AuctionBidder = require("../models/AuctionBidder.js");
const Property = require("../models/Property.js");
const { getFileStream } = require("../s3.js");
const { conn } = require("../server.js");


 const createAuction = async (req, res, next) => {

    await conn.sobject("Auction__c").create({
        Name: req.body.name,
        Status__c: req.body.status,
        Start_Registration_Time__c:req.body.startRegistrationTime,
        Start_Aution_Time__c:req.body.startAuctionTime,
        RegistrationFee__c:req.body.registrationFee,
        Property_DAP_Id__c:req.body.propertyId,
        End_Registration_Time__c:req.body.endRegistrationTime,
        End_Auction_Time__c:req.body.endAuctionTime,
        Due_Payment_Time__c:req.body.duePaymentTime
      }, (err, ret) => {
        if (err || !ret.success) { return console.error(err); }
        res.status(200).json(ret);
      })
      
}

 const rejectAuction = async (req, res, next) => {


    const event = new Date(1974,10,8,9,30,30);
    const event1 = new Date(1974,10,8,9,30,30);
    console.log(event - event1 ==0);
}





 const approveAuction = async (req, res, next) => {


    await conn.sobject("Auction__c").update({
        Status__c: "Approved",
        Id : req.params.id

      }, (err, ret) => {
        if (err || !ret.success) { return console.error(err); }
        res.status(200).json(ret);
      })
      
}




 const updateAuction = async (req, res, next) => {

    await conn.sobject("Auction__c").update({
        Id : req.params.id,
        Name: req.body.name,
        Status__c: req.body.status,
        Start_Registration_Time__c:req.body.startRegistrationTime,
        Start_Aution_Time__c:req.body.startAuctionTime,
        RegistrationFee__c:req.body.registrationFee,       
        End_Registration_Time__c:req.body.endRegistrationTime,
        End_Auction_Time__c:req.body.endAuctionTime,
        Due_Payment_Time__c:req.body.duePaymentTime
      }, (err, ret) => {
        if (err || !ret.success) { return console.error(err); }
        res.status(200).json(ret);
      })
      
}



 const getAllAuction = async (req, res, next) => {
    
   
    try {
        var auctionlist = null;
        await conn.query("Select Name, Description__c, Category_Id__c, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r ) From Property_DAP__c ", function(err, result) {
            if (err) { return console.error(err); }
            console.log("total : " + result.totalSize);
            console.log("fetched : " + result.records.length);
            auctionlist = result.records;
          });
          
          auctionlist.map(auction =>{
            console.log(auction.Name)
          })
       
          
         
        res.status(200).json(auctionlist);

    } catch (error) {
        next(error);
    }
}



 const getAuctionDetailByID = async (req, res, next) => {
    
    var auctionId = req.params.auctionId;
    var propertyId = req.params.propertyId;
    try {
        var auctionlist = null;
        await conn.query("Select Id, Name, Description__c, Category_Id__c, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r Where Id= '"+auctionId+"') From Property_DAP__c where Id = '"+propertyId+"'", function(err, result) {
            if (err) { return console.error(err); }
            console.log("total : " + result.totalSize);
            console.log("fetched : " + result.records.length);
            auctionlist = result.records;
          });
          
          auctionlist.map(auction =>{
            console.log(auction.Name)
          })
        
        res.status(200).json(auctionlist);

    } catch (error) {
        next(error);
    }
}

 const uploadImage = async (req, res, next) => {
    console.log(req.params)
    const key = req.params.key
    const readStream = getFileStream(key)
  
     await readStream.pipe(res)
}



//add BidderAuction


 const addBidderAuction = async (req, res, next ) => {
    try {
         const ab = new AuctionBidder(req.body);

         const newBidderAuction = await ab.save();
    } catch (error) {
       next(error); 
    }
}


module.exports = {addBidderAuction,uploadImage,getAuctionDetailByID,getAllAuction,rejectAuction,approveAuction,createAuction}