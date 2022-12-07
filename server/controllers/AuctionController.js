// const Auction = require("../models/Auction.js");
// const AuctionBidder = require("../models/AuctionBidder.js");
// const Property = require("../models/Property.js");
const { getFileStream } = require("../s3.js");
const jsforce = require("jsforce");
const conn = new jsforce.Connection({
  loginUrl: process.env.SF_LOGIN_URL
})

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
  if (err) {
    console.error(err)
  } else {
    console.log(res.id)
  }
})

 const createAuction = async (req, res, next) => {

    await conn.sobject("Auction__c").create({
        Property_DAP_Id__c:req.params.id,
        Status__c: "Request"
      }, (err, ret) => {
        if (err || !ret.success) { return console.error(err); }
       
      })

    await conn.sobject("Property_DAP__c").update({
       Id:req.params.id,
        Status__c: "Request"
      }, (err, ret) => {
        if (err || !ret.success) { return console.error(err); }
       
      })
      res.status(200).json("create auction successful");   
}


 const rejectAuction = async (req, res, next) => {


    const event = new Date(1974,10,8,9,30,30);
    const event1 = new Date(1974,10,8,9,30,30);
    console.log(event - event1 ==0);
}
 const approveAuction = async (req, res, next) => {
  
  var startRegistrationTime = new Date(req.body.timeRegistration[0]);
  var startRegistrationTimeVN = startRegistrationTime.setTime(startRegistrationTime.getTime()+7*60*60*1000);
  var startRegistrationTimeFN = new Date(startRegistrationTimeVN).toISOString();

  var endRegistrationTime = new Date(req.body.timeRegistration[1]);
  var endRegistrationTimeVN = endRegistrationTime.setTime(endRegistrationTime.getTime()+7*60*60*1000);
  var endRegistrationTimeFN = new Date(endRegistrationTimeVN).toISOString();


  var startAuctionTime = new Date(req.body.auctionTime[0]);
  var startAuctionTimeVN = startAuctionTime.setTime(startAuctionTime.getTime()+7*60*60*1000);
  var startAuctionTimeFN = new Date(startAuctionTimeVN).toISOString();

  var endAuctionTime = new Date(req.body.auctionTime[1]);
  var endAuctionTimeVN = endAuctionTime.setTime(endAuctionTime.getTime()+7*60*60*1000);
  var endAuctionTimeFN = new Date(endAuctionTimeVN).toISOString();


  var paymentTime = new Date(req.body.auctionTime[1]);
  var paymentTimeVN = paymentTime.setTime(paymentTime.getTime()+7*60*60*1000+5*60*1000);
  var paymentTimeFN = new Date(paymentTimeVN).toISOString();
 

    await conn.sobject("Auction__c").update({
        Status__c: "Approved",
        Id : req.params.id,
        Name: req.body.name,
        Start_Registration_Time__c: startRegistrationTimeFN,
        Start_Aution_Time__c: startAuctionTimeFN,
        RegistrationFee__c:req.body.registrationFee,        
        End_Registration_Time__c: endRegistrationTimeFN,
        End_Auction_Time__c: endAuctionTimeFN,
        Due_Payment_Time__c:paymentTimeFN

      }, (err, ret) => {
        if (err || !ret.success) { return console.error(err); }
        
      })

      await conn.sobject("Property_DAP__c").update({
        Status__c: "Approved",
        Id : req.body.propertyId,


      }, (err, ret) => {
        if (err || !ret.success) { return console.error(err); }
        
      })
      res.status(200).json("Approve Successfully!!");
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
        await conn.query("Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r ) From Property_DAP__c ", function(err, result) {
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
        await conn.query("Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r Where Id= '"+auctionId+"') From Property_DAP__c where Id = '"+propertyId+"'", function(err, result) {
            if (err) { return console.error(err); }
            console.log("total : " + result.totalSize);
            console.log("fetched : " + result.records.length);
            auctionlist = result.records[0];
          });
          
          
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


//  const addBidderAuction = async (req, res, next ) => {
//     try {
//          const ab = new AuctionBidder(req.body);

//          const newBidderAuction = await ab.save();
//     } catch (error) {
//        next(error); 
//     }
// }


module.exports = {uploadImage,getAuctionDetailByID,getAllAuction,rejectAuction,approveAuction,createAuction,updateAuction}