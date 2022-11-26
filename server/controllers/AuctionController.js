import Auction from "../models/Auction.js";
import AuctionBidder from "../models/AuctionBidder.js";
import Property from "../models/Property.js";
import { getFileStream } from "../s3.js";
import { conn } from "../server.js";


export const createAuction = async (req, res, next) => {
    const newAuction = new Auction(req.body);

    try {
        const savedAuction = await newAuction.save();
        res.status(200).json(savedAuction);

    } catch (error) {
        next(error);
    }
}

export const updateAuction = async (req, res, next) => {
    

    try {
        const updateAuction = await Auction.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updateAuction);

    } catch (error) {
        next(error);
    }
}

export const createLot = async (req, res, next) => {
    const newLot = new Lot(req.body.PropertyId);

    try {
        const savedLot = await newLot.save();

        const auctionLot = new AuctionLot({
            AuctionId:req.body.AuctionId,
            LotId: savedLot._id,
            ContractAddress:req.body.ContractAddress
        });
        await auctionLot.save();

        res.status(200).json(savedLot);

    } catch (error) {
        next(error);
    }
}

export const getAllAuction = async (req, res, next) => {
    
   
    try {
        var auctionlist = null;
        await conn.query("Select Name,Property_Information__c ,(Select Name From Properties_Media__r),(Select Id, Name, Start_Bid__c, Time_End__c, Time_Start__c From Auctions1__r) From Property_DAP__c", function(err, result) {
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



export const getAuctionDetailByID = async (req, res, next) => {
    

    try {
        var auctionlist = null;
        await conn.query("Select Name,Property_Information__c ,(Select Name From Properties_Media__r),(Select Id, Name, Start_Bid__c, Time_End__c, Time_Start__c From Auctions1__r Where Id = '"+    req.params.id+"' ) From Property_DAP__c", function(err, result) {
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

export const uploadImage = async (req, res, next) => {
    console.log(req.params)
    const key = req.params.key
    const readStream = getFileStream(key)
  
     await readStream.pipe(res)
}



//add BidderAuction


export const addBidderAuction = async (req, res, next ) => {
    try {
         const ab = new AuctionBidder(req.body);

         const newBidderAuction = await ab.save();
    } catch (error) {
       next(error); 
    }
}